import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const EditorialProcess: React.FC = () => {
  const { setQuoteModalOpen } = useApp();

  const steps = [
    {
      num: '01',
      title: 'Consultation & Shadow Modeling',
      desc: 'We analyze your recent MSEDCL billing statements, calculate daytime consumption peaks, and conduct comprehensive 3D shadow analysis on your terrace.',
      time: 'Day 1 — 2',
    },
    {
      num: '02',
      title: 'Procurement & Structural Anchoring',
      desc: 'Quoted TATA MONO half-cut bifacial modules and hot-dip galvanized mounting structures are procured. Anchored with chemical expansion fasteners ensuring zero roof leakages.',
      time: 'Day 3 — 5',
    },
    {
      num: '03',
      title: 'Precision Electrical Integration',
      desc: 'Certified technicians install IP65 AC & DC distribution boxes with Type-II SPDs, route UV-resistant cables in heavy conduits, and install dual chemical copper earthing pits.',
      time: 'Day 6 — 8',
    },
    {
      num: '04',
      title: 'MSEDCL Net-Metering & 5-Yr AMC',
      desc: 'We manage full DISCOM paperwork for optical bi-directional net meter installation, test synchronization, handover system monitoring credentials, and initiate 5-year AMC.',
      time: 'Day 9 — 20',
    },
  ];

  return (
    <section id="process" className="py-20 lg:py-28 bg-[#FFFDFC] border-b border-[#E8B7BE]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#C98F9B] block mb-2">
            Execution Timeline · 01 to 04
          </span>
          <h2 className="font-editorial-didone text-4xl sm:text-5xl font-normal text-[#191719] tracking-tight mb-4">
            The Commissioning Journey
          </h2>
          <p className="text-sm sm:text-base text-[#9A8587] leading-relaxed">
            Every installation follows an engineered workflow designed for electrical safety, regulatory compliance, and maximum twenty-five year output.
          </p>
        </div>

        {/* 4 Phases Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((st) => (
            <div
              key={st.num}
              className="p-6 rounded-3xl bg-[#F7F1EC] border border-[#E8B7BE]/70 flex flex-col justify-between hover:border-[#4B202A] transition-colors duration-300"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#E8B7BE]/40 mb-4">
                  <span className="font-editorial-didone text-3xl font-normal text-[#4B202A]">
                    {st.num}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#C98F9B] bg-[#FFFDFC] px-2.5 py-1 rounded-full border border-[#E8B7BE]/50">
                    {st.time}
                  </span>
                </div>

                <h3 className="font-editorial-didone text-xl text-[#191719] mb-3">
                  {st.title}
                </h3>

                <p className="text-xs text-[#4B202A]/80 leading-relaxed">
                  {st.desc}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-[#E8B7BE]/40 flex items-center gap-1.5 text-[11px] font-mono text-[#C98F9B]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Balaji Solar Protocol</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => setQuoteModalOpen(true)}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#4B202A] text-white hover:bg-[#191719] transition-all cursor-pointer"
          >
            <span>Initiate Step 01: Free Site Survey</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
