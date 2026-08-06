import React, { useState } from 'react';
import { Sun, ShieldCheck, Languages, Menu, X } from 'lucide-react';

const content = {
  hi: {
    notice: 'नोट: यह एक निजी सोलर सहायता एवं कैलकुलेटर पोर्टल है। सरकारी योजना की आधिकारिक वेबसाइट pmsuryaghar.gov.in है।',
    title: 'सोलर सब्सिडी कैलकुलेटर',
    subtitle: 'PM सूर्य घर योजना',
    navHome: 'होम',
    navCalc: 'कैलकुलेटर',
    navAbout: 'हमारे बारे में',
    navContact: 'संपर्क करें',
    langBtn: 'English'
  },
  en: {
    notice: 'Note: This is a private solar consultancy & calculator portal. Official website: pmsuryaghar.gov.in',
    title: 'Solar Subsidy Calculator',
    subtitle: 'PM Surya Ghar Scheme',
    navHome: 'Home',
    navCalc: 'Calculator',
    navAbout: 'About Us',
    navContact: 'Contact Us',
    langBtn: 'हिंदी में देखें'
  }
};

export default function Header({ lang = 'hi', setLang, activeTab, setActiveTab }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = content[lang] || content.hi;

  const toggleLanguage = () => {
    setLang(lang === 'hi' ? 'en' : 'hi');
  };

  const handleNavClick = (tab) => {
    setActiveTab(tab);
    setIsMenuOpen(false); // Mobile menu button click hone par toggle auto close hoga
  };

  return (
    <header className="bg-slate-900 text-white border-b-4 border-amber-500 sticky top-0 z-50 shadow-md">
      {/* Top Notice Bar */}
      <div className="bg-amber-600 text-slate-950 text-xs font-semibold py-1 px-4 text-center">
        {t.notice}
      </div>

      {/* Navbar Container */}
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center gap-4">
        {/* Logo Branding */}
        <div 
          onClick={() => handleNavClick('home')} 
          className="flex items-center gap-3 cursor-pointer select-none"
        >
          <div className="bg-amber-500 p-2 rounded-lg text-slate-900">
            <Sun className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
              {t.title}
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </h1>
            <p className="text-[11px] text-slate-400">{t.subtitle}</p>
          </div>
        </div>

        {/* Desktop Navigation (Same as original) */}
        <div className="hidden md:flex items-center gap-4 sm:gap-6 text-sm font-medium">
          <nav className="flex items-center gap-3 sm:gap-5 text-xs sm:text-sm">
            <button
              onClick={() => setActiveTab('home')}
              className={`transition pb-0.5 ${
                activeTab === 'home' ? 'text-amber-400 font-bold border-b-2 border-amber-400' : 'text-slate-300 hover:text-amber-400'
              }`}
            >
              {t.navHome}
            </button>
            <button
              onClick={() => setActiveTab('calculator')}
              className={`transition pb-0.5 ${
                activeTab === 'calculator' ? 'text-amber-400 font-bold border-b-2 border-amber-400' : 'text-slate-300 hover:text-amber-400'
              }`}
            >
              {t.navCalc}
            </button>
            <button
              onClick={() => setActiveTab('about')}
              className={`transition pb-0.5 ${
                activeTab === 'about' ? 'text-amber-400 font-bold border-b-2 border-amber-400' : 'text-slate-300 hover:text-amber-400'
              }`}
            >
              {t.navAbout}
            </button>
            <button
              onClick={() => setActiveTab('contact')}
              className={`transition pb-0.5 ${
                activeTab === 'contact' ? 'text-amber-400 font-bold border-b-2 border-amber-400' : 'text-slate-300 hover:text-amber-400'
              }`}
            >
              {t.navContact}
            </button>
          </nav>

          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold px-3 py-1.5 rounded-md text-xs transition border border-amber-400 shadow-sm"
          >
            <Languages className="w-4 h-4" />
            <span>{t.langBtn}</span>
          </button>
        </div>

        {/* Mobile View Controls (Language + 3 Line Toggle Button) */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 bg-amber-500 text-slate-950 font-semibold px-2 py-1 rounded text-xs"
          >
            <Languages className="w-3.5 h-3.5" />
            <span>{lang === 'hi' ? 'EN' : 'HI'}</span>
          </button>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-1.5 text-slate-200 hover:text-amber-400 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X className="w-6 h-6 text-amber-400" /> : <Menu className="w-6 h-6 text-amber-400" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-950 border-t border-slate-800 px-4 py-3 flex flex-col gap-3 text-sm">
          <button
            onClick={() => handleNavClick('home')}
            className={`text-left py-1.5 ${
              activeTab === 'home' ? 'text-amber-400 font-bold' : 'text-slate-300'
            }`}
          >
            {t.navHome}
          </button>
          <button
            onClick={() => handleNavClick('calculator')}
            className={`text-left py-1.5 ${
              activeTab === 'calculator' ? 'text-amber-400 font-bold' : 'text-slate-300'
            }`}
          >
            {t.navCalc}
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className={`text-left py-1.5 ${
              activeTab === 'about' ? 'text-amber-400 font-bold' : 'text-slate-300'
            }`}
          >
            {t.navAbout}
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className={`text-left py-1.5 ${
              activeTab === 'contact' ? 'text-amber-400 font-bold' : 'text-slate-300'
            }`}
          >
            {t.navContact}
          </button>
        </div>
      )}
    </header>
  );
}