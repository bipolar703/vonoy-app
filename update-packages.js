import fs from 'fs';
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read package.json
const packageJsonPath = path.join(process.cwd(), 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

console.log('Checking for outdated packages...');
try {
  const outdatedOutput = execSync('npm outdated --json', { encoding: 'utf8' });
  const outdated = JSON.parse(outdatedOutput);

  console.log(`Found ${Object.keys(outdated).length} outdated packages.`);

  // Update dependencies
  if (packageJson.dependencies) {
    Object.keys(packageJson.dependencies).forEach(pkg => {
      if (outdated[pkg]) {
        const latest = outdated[pkg].latest;
        console.log(`Updating ${pkg} from ${packageJson.dependencies[pkg]} to ${latest}`);
        packageJson.dependencies[pkg] = `^${latest}`;
      }
    });
  }

  // Update devDependencies
  if (packageJson.devDependencies) {
    Object.keys(packageJson.devDependencies).forEach(pkg => {
      if (outdated[pkg]) {
        const latest = outdated[pkg].latest;
        console.log(`Updating ${pkg} from ${packageJson.devDependencies[pkg]} to ${latest}`);
        packageJson.devDependencies[pkg] = `^${latest}`;
      }
    });
  }

  // Write updated package.json
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  console.log('package.json updated successfully.');

  // Install updated packages
  console.log('Installing updated packages...');
  execSync('npm install', { stdio: 'inherit' });

  console.log('All packages updated successfully!');
} catch (error) {
  if (error.message.includes('No outdated packages found')) {
    console.log('No outdated packages found.');
  } else {
    console.error('Error updating packages:', error.message);
  }
}
