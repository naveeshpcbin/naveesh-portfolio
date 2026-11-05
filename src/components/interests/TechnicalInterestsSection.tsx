import React from 'react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Cpu, Terminal, Sparkles, Orbit, Binary, Search, Layers, ShieldCheck, Rocket } from 'lucide-react';

interface InterestItem {
  title: string;
  category: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
}

export const TechnicalInterestsSection: React.FC = () => {
  const interests: InterestItem[] = [
    {
      title: 'Electronics & Circuit Design',
      category: 'HARDWARE FOUNDATIONS',
      description: 'Analog and digital circuit analysis, PCB schematic workflows, power distribution, signal conditioning, and electronic instrumentation.',
      icon: <Cpu className="w-5 h-5 text-accent-gold" />,
      tags: ['Schematics', 'PCB Layout', 'Signal Integrity', 'Sensors'],
    },
    {
      title: 'Embedded Systems & Firmware',
      category: 'EDGE COMPUTING',
      description: 'Microcontroller programming, RTOS architectures, peripheral bus protocols (I2C, SPI, UART), low-power states, and ESP32 ecosystem.',
      icon: <Binary className="w-5 h-5 text-[#93C5FD]" />,
      tags: ['ESP32-S3', 'C/C++', 'FreeRTOS', 'Telemetry'],
    },
    {
      title: 'AI & Machine Learning',
      category: 'INTELLIGENCE',
      description: 'Supervised classification, predictive modeling on sensor time-series, edge inference optimization, and lightweight neural network deployment.',
      icon: <Sparkles className="w-5 h-5 text-[#FDE047]" />,
      tags: ['PyTorch', 'Scikit-Learn', 'Time-Series', 'Edge AI'],
    },
    {
      title: 'Full-Stack Software Development',
      category: 'SOFTWARE ARCHITECTURE',
      description: 'Modern reactive frontend architectures paired with asynchronous Python and Node.js microservices, type safety, and clean API design.',
      icon: <Terminal className="w-5 h-5 text-[#6EE7B7]" />,
      tags: ['React', 'TypeScript', 'FastAPI', 'Tailwind CSS'],
    },
    {
      title: 'AI-Powered Search & Retrieval',
      category: 'INFORMATION SYSTEMS',
      description: 'Self-hosted search synthesis pipelines, vector similarity matching, query decomposition, and citation-backed answer generation.',
      icon: <Search className="w-5 h-5 text-[#C4B5FD]" />,
      tags: ['Ollama', 'SearxNG', 'LangGraph', 'Vector Search'],
    },
    {
      title: 'Hardware Simulation & Telemetry',
      category: 'VIRTUALIZATION',
      description: 'Simulating acoustic and seismic field arrays, synthesizing physical test cases, and streaming mock sensor streams to backend auditors.',
      icon: <Orbit className="w-5 h-5 text-accent-silver" />,
      tags: ['Simulation', 'Automated Tests', 'Signal Synthesis'],
    },
    {
      title: 'Spatial Digital Twins',
      category: '3D COMPUTING',
      description: 'Connecting physical spatial coordinates and environmental telemetry to interactive real-time 3D WebGL scenes rendered with Three.js.',
      icon: <Layers className="w-5 h-5 text-[#93C5FD]" />,
      tags: ['Three.js', 'Blender', 'Spatial Coordinates', 'WebGL'],
    },
    {
      title: 'Semiconductor Technology',
      category: 'PHYSICAL COMPUTATION',
      description: 'VLSI architectures, silicon manufacturing workflows, lithography, CMOS design principles, and next-generation compute substrates.',
      icon: <ShieldCheck className="w-5 h-5 text-accent-gold" />,
      tags: ['VLSI', 'Silicon Physics', 'Computer Architecture'],
    },
    {
      title: 'Technology Entrepreneurship',
      category: 'LONG-TERM VISION',
      description: 'Transforming novel engineering research and intelligent hardware systems into sustainable, impactful ventures solving real-world friction.',
      icon: <Rocket className="w-5 h-5 text-[#F87171]" />,
      tags: ['Product Design', 'Venture Creation', 'DeepTech'],
    },
  ];

  return (
    <section id="interests" className="py-24 sm:py-32 bg-background-subtle/50 border-b border-border">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <SectionHeader
          number="04"
          title="Technical Interests & Focus Areas"
          subtitle="A multidisciplinary inquiry across physical hardware, semiconductor physics, intelligent systems, and software engineering."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {interests.map((item, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-2xl border border-border bg-[#141413] hover:border-cream/30 hover:bg-[#181816] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[10px] tracking-widest uppercase text-cream-dim">
                    {item.category}
                  </span>
                  <div className="p-2 rounded-lg bg-[#1D1D1B] border border-border">
                    {item.icon}
                  </div>
                </div>

                <h3 className="text-xl font-editorial font-light text-cream mb-2">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-cream-muted leading-relaxed font-light mb-6">
                  {item.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border/60">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded bg-[#1C1C1A] text-[10px] font-mono text-cream-dim"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
