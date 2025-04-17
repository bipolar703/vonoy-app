// MCP Client Utility for Node.js
// Loads global MCP config, starts each server as a subprocess, and tests connectivity

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
// const config = require('./mcp.config.cjs');

const dotenvPath = path.join(__dirname, '.env');
if (fs.existsSync(dotenvPath)) {
  require('dotenv').config({ path: dotenvPath });
}

// Load sensitive data from environment variables
const TAVILY_API_KEY = process.env.TAVILY_API_KEY || '';
const SEARXNG_URL = process.env.SEARXNG_URL || 'https://searx.tiekoetter.com/';

function getNpxPath() {
  // Use Windows-specific path if on Windows
  if (process.platform === 'win32') {
    return 'npx.cmd'; // Use npx.cmd for child_process on Windows
  }
  return 'npx';
}

function runMCPServer(server, testArgs = [], envVars = {}) {
  return new Promise((resolve, reject) => {
    let command = null;
    let args = [];
    if (server.url.includes('repomix')) {
      command = 'npx';
      args = ['-y', 'repomix', '--mcp', ...testArgs];
    } else if (server.name === 'tavily-ai') {
      command = 'npx';
      args = ['-y', 'tavily-mcp', ...testArgs];
    } else if (server.name === 'searxng') {
      command = 'npx';
      args = ['-y', 'mcp-searxng', ...testArgs];
    } else {
      resolve({ server: server.name, success: false, error: 'Unknown server type' });
      return;
    }
    const env = { ...process.env, ...envVars };
    const child = spawn(command, args, { env, shell: true });
    let stdout = '';
    let stderr = '';
    child.stdout.on('data', (data) => {
      stdout += data;
    });
    child.stderr.on('data', (data) => {
      stderr += data;
    });
    child.on('close', (code) => {
      if (code === 0) {
        resolve({ server: server.name, success: true, output: stdout, stderr });
      } else {
        resolve({ server: server.name, success: false, error: stderr || `Exit code ${code}` });
      }
    });
    child.on('error', (err) => {
      resolve({ server: server.name, success: false, error: err.message });
    });
  });
}

async function testAllServers() {
  const results = [];
  for (const server of config.servers) {
    if (!server.enabled) continue;
    if (server.name !== 'repomix' && server.name !== 'searxng') continue;
    let envVars = {};
    if (server.name === 'searxng') envVars.SEARXNG_URL = SEARXNG_URL;
    console.log(`\n[${server.name}] Starting test...`);
    const result = await runMCPServer(server, ['--help'], envVars);
    if (result.success) {
      console.log(`[${server.name}] SUCCESS`);
      console.log(result.output.slice(0, 1000));
      if (result.stderr) console.error('STDERR:', result.stderr);
    } else {
      console.error(`[${server.name}] FAIL`);
      console.error('ERROR:', result.error);
      if (result.stdout) console.error('STDOUT:', result.stdout);
      if (result.stderr) console.error('STDERR:', result.stderr);
    }
    results.push(result);
  }
  return results;
}

if (require.main === module) {
  testAllServers().then((results) => {
    for (const res of results) {
      console.log(`\n[${res.server}] Test: ${res.success ? 'SUCCESS' : 'FAIL'}`);
      if (res.output) console.log('STDOUT:', res.output.slice(0, 2000));
      if (res.stderr) console.error('STDERR:', res.stderr.slice(0, 2000));
      if (!res.success && res.error) console.error('ERROR:', res.error);
    }
  });
}
