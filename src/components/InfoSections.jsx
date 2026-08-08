import React from 'react';
import { FileText, Sun, Wallet, CheckCircle2, HelpCircle } from 'lucide-react';

const content = {
  hi: {
    tableTitle: 'PM सूर्य घर योजना: सब्सिडी संरचना (Subsidy Slab)',
    colCapacity: 'सोलर प्लांट क्षमता',
    colSubsidy: 'सरकारी सब्सिडी',
    colSavings: 'अनुमानित मासिक बचत',
    subsidyData: [
      { capacity: '1 kW', subsidy: '₹45,000 (केंद्र ₹30k + UP ₹15k)', billSavings: '₹1,000 - ₹1,500/माह' },
      { capacity: '2 kW', subsidy: '₹90,000 (केंद्र ₹60k + UP ₹30k)', billSavings: '₹2,500 - ₹3,000/माह' },
      { capacity: '3 kW या अधिक', subsidy: '₹1,08,000 (अधिकतम)', billSavings: '₹4,500+/माह' },
    ],
    howItWorksTitle: 'यह कैसे काम करता है?',
    howItWorksSubtitle: '3 आसान चरणों में अपने घर पर सोलर लगवाएं',
    steps: [
      {
        title: '1. डिटेल्स भरें',
        desc: 'ऊपर दिए गए कैलकुलेटर में अपनी सोलर आवश्यकताएं और बुनियादी जानकारी दर्ज करें।',
      },
      {
        title: '2. वेंडर परामर्श',
        desc: 'हमारे सर्टिफाइड सोलर वेंडर पार्टनर आपसे संपर्क करेंगे और साइट सर्वे प्लान करेंगे।',
      },
      {
        title: '3. सब्सिडी व लोन प्रोसेस',
        desc: 'पीएम सूर्य घर पोर्टल पर आवेदन और आसान बैंक लोन अप्रूवल में आपकी पूरी मदद की जाएगी।',
      },
    ],
    faqTitle: 'अक्सर पूछे जाने वाले सवाल (FAQs)',
    faqs: [
      {
        q: 'PM सूर्य घर योजना के तहत ₹1,08,000 की सब्सिडी किसे मिलती है?',
        a: '3 kW या उससे अधिक क्षमता के रूफटॉप सोलर सिस्टम लगवाने वाले आवासीय (Residential) उपभोक्ताओं को अधिकतम ₹1,08,000 की केंद्रीय वित्तीय सहायता (Subsidy) मिलती है।',
      },
      {
        q: 'क्या सोलर सिस्टम के लिए आसान बैंक लोन उपलब्ध है?',
        a: 'हाँ, इस योजना के तहत प्रमुख राष्ट्रीयकृत बैंक लगभग 7% की रियायती ब्याज दर पर बिना किसी जटिल गारंटी के 80% तक का लोन प्रदान करते हैं।',
      },
    ]
  },
  en: {
    tableTitle: 'PM Surya Ghar Scheme: Subsidy Structure',
    colCapacity: 'Solar Plant Capacity',
    colSubsidy: 'Govt. Subsidy',
    colSavings: 'Est. Monthly Savings',
   subsidyData: [
  { capacity: '1 kW', subsidy: '₹45,000 (केंद्र + UP)', billSavings: '₹1,000 - ₹1,500/month' },
  { capacity: '2 kW', subsidy: '₹90,000 (केंद्र + UP)', billSavings: '₹2,500 - ₹3,000/month' },
  { capacity: '3 kW or more', subsidy: '₹1,08,000 (Max)', billSavings: '₹4,500+/month' },
],
    howItWorksTitle: 'How It Works',
    howItWorksSubtitle: 'Get solar installed on your roof in 3 easy steps',
    steps: [
      {
        title: '1. Fill Details',
        desc: 'Enter your solar requirements and basic information in the calculator above.',
      },
      {
        title: '2. Vendor Consultation',
        desc: 'Our certified solar vendor partners will contact you and schedule a site survey.',
      },
      {
        title: '3. Subsidy & Loan Assistance',
        desc: 'Complete assistance for PM Surya Ghar portal application and bank loan approval.',
      },
    ],
    faqTitle: 'Frequently Asked Questions (FAQs)',
    faqs: [
      {
        q: 'Who gets the ₹1,08,000 subsidy under PM Surya Ghar Scheme?',
        a: 'Residential consumers installing rooftop solar systems of 3 kW or higher capacity are eligible for the maximum central subsidy of ₹1,08,000.',
      },
      {
        q: 'Are easy bank loans available for solar installation?',
        a: 'Yes, under this scheme, major nationalized banks offer collateral-free loans up to 80% at a concessional interest rate of around 7%.',
      },
    ]
  }
};

export default function InfoSections({ lang = 'hi' }) {
  const t = content[lang] || content.hi;
  const icons = [
    <FileText className="w-6 h-6 text-amber-600" />,
    <Sun className="w-6 h-6 text-amber-600" />,
    <Wallet className="w-6 h-6 text-amber-600" />
  ];

  return (
    <div className="space-y-12 my-12">
      {/* Subsidy Structure Table */}
      <section className="bg-white rounded-xl shadow-md border border-slate-200 p-6">
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          {t.tableTitle}
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-900 text-white">
                <th className="p-3 rounded-tl-lg">{t.colCapacity}</th>
                <th className="p-3">{t.colSubsidy}</th>
                <th className="p-3 rounded-tr-lg">{t.colSavings}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {t.subsidyData.map((row, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                  <td className="p-3 font-semibold text-slate-700">{row.capacity}</td>
                  <td className="p-3 font-bold text-emerald-600">{row.subsidy}</td>
                  <td className="p-3 text-slate-600">{row.billSavings}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* How It Works */}
      <section>
        <div className="text-center mb-8">
          <h3 className="text-xl font-bold text-slate-800">{t.howItWorksTitle}</h3>
          <p className="text-xs text-slate-500 mt-1">{t.howItWorksSubtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.steps.map((step, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center">
              <div className="w-12 h-12 bg-amber-50 border border-amber-200 rounded-full flex items-center justify-center mx-auto mb-4">
                {icons[idx]}
              </div>
              <h4 className="font-semibold text-slate-800 mb-2">{step.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-white rounded-xl shadow-md border border-slate-200 p-6">
        <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-amber-600" />
          {t.faqTitle}
        </h3>
        <div className="space-y-4">
          {t.faqs.map((faq, idx) => (
            <div key={idx} className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <h4 className="font-semibold text-sm text-slate-800">{faq.q}</h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}