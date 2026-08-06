import React from 'react';
import { Landmark, CheckCircle } from 'lucide-react';

const content = {
  hi: {
    emptyText: 'अपनी सब्सिडी और बैंक EMI की जानकारी प्राप्त करने के लिए बाईं ओर फॉर्म भरें।',
    estimatedDetails: 'अनुमानित विवरण',
    capacityLabel: 'क्षमता:',
    solarPlant: 'सोलर प्लांट',
    govtSubsidy: 'सरकारी सब्सिडी (PM सूर्य घर)',
    totalCost: 'कुल अनुमानित लागत',
    bankFinance: 'अनुमानित बैंक फाइनेंस / ऋण सुविधा',
    netCost: 'नेट लागत (सब्सिडी घटाकर):',
    bankLoan: 'अनुमानित बैंक लोन (80%):',
    emi: 'अनुमानित मासिक किस्त (EMI):',
    perMonth: '/माह',
    disclaimer: '*यह गणना 7% वार्षिक ब्याज दर (5 वर्ष की अवधि) पर आधारित एक अनुमान है।',
    contactNotice: 'हमारी टीम जल्द ही'
  },
  en: {
    emptyText: 'Fill the form on the left to get your subsidy and bank EMI details.',
    estimatedDetails: 'Estimated Details',
    capacityLabel: 'Capacity:',
    solarPlant: 'Solar Plant',
    govtSubsidy: 'Govt. Subsidy (PM Surya Ghar)',
    totalCost: 'Total Estimated Cost',
    bankFinance: 'Estimated Bank Financing / Loan Details',
    netCost: 'Net Cost (After Subsidy):',
    bankLoan: 'Estimated Bank Loan (80%):',
    emi: 'Estimated Monthly EMI:',
    perMonth: '/month',
    disclaimer: '*This calculation is an estimate based on a 7% annual interest rate for 5 years.',
    contactNotice: 'Our team will contact you shortly at'
  }
};

export default function ResultsSummary({ result, lang = 'hi' }) {
  const t = content[lang] || content.hi;

  if (!result) {
    return (
      <div className="bg-slate-100 border border-dashed border-slate-300 rounded-xl p-8 text-center text-slate-500">
        <p className="text-sm">{t.emptyText}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6 space-y-6">
      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 flex items-start gap-3">
        <CheckCircle className="w-6 h-6 text-emerald-600 mt-0.5 shrink-0" />
        <div>
          <h3 className="text-sm font-semibold text-emerald-900">{t.estimatedDetails} - {result.name}</h3>
          <p className="text-xs text-emerald-700">{t.capacityLabel} {result.capacityKW} kW {t.solarPlant}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
          <p className="text-xs text-slate-500 font-medium">{t.govtSubsidy}</p>
          <p className="text-2xl font-bold text-emerald-600 mt-1">₹{result.subsidy?.toLocaleString('en-IN')}</p>
        </div>

        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
          <p className="text-xs text-slate-500 font-medium">{t.totalCost}</p>
          <p className="text-2xl font-bold text-slate-800 mt-1">₹{result.estimatedCost?.toLocaleString('en-IN')}</p>
        </div>
      </div>

      <div className="border-t border-slate-100 pt-4">
        <h4 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
          <Landmark className="w-4 h-4 text-amber-600" />
          {t.bankFinance}
        </h4>

        <div className="bg-amber-50/50 rounded-lg p-4 border border-amber-200 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">{t.netCost}</span>
            <span className="font-semibold text-slate-800">₹{result.netCost?.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">{t.bankLoan}</span>
            <span className="font-semibold text-slate-800">₹{Math.round(result.loanAmount || 0).toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between text-sm border-t border-amber-200/60 pt-2 text-emerald-800 font-bold">
            <span>{t.emi}</span>
            <span>~ ₹{result.emi?.toLocaleString('en-IN')}{t.perMonth}*</span>
          </div>
        </div>
        <p className="text-[11px] text-slate-400 mt-2">{t.disclaimer}</p>
      </div>

      <div className="bg-slate-900 text-white p-4 rounded-lg text-center text-xs">
        {t.contactNotice} <span className="text-amber-400 font-semibold">{result.phone}</span> {lang === 'hi' ? 'पर आपसे संपर्क करेगी।' : ''}
      </div>
    </div>
  );
}