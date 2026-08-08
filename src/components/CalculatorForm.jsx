import React, { useState } from 'react';
import { Calculator, ArrowRight, CheckCircle2, ShieldCheck, Zap, MessageSquare } from 'lucide-react';

const translations = {
  hi: {
    formTitle: 'पीएम सूर्य घर: सब्सिडी व लोन कैलकुलेटर',
    subtitle: 'अपनी सौर ऊर्जा बचत और सरकारी सब्सिडी का तुरंत अनुमान लगाएं',
    nameLabel: 'पूरा नाम *',
    namePlaceholder: 'उदा. राहुल शर्मा',
    phoneLabel: 'व्हाट्सएप नंबर *',
    phonePlaceholder: '10 अंकों का व्हाट्सएप नंबर',
    stateLabel: 'राज्य *',
    statePlaceholder: 'उदा. उत्तर प्रदेश',
    billLabel: 'औसत मासिक बिजली बिल (₹)',
    billOptions: [
      { value: '1000', label: '₹1,000 तक (1 kW अनुशंसित)', kw: '1' },
      { value: '2500', label: '₹1,000 - ₹2,500 (2 kW अनुशंसित)', kw: '2' },
      { value: '5000', label: '₹2,500 - ₹5,000 (3 kW अनुशंसित)', kw: '3' },
      { value: '5001', label: '₹5,000 से अधिक (5 kW अनुशंसित)', kw: '5' }
    ],
    capacityLabel: 'सोलर सिस्टम क्षमता (kW)',
    maxSubsidyNote: '(UP में 3 kW पर अधिकतम ₹1,08,000 कुल सब्सिडी)',
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
    validationPhone: 'कृपया 10 अंकों का सही मोबाइल नंबर दर्ज करें',
    modalTitle: 'व्हाट्सएप पर परिणाम देखें',
    modalDesc: 'आपकी सब्सिडी और लोन गणना तैयार है! परिणाम देखने के लिए नीचे बटन पर क्लिक करके अपने व्हाट्सएप पर प्राप्त करें।',
    modalBtn: 'व्हाट्सएप खोलें और परिणाम देखें'
  },
  en: {
    formTitle: 'PM Surya Ghar: Subsidy & Loan Calculator',
    subtitle: 'Instantly estimate your solar savings and government subsidy',
    nameLabel: 'Full Name *',
    namePlaceholder: 'Ex. Rahul Sharma',
    phoneLabel: 'WhatsApp Number *',
    phonePlaceholder: '10-digit WhatsApp number',
    stateLabel: 'State *',
    statePlaceholder: 'Ex. Uttar Pradesh',
    billLabel: 'Average Monthly Electricity Bill (₹)',
    billOptions: [
      { value: '1000', label: 'Up to ₹1,000 (1 kW Recommended)', kw: '1' },
      { value: '2500', label: '₹1,000 - ₹2,500 (2 kW Recommended)', kw: '2' },
      { value: '5000', label: '₹2,500 - ₹5,000 (3 kW Recommended)', kw: '3' },
      { value: '5001', label: 'Above ₹5,000 (5 kW Recommended)', kw: '5' }
    ],
    capacityLabel: 'Solar System Capacity (kW)',
    maxSubsidyNote: '(Up to ₹1,08,000 total subsidy in UP for 3 kW+)',
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
    validationPhone: 'Please enter a valid 10-digit mobile number',
    modalTitle: 'Check Your WhatsApp',
    modalDesc: 'Your subsidy and loan calculation is ready! Click the button below to view and receive your detailed output on WhatsApp.',
    modalBtn: 'Open WhatsApp to View Output'
  }
};

export default function CalculatorForm({ lang = 'hi', onCalculate }) {
  const t = translations[lang] || translations.hi;

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    state: 'Uttar Pradesh',
    monthlyBill: '2500',
    capacityKW: '2', // Default according to 2500 bill
    hasRoof: 'Yes',
    timeline: 'Immediate',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [pendingResult, setPendingResult] = useState(null);

  const ADMIN_WHATSAPP_NUMBER = "919336518590"; 

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setFormData((prev) => ({ ...prev, phone: value }));
    if (phoneError && value.length === 10) {
      setPhoneError('');
    }
  };

  // Monthly Bill बदलने पर Automatic Capacity Change करने का फंक्शन
  const handleBillChange = (e) => {
    const selectedBillVal = e.target.value;
    const selectedOption = t.billOptions.find(opt => opt.value === selectedBillVal);
    
    setFormData((prev) => ({
      ...prev,
      monthlyBill: selectedBillVal,
      capacityKW: selectedOption ? selectedOption.kw : prev.capacityKW
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.phone.length !== 10) {
      setPhoneError(t.validationPhone);
      return;
    }

    setIsSubmitting(true);

    requestAnimationFrame(() => {
      const capacity = parseFloat(formData.capacityKW);
      
      // 1. केंद्र सरकार की सब्सिडी (Central Govt Subsidy)
      let centralSubsidy = 0;
      if (capacity <= 1) {
        centralSubsidy = 30000;
      } else if (capacity === 2) {
        centralSubsidy = 60000;
      } else if (capacity >= 3) {
        centralSubsidy = 78000;
      }

      // 2. उत्तर प्रदेश राज्य सरकार की सब्सिडी (UP State Govt Subsidy: ₹15,000/kW max ₹30,000)
      let stateSubsidy = 0;
      const isUP = formData.state.trim().toLowerCase().includes('up') || 
                   formData.state.trim().toLowerCase().includes('uttar pradesh') || 
                   formData.state.trim().toLowerCase().includes('उत्तर प्रदेश');

      if (isUP) {
        if (capacity === 1) {
          stateSubsidy = 15000;
        } else if (capacity >= 2) {
          stateSubsidy = 30000; // Max UP State Subsidy limit
        }
      }

      // कुल सब्सिडी
      const totalSubsidy = centralSubsidy + stateSubsidy;

      const estimatedCost = capacity * 55000;
      const netCost = Math.max(0, estimatedCost - totalSubsidy);
      
      // 80% Loan Amount (20% Down Payment/Margin Money)
      const loanAmount = netCost * 0.8;
      const monthlyInterestRate = 0.07 / 12; // 7% Annual Interest Rate
      const tenureMonths = 60; // 5 Years

      // Loan EMI Formula
      let calculatedEmi = 0;
      if (loanAmount > 0) {
        calculatedEmi = (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, tenureMonths)) /
                        (Math.pow(1 + monthlyInterestRate, tenureMonths) - 1);
      }

      // Exact Decimal EMI as String to prevent rounding everywhere
      const exactEmiString = calculatedEmi > 0 ? calculatedEmi.toFixed(2) : "0.00";

      const calculatedResult = {
        ...formData,
        capacity,
        centralSubsidy,
        stateSubsidy,
        subsidy: totalSubsidy,
        estimatedCost,
        netCost,
        loanAmount: Math.round(loanAmount),
        emi: exactEmiString, // Stored explicitly as exact decimal e.g. "316.80"
        submittedAt: new Date().toISOString(),
      };

      setPendingResult(calculatedResult);
      setIsSubmitting(false);
      setShowModal(true);

      // Google Sheets Lead Submission
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

  const handleOpenWhatsApp = () => {
    if (!pendingResult) return;

    const PARTNER_NAME = "Bluebird";
    const emiDisplay = pendingResult.emi; // Directly uses "316.80" string without rounding

    const outputText = lang === 'hi' ? 
      `☀️ *सोलर सब्सिडी कैलकुलेटर रिपोर्ट*\n\n` +
      `👤 *नाम:* ${pendingResult.name}\n` +
      `📱 *व्हाट्सएप नंबर:* ${pendingResult.phone}\n` +
      `📍 *राज्य:* ${pendingResult.state}\n` +
      `⚡ *सिस्टम क्षमता:* ${pendingResult.capacity} kW\n` +
      `💰 *अनुमानित लागत:* ₹${pendingResult.estimatedCost.toLocaleString('en-IN')}\n\n` +
      `🎁 *सरकारी सब्सिडी ब्रेकअप:*\n` +
      `  • केंद्र सरकार (PM Surya Ghar): ₹${pendingResult.centralSubsidy.toLocaleString('en-IN')}\n` +
      (pendingResult.stateSubsidy > 0 ? `  • राज्य सरकार (UPNEDA): ₹${pendingResult.stateSubsidy.toLocaleString('en-IN')}\n` : '') +
      `  • *कुल सब्सिडी:* ₹${pendingResult.subsidy.toLocaleString('en-IN')}\n\n` +
      `💳 *खुद का खर्च (Net Cost):* ₹${pendingResult.netCost.toLocaleString('en-IN')}\n` +
      `🏦 *अनुमानित लोन EMI (80% लोन @ 7% ब्याज, 5 वर्ष):* ₹${emiDisplay}/माह\n\n` +
      `🎉 *${PARTNER_NAME.toUpperCase()} का विशेष ऑफर*\n` +
      `पूरे सोलर सिस्टम इंस्टॉलेशन पर पाएं 30% तक की भारी छूट!\n` +
      `🔗 *ऑनलाइन देखें / खरीदें:* https://bluebirdsolar.com/collections/solar-panels?sca_ref=12015179.ntsfqhpbwm\n` +
      `📞 *डायरेक्ट हेल्पलाइन:* +91-011-47052209\n\n` +
      `सोलर पैनल की बुकिंग और अधिक जानकारी के लिए, दिए गए लिंक पर क्लिक करके पोर्टल पर जाएं या संपर्क करें।`
      :
      `☀️ *SOLAR SUBSIDY CALCULATOR REPORT*\n\n` +
      `👤 *Name:* ${pendingResult.name}\n` +
      `📱 *WhatsApp Number:* ${pendingResult.phone}\n` +
      `📍 *State:* ${pendingResult.state}\n` +
      `⚡ *System Capacity:* ${pendingResult.capacity} kW\n` +
      `💰 *Estimated Cost:* ₹${pendingResult.estimatedCost.toLocaleString('en-IN')}\n\n` +
      `🎁 *Govt. Subsidy Breakup:*\n` +
      `  • Central Govt (PM Surya Ghar): ₹${pendingResult.centralSubsidy.toLocaleString('en-IN')}\n` +
      (pendingResult.stateSubsidy > 0 ? `  • State Govt (UPNEDA): ₹${pendingResult.stateSubsidy.toLocaleString('en-IN')}\n` : '') +
      `  • *Total Subsidy:* ₹${pendingResult.subsidy.toLocaleString('en-IN')}\n\n` +
      `💳 *Net Out-of-Pocket Cost:* ₹${pendingResult.netCost.toLocaleString('en-IN')}\n` +
      `🏦 *Estimated Loan EMI (80% Loan @ 7% Int, 5 Yrs):* ₹${emiDisplay}/month\n\n` +
      `🎉 *EXCLUSIVE OFFER BY ${PARTNER_NAME.toUpperCase()}*\n` +
      `Get Up to 30% OFF on complete system installation!\n` +
      `🔗 *Buy Online / Explore:* https://bluebirdsolar.com/collections/solar-panels?sca_ref=12015179.ntsfqhpbwm\n` +
      `📞 *Direct Helpline:* +91-011-47052209\n\n` +
      `To book solar panels and for more information, visit the portal by clicking the provided link or contact us immediately.`;

    const encodedMessage = encodeURIComponent(outputText);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${ADMIN_WHATSAPP_NUMBER}&text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');

    if (onCalculate) {
      onCalculate(pendingResult);
    }
    setShowModal(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200/80 p-5 sm:p-7 w-full max-w-2xl mx-auto font-sans transition-all relative">
      {/* Header Bar */}
      <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
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
              onChange={handleBillChange}
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

        {/* Capacity Selection */}
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
                    {kw} kW System {kw === 1 ? '(₹45k Subsidy in UP)' : kw === 2 ? '(₹90k Subsidy in UP)' : '(Max ₹1,08,000 Subsidy in UP)'}
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

        {/* Security Badge */}
        <div className="flex items-center justify-center gap-1.5 text-slate-400 text-[11px] pt-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>100% नि:शुल्क एवं सुरक्षित सरकारी सब्सिडी गणना</span>
        </div>
      </form>

      {/* WhatsApp Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white border border-slate-200 p-6 rounded-2xl text-center max-w-sm w-full space-y-4 shadow-2xl">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-3xl">
              <MessageSquare className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">{t.modalTitle}</h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              {t.modalDesc}
            </p>
            <button
              type="button"
              onClick={handleOpenWhatsApp}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-600/30 cursor-pointer text-sm"
            >
              <MessageSquare className="w-5 h-5" />
              <span>{t.modalBtn}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}