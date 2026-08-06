import React, { useState } from 'react';
import { Calculator, ArrowRight, Languages, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

const translations = {
  hi: {
    formTitle: 'पीएम सूर्य घर: सब्सिडी व लोन कैलकुलेटर',
    subtitle: 'अपनी सौर ऊर्जा बचत और सरकारी सब्सिडी का तुरंत अनुमान लगाएं',
    nameLabel: 'पूरा नाम *',
    namePlaceholder: 'उदा. राहुल शर्मा',
    phoneLabel: 'मोबाइल नंबर *',
    phonePlaceholder: '10 अंकों का मोबाइल नंबर',
    stateLabel: 'राज्य *',
    statePlaceholder: 'उदा. उत्तर प्रदेश',
    billLabel: 'औसत मासिक बिजली बिल (₹)',
    billOptions: [
      { value: '1000', label: '₹1,000 तक' },
      { value: '2000', label: '₹1,000 - ₹2,500' },
      { value: '4000', label: '₹2,500 - ₹5,000' },
      { value: '5000', label: '₹5,000 से अधिक' }
    ],
    capacityLabel: 'वांछित सोलर सिस्टम क्षमता (kW)',
    maxSubsidyNote: '(3 kW या उससे अधिक पर अधिकतम ₹78,000 सब्सिडी मिलती है)',
    roofLabel: 'क्या आपकी अपनी खुद की छत उपलब्ध है?',
    roofYes: 'हाँ, अपनी छत है',
    roofNo: 'नहीं / किराए पर',
    timelineLabel: 'आप सोलर कब तक लगवाना चाहते हैं?',
    timelineOptions: [
      { value: 'Immediate', label: '🔥 तुरंत लगवाना है (अगले 7-10 दिनों में)' },
      { value: 'Hold', label: '⏳ 1 से 3 महीने में (अभी प्लान कर रहे हैं)' },
      { value: 'JustInfo', label: 'ℹ️ अभी सिर्फ सब्सिडी की जानकारी चाहिए' }
    ],
    submitBtn: 'सब्सिडी व लोन गणना देखें',
    submitting: 'गणना की जा रही है...',
    switchLang: 'English',
    validationPhone: 'कृपया 10 अंकों का सही मोबाइल नंबर दर्ज करें'
  },
  en: {
    formTitle: 'PM Surya Ghar: Subsidy & Loan Calculator',
    subtitle: 'Instantly estimate your solar savings and government subsidy',
    nameLabel: 'Full Name *',
    namePlaceholder: 'Ex. Rahul Sharma',
    phoneLabel: 'Mobile Number *',
    phonePlaceholder: '10-digit mobile number',
    stateLabel: 'State *',
    statePlaceholder: 'Ex. Uttar Pradesh',
    billLabel: 'Average Monthly Electricity Bill (₹)',
    billOptions: [
      { value: '1000', label: 'Up to ₹1,000' },
      { value: '2000', label: '₹1,000 - ₹2,500' },
      { value: '4000', label: '₹2,500 - ₹5,000' },
      { value: '5000', label: 'Above ₹5,000' }
    ],
    capacityLabel: 'Desired Solar System Capacity (kW)',
    maxSubsidyNote: '(Max. ₹78,000 Subsidy applicable for 3 kW and above)',
    roofLabel: 'Is your own roof available?',
    roofYes: 'Yes, own roof available',
    roofNo: 'No / Rented roof',
    timelineLabel: 'When do you plan to install solar?',
    timelineOptions: [
      { value: 'Immediate', label: '🔥 Immediate (Within 7-10 days)' },
      { value: 'Hold', label: '⏳ In 1 to 3 Months (Planning phase)' },
      { value: 'JustInfo', label: 'ℹ️ Just exploring subsidy details' }
    ],
    submitBtn: 'View Subsidy & Loan Calculation',
    submitting: 'Calculating...',
    switchLang: 'हिंदी',
    validationPhone: 'Please enter a valid 10-digit mobile number'
  }
};

export default function CalculatorForm({ lang = 'hi', setLang, onCalculate }) {
  const t = translations[lang] || translations.hi;

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    state: '',
    monthlyBill: '2000',
    capacityKW: '3',
    hasRoof: 'Yes',
    timeline: 'Immediate',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneError, setPhoneError] = useState('');

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setFormData((prev) => ({ ...prev, phone: value }));
    if (phoneError && value.length === 10) {
      setPhoneError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.phone.length !== 10) {
      setPhoneError(t.validationPhone);
      return;
    }

    setIsSubmitting(true);

    // Instant UI Execution
    requestAnimationFrame(() => {
      const capacity = parseFloat(formData.capacityKW);
      let subsidy = 0;

      // PM Surya Ghar Scheme Subsidy Calculation Rule:
      // 1 kW = ₹30,000
      // 2 kW = ₹60,000
      // 3 kW to 10 kW = Max ₹78,000 (Capped)
      if (capacity <= 1) {
        subsidy = 30000;
      } else if (capacity === 2) {
        subsidy = 60000;
      } else if (capacity >= 3) {
        subsidy = 78000;
      }

      const estimatedCost = capacity * 55000;
      const netCost = Math.max(0, estimatedCost - subsidy);
      const loanAmount = netCost * 0.8;
      const monthlyInterestRate = 0.07 / 12; // 7% Annual Interest
      const tenureMonths = 60; // 5 Years tenure

      const emi =
        (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, tenureMonths)) /
        (Math.pow(1 + monthlyInterestRate, tenureMonths) - 1);

      const calculatedResult = {
        ...formData,
        capacity,
        subsidy,
        estimatedCost,
        netCost,
        loanAmount: Math.round(loanAmount),
        emi: Math.round(emi),
        submittedAt: new Date().toISOString(),
      };

      if (onCalculate) {
        onCalculate(calculatedResult);
      }

      setIsSubmitting(false);

      // Async Background Submission to Google Sheets
      fetch(
        'https://script.google.com/macros/s/AKfycbzrhgec0RBA1QqnqlqIMcy_p6v0Z-bYBGgPWCZ_5Xt4kwA4Uw4STvEPEoxzIQBl44Mcrg/exec',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8',
          },
          body: JSON.stringify(calculatedResult),
        }
      ).catch((error) => {
        console.error('Lead submission background error:', error);
      });
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200/80 p-5 sm:p-7 w-full max-w-2xl mx-auto font-sans transition-all">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl border border-amber-200/60">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
              {t.formTitle}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">{t.subtitle}</p>
          </div>
        </div>

        {/* Language Switch Button */}
        {setLang && (
          <button
            type="button"
            onClick={() => setLang(lang === 'hi' ? 'en' : 'hi')}
            className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold px-3 py-1.5 rounded-full border border-slate-300/80 transition-all cursor-pointer shadow-sm active:scale-95 ml-auto"
            aria-label="Switch Language"
          >
            <Languages className="w-4 h-4 text-amber-600" />
            <span>{t.switchLang}</span>
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name & Phone Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              {t.nameLabel}
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder={t.namePlaceholder}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 text-sm outline-none transition focus:bg-white focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              {t.phoneLabel}
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={handlePhoneChange}
              placeholder={t.phonePlaceholder}
              className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-lg text-slate-800 text-sm outline-none transition focus:bg-white focus:ring-2 focus:ring-amber-500/30 ${
                phoneError
                  ? 'border-rose-500 focus:border-rose-500'
                  : 'border-slate-300 focus:border-amber-500'
              }`}
            />
            {phoneError && (
              <p className="text-xs text-rose-600 mt-1 font-medium">{phoneError}</p>
            )}
          </div>
        </div>

        {/* State & Electricity Bill Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              {t.stateLabel}
            </label>
            <input
              type="text"
              required
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              placeholder={t.statePlaceholder}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 text-sm outline-none transition focus:bg-white focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              {t.billLabel}
            </label>
            <select
              value={formData.monthlyBill}
              onChange={(e) => setFormData({ ...formData, monthlyBill: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 text-sm outline-none transition focus:bg-white focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 cursor-pointer"
            >
              {t.billOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Solar System Capacity Selection (1 kW to 10 kW) */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
              {t.capacityLabel}
            </label>
            <span className="text-[11px] text-amber-600 font-medium">{t.maxSubsidyNote}</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative w-full">
              <Zap className="w-4 h-4 text-amber-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                value={formData.capacityKW}
                onChange={(e) => setFormData({ ...formData, capacityKW: e.target.value })}
                className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 text-sm font-bold outline-none transition focus:bg-white focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 cursor-pointer"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((kw) => (
                  <option key={kw} value={kw.toString()}>
                    {kw} kW System {kw >= 3 ? '(Max. ₹78,000 Subsidy)' : ''}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Roof Availability */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
            {t.roofLabel}
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, hasRoof: 'Yes' })}
              className={`py-2.5 px-3 text-xs sm:text-sm font-semibold rounded-xl border text-center transition-all cursor-pointer flex items-center justify-center gap-2 ${
                formData.hasRoof === 'Yes'
                  ? 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-500/20 shadow-sm'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <CheckCircle2
                className={`w-4 h-4 ${
                  formData.hasRoof === 'Yes' ? 'text-emerald-600' : 'text-slate-400'
                }`}
              />
              <span>{t.roofYes}</span>
            </button>

            <button
              type="button"
              onClick={() => setFormData({ ...formData, hasRoof: 'No' })}
              className={`py-2.5 px-3 text-xs sm:text-sm font-semibold rounded-xl border text-center transition-all cursor-pointer flex items-center justify-center gap-2 ${
                formData.hasRoof === 'No'
                  ? 'bg-rose-50 border-rose-400 text-rose-900 ring-2 ring-rose-500/20 shadow-sm'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span>{t.roofNo}</span>
            </button>
          </div>
        </div>

        {/* Timeline Selection */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            {t.timelineLabel}
          </label>
          <select
            value={formData.timeline}
            onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 text-xs sm:text-sm font-medium outline-none transition focus:bg-white focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 cursor-pointer"
          >
            {t.timelineOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold py-3.5 px-5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 disabled:opacity-60 cursor-pointer text-sm sm:text-base tracking-wide"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              {t.submitting}
            </span>
          ) : (
            <>
              <span>{t.submitBtn}</span>
              <ArrowRight className="w-5 h-5 shrink-0" />
            </>
          )}
        </button>

        {/* Security & Guarantee Badge */}
        <div className="flex items-center justify-center gap-1.5 text-slate-400 text-[11px] pt-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>100% नि:शुल्क एवं सुरक्षित सरकारी सब्सिडी गणना</span>
        </div>
      </form>
    </div>
  );
}