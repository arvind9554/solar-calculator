import React from 'react';

const content = {
  hi: {
    aboutTitle: 'हमारे बारे में (About Us)',
    aboutText: 'हम एक स्वतंत्र परामर्श मंच हैं जो उपभोक्ताओं को PM सूर्य घर मुफ्त बिजली योजना के तहत सोलर सब्सिडी, लागत और बैंक लोन के सही अनुमान की जानकारी प्रदान करते हैं।',
    contactTitle: 'संपर्क करें (Contact Us)',
    contactEmail: 'ईमेल: support@solarcounsel.in',
    contactHelp: 'सहायता: सोमवार से शनिवार (सुबह 10 से शाम 6 बजे)',
    quickLinks: 'महत्वपूर्ण लिंक्स',
    privacy: 'गोपनीयता नीति (Privacy Policy)',
    terms: 'नियम एवं शर्तें (Terms & Conditions)',
    disclaimerTitle: 'अस्वीकरण (Disclaimer)',
    disclaimer: 'यह वेबसाइट एक निजी परामर्श मंच है और भारत सरकार या किसी सरकारी एजेंसी से सीधे संबद्ध नहीं है। आधिकारिक सब्सिडी आवेदन के लिए pmsuryaghar.gov.in पर जाएं।',
    copyright: `© ${new Date().getFullYear()} सोलर कंसल्टेंसी सर्विसेज। सर्वाधिकार सुरक्षित।`
  },
  en: {
    aboutTitle: 'About Us',
    aboutText: 'We are an independent consultancy platform providing consumers with accurate estimations of solar subsidies, costs, and bank financing under the PM Surya Ghar Scheme.',
    contactTitle: 'Contact Us',
    contactEmail: 'Email: support@solarcounsel.in',
    contactHelp: 'Support: Mon to Sat (10 AM to 6 PM)',
    quickLinks: 'Quick Links',
    privacy: 'Privacy Policy',
    terms: 'Terms & Conditions',
    disclaimerTitle: 'Disclaimer',
    disclaimer: 'This website is a private consultancy platform and is not directly affiliated with the Government of India or any government agency. For official government portal and subsidy applications, please visit pmsuryaghar.gov.in.',
    copyright: `© ${new Date().getFullYear()} Solar Consultancy Services. All rights reserved.`
  }
};

export default function Footer({ lang = 'hi', setActiveTab }) {
  const t = content[lang] || content.hi;

  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 mt-16 pt-12 pb-8">
      <div className="max-w-6xl mx-auto px-4 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-slate-800">
          {/* About Column */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-white">{t.aboutTitle}</h4>
            <p className="text-slate-400 leading-relaxed">{t.aboutText}</p>
            <button onClick={() => { setActiveTab('about'); window.scrollTo(0,0); }} className="text-amber-400 text-xs underline font-medium">
              {lang === 'hi' ? 'और पढ़ें →' : 'Read More →'}
            </button>
          </div>

          {/* Contact Column */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-white">{t.contactTitle}</h4>
            <p className="text-slate-400">{t.contactEmail}</p>
            <p className="text-slate-400">{t.contactHelp}</p>
            <button onClick={() => { setActiveTab('contact'); window.scrollTo(0,0); }} className="text-amber-400 text-xs underline font-medium">
              {lang === 'hi' ? 'संपर्क फ़ॉर्म खोलें →' : 'Open Contact Form →'}
            </button>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-white">{t.quickLinks}</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>
                <button onClick={() => { setActiveTab('privacy'); window.scrollTo(0,0); }} className="hover:text-amber-400 transition">
                  {t.privacy}
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('terms'); window.scrollTo(0,0); }} className="hover:text-amber-400 transition">
                  {t.terms}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <p className="text-slate-500 leading-relaxed">
            <strong className="text-slate-400">{t.disclaimerTitle}:</strong> {t.disclaimer}
          </p>
          <p className="text-slate-500 pt-2">{t.copyright}</p>
        </div>
      </div>
    </footer>
  );
}