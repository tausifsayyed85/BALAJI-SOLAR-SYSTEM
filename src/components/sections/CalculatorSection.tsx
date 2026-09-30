import React, { useState, useId } from 'react';
import { useApp } from '../../context/AppContext';
import { Calculator, MessageCircle, FileText, Info, Zap, Sparkles } from 'lucide-react';

export const CalculatorSection: React.FC = () => {
  const { t, businessSettings, language, setQuoteModalOpen } = useApp();
  const monthlyBillId = useId();
  const monthlyUnitsId = useId();
  const propertyTypeId = useId();
  const roofTypeId = useId();
  const roofAreaId = useId();
  const cityId = useId();

  const [monthlyBill, setMonthlyBill] = useState<number>(3500);
  const [monthlyUnits, setMonthlyUnits] = useState<number>(380);
  const [propertyType, setPropertyType] = useState<'Residential' | 'Commercial' | 'Industrial'>('Residential');
  const [roofType, setRoofType] = useState<string>('Flat RCC Terrace');
  const [roofArea, setRoofArea] = useState<number>(400);
  const [city, setCity] = useState<string>('Bhusawal');

  // Sync bill to units when bill changes
  const handleBillChange = (val: number) => {
    setMonthlyBill(val);
    // Approx rate in MSEDCL
    setMonthlyUnits(Math.round(val / 8.5));
  };

  // Sync units to bill when units change
  const handleUnitsChange = (val: number) => {
    setMonthlyUnits(val);
    setMonthlyBill(Math.round(val * 8.5));
  };

  // Calculation logic based on Maharashtra solar insolation (~4.2 units/kW/day = ~125 units/kW/month)
  const calculatedKw = Math.max(1, Number((monthlyUnits / 120).toFixed(1)));
  // Round to realistic installer sizing: 3.5, 4.1, 5.3 or custom
  let recommendedSize = calculatedKw;
  if (calculatedKw <= 3.5) recommendedSize = 3.5;
  else if (calculatedKw <= 4.5) recommendedSize = 4.1;
  else if (calculatedKw <= 5.8) recommendedSize = 5.3;

  const panelsCount = Math.ceil((recommendedSize * 1000) / 590);
  const annualGen = Math.round(recommendedSize * 1450); // ~1450 kWh / kW / year in Maharashtra
  const estAnnualReduction = Math.round(annualGen * 8.5);

  // Investment estimation based on benchmark packages
  const estGrossInvestment = Math.round(recommendedSize * 62000);
  const estSubsidy = propertyType === 'Residential'
    ? (recommendedSize >= 3 ? 78000 : recommendedSize >= 2 ? 60000 : 30000)
    : 0;
  const netEstimatedOutlay = Math.max(0, estGrossInvestment - estSubsidy);
  const co2Offset = Number((annualGen * 0.82 / 1000).toFixed(1)); // Metric tons of CO2 offset

  const shareToWhatsApp = () => {
    const text = encodeURIComponent(
      `*Balaji Solar Systems — Rooftop Solar Estimate*\n` +
      `• City: ${city}\n` +
      `• Property: ${propertyType}\n` +
      `• Monthly Bill: ₹${monthlyBill.toLocaleString('en-IN')}\n` +
      `• Monthly Units: ${monthlyUnits} kWh\n` +
      `• Roof Type: ${roofType} (${roofArea} sq ft)\n` +
      `--------------------------------\n` +
      `*Estimated Solar Plan:*\n` +
      `• Recommended Capacity: ${recommendedSize} kW\n` +
      `• Approx Panels (590W): ${panelsCount} panels\n` +
      `• Estimated Annual Gen: ~${annualGen.toLocaleString('en-IN')} units\n` +
      `• Approx Investment: ~₹${estGrossInvestment.toLocaleString('en-IN')}\n` +
      `• Indicative Subsidy Ref*: ₹${estSubsidy.toLocaleString('en-IN')}\n` +
      `• Approx Net Outlay*: ~₹${netEstimatedOutlay.toLocaleString('en-IN')}\n\n` +
      `Please provide an official quotation for this rooftop.`
    );
    window.open(`https://wa.me/91${businessSettings.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <section id="calculator" className="py-16 lg:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-2 block">
            {t.calculator.kicker}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            {t.calculator.title}
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            {t.calculator.subtitle}
          </p>
        </div>

        {/* Two-Column Calculator Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form Controls */}
          <div className="lg:col-span-6 bg-slate-50 border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm reveal-init">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-amber-600" />
              <span>Step 1: Enter Consumption & Site Parameters</span>
            </h3>

            <div className="space-y-5">
              {/* Monthly Electricity Bill */}
              <div>
                <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-1.5">
                  <label htmlFor={monthlyBillId}>{t.calculator.billInputLabel}</label>
                  <span className="text-sm font-black text-amber-700">₹{monthlyBill.toLocaleString('en-IN')}</span>
                </div>
                <input
                  id={monthlyBillId}
                  type="range"
                  min="1000"
                  max="25000"
                  step="250"
                  value={monthlyBill}
                  onChange={(e) => handleBillChange(Number(e.target.value))}
                  className="w-full accent-amber-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>₹1,000</span>
                  <span>₹10,000</span>
                  <span>₹25,000+</span>
                </div>
              </div>

              {/* Monthly Units */}
              <div>
                <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-1.5">
                  <label htmlFor={monthlyUnitsId}>{t.calculator.unitsInputLabel}</label>
                  <span className="text-sm font-black text-slate-900">{monthlyUnits} kWh</span>
                </div>
                <input
                  id={monthlyUnitsId}
                  type="number"
                  min="50"
                  max="5000"
                  value={monthlyUnits}
                  onChange={(e) => handleUnitsChange(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-semibold focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              {/* Property & Roof Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor={propertyTypeId} className="block text-xs font-bold text-slate-700 mb-1.5">
                    {t.calculator.propertyTypeLabel}
                  </label>
                  <select
                    id={propertyTypeId}
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-semibold focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  >
                    <option value="Residential">Residential Home</option>
                    <option value="Commercial">Commercial / Shop</option>
                    <option value="Industrial">Industrial Facility</option>
                  </select>
                </div>

                <div>
                  <label htmlFor={roofTypeId} className="block text-xs font-bold text-slate-700 mb-1.5">
                    {t.calculator.roofTypeLabel}
                  </label>
                  <select
                    id={roofTypeId}
                    value={roofType}
                    onChange={(e) => setRoofType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-semibold focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  >
                    <option value="Flat RCC Terrace">Flat RCC Concrete Terrace</option>
                    <option value="Sloped Tin / Tile Shed">Sloped Metal / Tin Shed</option>
                    <option value="Elevated Superstructure">Elevated Canopy Superstructure</option>
                  </select>
                </div>
              </div>

              {/* Area & City Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor={roofAreaId} className="block text-xs font-bold text-slate-700 mb-1.5">
                    {t.calculator.roofAreaLabel}
                  </label>
                  <input
                    id={roofAreaId}
                    type="number"
                    min="100"
                    max="10000"
                    step="50"
                    value={roofArea}
                    onChange={(e) => setRoofArea(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-semibold focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor={cityId} className="block text-xs font-bold text-slate-700 mb-1.5">
                    {t.calculator.cityLabel}
                  </label>
                  <input
                    id={cityId}
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-semibold focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    placeholder="Bhusawal, Jalgaon, etc."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Output Results Dashboard */}
          <div className="lg:col-span-6 bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 flex flex-col justify-between reveal-init delay-150">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                <div>
                  <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider font-semibold">
                    Indicative Estimate Only
                  </span>
                  <h3 className="text-xl font-black text-white mt-0.5">
                    Recommended Solar Profile
                  </h3>
                </div>
                <div className="p-2.5 bg-amber-500/20 text-amber-400 rounded-xl">
                  <Sparkles className="w-5 h-5" />
                </div>
              </div>

              {/* Recommended Capacity Banner */}
              <div className="p-4 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-between mb-6 shadow-md">
                <div>
                  <span className="text-xs uppercase font-extrabold tracking-wider opacity-90 block">
                    {t.calculator.recommendedSize}
                  </span>
                  <span className="text-3xl font-black tracking-tight">
                    {recommendedSize} kW
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-extrabold block">
                    {panelsCount} Panels
                  </span>
                  <span className="text-[10px] opacity-80">
                    @ 590W Bifacial
                  </span>
                </div>
              </div>

              {/* Calculation Metrics Grid */}
              <div className="grid grid-cols-2 gap-3 mb-6 text-xs">
                <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60">
                  <span className="text-slate-400 block text-[11px]">{t.calculator.estimatedGen}</span>
                  <span className="text-base font-bold text-white mt-1 block">~{annualGen.toLocaleString('en-IN')} units / yr</span>
                </div>

                <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60">
                  <span className="text-slate-400 block text-[11px]">Est. Annual Bill Offset</span>
                  <span className="text-base font-bold text-emerald-400 mt-1 block">~₹{estAnnualReduction.toLocaleString('en-IN')}</span>
                </div>

                <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60">
                  <span className="text-slate-400 block text-[11px]">{t.calculator.indicativeCost}</span>
                  <span className="text-base font-bold text-white mt-1 block">~₹{estGrossInvestment.toLocaleString('en-IN')}</span>
                </div>

                <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60">
                  <span className="text-slate-400 block text-[11px]">{t.calculator.subsidyEst}</span>
                  <span className="text-base font-bold text-sky-400 mt-1 block">
                    {estSubsidy > 0 ? `₹${estSubsidy.toLocaleString('en-IN')}` : 'N/A (Commercial)'}
                  </span>
                </div>
              </div>

              {/* Net Estimated Outlay Callout */}
              <div className="p-4 bg-slate-800/90 rounded-xl border border-slate-700 flex items-center justify-between mb-6">
                <div>
                  <span className="text-xs text-slate-300 block">{t.calculator.netIndicativeCost}</span>
                  <span className="text-2xl font-black text-amber-400">~₹{netEstimatedOutlay.toLocaleString('en-IN')}</span>
                </div>
                <div className="text-right text-[11px] text-slate-400">
                  <span>Carbon Offset:</span>
                  <strong className="text-emerald-400 block">{co2Offset} Tons CO₂ / yr</strong>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={shareToWhatsApp}
                  className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{t.calculator.sendWhatsApp}</span>
                </button>

                <button
                  onClick={() => setQuoteModalOpen(true)}
                  className="w-full py-3 px-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 border border-slate-700 transition-colors"
                >
                  <FileText className="w-4 h-4 text-amber-400" />
                  <span>{t.calculator.requestOfficialQuote}</span>
                </button>
              </div>
            </div>

            {/* Mandatory Disclaimer */}
            <div className="mt-6 pt-4 border-t border-slate-800 text-[10px] text-slate-400 leading-normal flex items-start gap-1.5">
              <Info className="w-3.5 h-3.5 shrink-0 text-slate-500 mt-0.5" />
              <span>{t.calculator.disclaimer}</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
