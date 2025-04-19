'use client';

import { cn } from '@/lib/utils';
import { ChevronDown, ChevronUp, Network, Puzzle } from 'lucide-react';
import type React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../layout/Footer';
import Navbar from '../layout/Navbar';
import PageTransition from '../layout/PageTransition';

// Define our solution types and their data

type SolutionType = 'technical' | 'consulting';

interface SolutionData {
  title: string;
  description: string;
  icon: React.ReactNode;
  details: {
    title: string;
    items: string[];
  }[];
}

const SOLUTIONS_DATA: Record<SolutionType, SolutionData> = {
  technical: {
    title: 'Smart Routing Tools Built for Real Operations',
    description: 'Book a demo to learn how we can optimize your business.',
    icon: <Network className="h-12 w-12 text-white stroke-[1.5]" />,
    details: [
      {
        title: 'Solver APIs',
        items: [
          'Integrates with your systems (ERP, WMS, etc.)',
          'Fast and reliable performance',
          'Fully customizable to your operational needs',
        ],
      },
      {
        title: 'Transportation Management Platform (TMS)',
        items: [
          'Route planning interface for dispatchers',
          'Mobile app for drivers (delivery flows, updates, proof of delivery)',
          'Dashboard with live tracking and performance reports',
          'Works seamlessly with your existing systems',
          'Available as a cloud or on-premise solution',
        ],
      },
      {
        title: 'Routing Capabilities',
        items: [
          'Electric vehicle fleets with charging needs',
          'Cash van routing for mobile sales teams',
          'Pickup and delivery across customer zones',
          'Time-specific delivery windows',
          'Multi-depot and split routes',
          'Custom rules and business constraints',
        ],
      },
    ],
  },
  consulting: {
    title: 'Strategic Logistics Optimization Backed by Science',
    description: 'Request a proposal or book a discovery session.',
    icon: <Puzzle className="h-12 w-12 text-gray-800 stroke-[1.5]" />,
    details: [
      {
        title: 'Network Design Optimization',
        items: ['Facility location, hub placement, service area design'],
      },
      {
        title: 'Capacity & Fleet Planning',
        items: ['Fleet sizing, shift planning, workload balancing'],
      },
      {
        title: 'Simulation & Scenario Modeling',
        items: ['Demand fluctuation, stress testing, what-if scenarios'],
      },
      {
        title: 'Route Audits & Efficiency Analysis',
        items: ['Baseline comparison, savings potential, performance gaps'],
      },
    ],
  },
};

export default function SolutionsCards() {
  // Read the ':type' URL param and default to 'technical' if invalid
  const { type } = useParams<{ type?: string }>();
  const navigate = useNavigate();
  const isValid = type === 'technical' || type === 'consulting';
  const initialType: SolutionType = isValid ? (type as SolutionType) : 'technical';
  const [selectedSolution, setSelectedSolution] = useState<SolutionType>(initialType);
  const [expandedSection, setExpandedSection] = useState<string>(
    SOLUTIONS_DATA[initialType].details[0].title
  );
  useEffect(() => {
    if (type === 'technical' || type === 'consulting') {
      setSelectedSolution(type as SolutionType);
      setExpandedSection(SOLUTIONS_DATA[type as SolutionType].details[0].title);
    }
  }, [type]);

  const handleCardClick = (sol: SolutionType) => {
    setSelectedSolution(sol);
    navigate(`/solutions/${sol}`);
  };

  const toggleSection = (title: string) => {
    if (expandedSection === title) {
      setExpandedSection('');
    } else {
      setExpandedSection(title);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <PageTransition />
      <Navbar />
      <main className="bg-gradient-to-b from-[#0a1929] to-[#0c223a] text-white pt-20 pb-20 px-4 md:px-8 font-sans flex-grow">
        <div className="max-w-6xl mx-auto">
          <div className="relative mb-16 mt-8 md:mt-12">
            <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
              <img
                src="/solutions-title-bg.svg"
                alt=""
                className="max-w-full h-auto object-contain w-48 md:w-72 lg:w-96 opacity-50"
              />
            </div>
            <h1 className="relative z-10 text-5xl font-bold text-center mb-4 tracking-tight">
              Solutions
            </h1>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[#4db6ac]/30 to-transparent -z-10"></div>
            <div className="absolute w-full h-40 top-1/2 left-0 transform -translate-y-1/2 -z-20">
              <div className="w-full h-full bg-[url('/placeholder.svg?height=200&width=1200')] bg-no-repeat bg-center opacity-10"></div>
            </div>
          </div>

          {/* Solution Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {(Object.keys(SOLUTIONS_DATA) as SolutionType[]).map((sol) => (
              <div
                key={sol}
                className={cn(
                  'rounded-xl p-8 transition-all duration-500 cursor-pointer shadow-lg flex flex-col items-center text-center relative overflow-hidden group',
                  selectedSolution === sol
                    ? 'bg-[#4db6ac] text-white ring-4 ring-[#4db6ac]/20 scale-[1.02]'
                    : 'bg-white/95 text-gray-800 hover:bg-white hover:shadow-xl hover:scale-[1.01]'
                )}
                onClick={() => handleCardClick(sol)}
              >
                <div
                  className={cn(
                    'absolute inset-0 bg-gradient-to-br opacity-20 transition-opacity duration-500',
                    selectedSolution === sol
                      ? 'from-white/30 to-transparent'
                      : 'from-gray-100 to-transparent opacity-0 group-hover:opacity-20'
                  )}
                />

                <div
                  className={cn(
                    'mb-6 p-4 rounded-full transition-all duration-500',
                    selectedSolution === sol ? 'bg-white/20' : 'bg-gray-100 group-hover:bg-gray-200'
                  )}
                >
                  {SOLUTIONS_DATA[sol].icon}
                </div>

                <h2 className="text-2xl font-semibold mb-4">{SOLUTIONS_DATA[sol].title}</h2>
                <p className="text-sm leading-relaxed max-w-md">
                  {SOLUTIONS_DATA[sol].description}
                </p>

                <div
                  className={cn(
                    'w-16 h-1 mt-6 rounded-full transition-all duration-500',
                    selectedSolution === sol ? 'bg-white/60' : 'bg-gray-300 group-hover:bg-gray-400'
                  )}
                />
              </div>
            ))}
          </div>

          {/* Selected Solution Details */}
          <div className="mb-20 transition-all duration-500 transform">
            <h2 className="text-3xl font-bold text-center mb-10 py-4 relative">
              <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                {SOLUTIONS_DATA[selectedSolution].title}
              </span>
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[#4db6ac] rounded-full"></span>
            </h2>

            <div className="space-y-4 max-w-4xl mx-auto">
              {SOLUTIONS_DATA[selectedSolution].details.map((detail, idx) => (
                <div
                  key={detail.title}
                  className={cn(
                    'bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 shadow-lg transition-all duration-300',
                    expandedSection === detail.title ? 'shadow-[#4db6ac]/5' : ''
                  )}
                  style={{
                    animationDelay: `${idx * 100}ms`,
                    animation: 'fadeIn 0.5s ease-out forwards',
                  }}
                >
                  <div
                    className={cn(
                      'flex justify-between items-center p-5 cursor-pointer transition-colors duration-300',
                      expandedSection === detail.title
                        ? 'bg-[#4db6ac]/10 text-white'
                        : 'bg-white/10 text-white/90 hover:bg-white/15'
                    )}
                    onClick={() => toggleSection(detail.title)}
                  >
                    <h3 className="font-medium text-lg">{detail.title}</h3>
                    <div className="p-1.5 rounded-full bg-white/10 transition-transform duration-300">
                      {expandedSection === detail.title ? (
                        <ChevronUp className="h-5 w-5 text-[#4db6ac]" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </div>
                  </div>

                  <div
                    className={cn(
                      'overflow-hidden transition-all duration-500 ease-in-out',
                      expandedSection === detail.title ? 'max-h-96' : 'max-h-0'
                    )}
                  >
                    <div className="p-5 bg-white/5 text-white/80">
                      <ol className="list-decimal pl-5 space-y-3">
                        {detail.items.map((item, index) => (
                          <li key={index} className="pl-2 leading-relaxed">
                            {item}
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
