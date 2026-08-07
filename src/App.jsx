import React, { useState, useEffect, useMemo, useRef } from 'react';
import Header from './components/Header';
import AboutUs from './components/AboutUs';
import CalculatorForm from './components/CalculatorForm';
import ResultsSummary from './components/ResultsSummary';
import InfoSections from './components/InfoSections';
import Footer from './components/Footer';
import { Mail, Phone, MapPin, Send, ShieldCheck, Sun, FileText, FileCheck, Wrench, CheckCircle2, Lock, UserCheck, Eye, Database } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState('hi');
  const [activeTab, setActiveTab] = useState('home'); // 'home', 'calculator', 'about', 'contact', 'privacy', 'terms'
  const [calculationResult, setCalculationResult] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const resultsRef = useRef(null);

  // 4 High Quality Solar Images for Home Hero Zoom Slider
  const heroImages = useMemo(() => [
    '/solar1.jpg',
    '/solar2.jpg',
    '/solar3.jpg',
    '/solar4.jpg',
  ], []);

  // Auto transition for hero zoom images
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  // Handle calculation result & auto scroll to results summary
  const handleCalculation = (data) => {
    setCalculationResult(data);
    if (resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col justify-between font-sans selection:bg-amber-500 selection:text-slate-950">
      <div>
        {/* Navigation Header */}
        <Header lang={lang} setLang={setLang} activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="max-w-6xl mx-auto px-3 sm:px-6 py-4 sm:py-8">
          {/* ==================== 1. HOME PAGE ==================== */}
          {activeTab === 'home' && (
            <div className="space-y-6 sm:space-y-12">
              {/* Hero Section */}
              <div className="relative h-[200px] xs:h-[240px] sm:h-[450px] rounded-2xl overflow-hidden shadow-xl border border-slate-700">
                {heroImages.map((img, idx) => (
                  <div
                    key={idx}
                    className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out transform ${
                      idx === currentSlide ? 'opacity-100 scale-105 sm:scale-110' : 'opacity-0 scale-100'
                    }`}
                    style={{ backgroundImage: `url(${img})` }}
                  />
                ))}

                {/* Dark Overlay for Text Visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent flex flex-col justify-end p-3.5 sm:p-10 text-white">
                  <span className="bg-amber-500 text-slate-950 text-[10px] sm:text-xs font-bold px-2 py-0.5 sm:px-3 sm:py-1 rounded-full w-fit mb-1 sm:mb-3 shadow-md">
                    {lang === 'hi' ? 'PM सूर्य घर मुफ़्त बिजली योजना' : 'PM Surya Ghar Scheme'}
                  </span>
                  <h2 className="text-base xs:text-lg sm:text-4xl font-extrabold text-white leading-tight">
                    {lang === 'hi' ? 'स्वच्छ ऊर्जा अपनाएं, ₹78,000 की सब्सिडी पाएं' : 'Adopt Clean Energy, Get Up to ₹78,000 Subsidy'}
                  </h2>
                  <p className="hidden sm:block text-xs sm:text-sm text-slate-200 mt-1 sm:mt-2 max-w-2xl leading-relaxed">
                    {lang === 'hi'
                      ? 'अपने घर की छत पर सोलर रूफटॉप लगवाएं और भारी-भरकम बिजली बिलों से स्थायी मुक्ति पाएं।'
                      : 'Install rooftop solar on your home and eliminate heavy electricity bills forever.'}
                  </p>
                  <div className="mt-2 sm:mt-6 flex flex-row gap-2 sm:gap-4">
                    <button
                      onClick={() => setActiveTab('calculator')}
                      className="bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-bold px-2.5 py-1 sm:px-6 sm:py-2.5 rounded-lg text-xs sm:text-sm shadow-lg transition-all text-center cursor-pointer"
                    >
                      {lang === 'hi' ? 'कैलकुलेटर चलाएं' : 'Launch Calculator'}
                    </button>
                    <button
                      onClick={() => setActiveTab('about')}
                      className="bg-slate-800/80 hover:bg-slate-800 active:scale-95 text-white font-medium px-2.5 py-1 sm:px-6 sm:py-2.5 rounded-lg text-xs sm:text-sm border border-slate-600 transition-all backdrop-blur-md text-center cursor-pointer"
                    >
                      {lang === 'hi' ? 'योजना जानें' : 'Learn About'}
                    </button>
                  </div>
                </div>

                {/* Slider Dots */}
                <div className="absolute bottom-2.5 right-2.5 sm:bottom-4 sm:right-6 flex gap-1 sm:gap-2">
                  {heroImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      aria-label={`Slide ${idx + 1}`}
                      className={`h-1.5 sm:h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                        idx === currentSlide ? 'bg-amber-400 w-3.5 sm:w-6' : 'bg-white/50 w-1.5 sm:w-2.5'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Home Main Grid */}
              <div className="space-y-6 sm:space-y-8">
                {/* Calculator Section */}
                <div className="bg-white rounded-xl shadow-md border border-slate-200 p-3.5 sm:p-6" ref={resultsRef}>
                  <div className="text-center max-w-2xl mx-auto mb-3 sm:mb-4">
                    <span className="bg-amber-100 text-amber-800 text-[10px] sm:text-xs font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      {lang === 'hi' ? 'डिजिटल अनुमान कैलकुलेटर' : 'Digital Estimation Calculator'}
                    </span>
                    <h3 className="text-base sm:text-xl font-bold text-slate-800 mt-1">
                      {lang === 'hi' ? 'सोलर सब्सिडी और बैंक EMI कैलकुलेटर' : 'Solar Subsidy & Bank EMI Calculator'}
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 items-start">
                    <CalculatorForm lang={lang} setLang={setLang} onCalculate={handleCalculation} />
                    <ResultsSummary result={calculationResult} lang={lang} />
                  </div>
                </div>

                {/* Informational Content */}
                <div className="bg-white rounded-xl shadow-md border border-slate-200 p-3.5 sm:p-8 space-y-4 sm:space-y-6">
                  <div className="border-b border-slate-100 pb-2.5 sm:pb-3">
                    <h3 className="text-base sm:text-xl font-bold text-slate-800 flex items-center gap-2">
                      <Sun className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500 shrink-0" />
                      {lang === 'hi' ? 'PM सूर्य घर योजना 2026: एक हरित पहल' : 'PM Surya Ghar Scheme 2026: A Green Initiative'}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-center">
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
                      {lang === 'hi'? 'भारत सरकार द्वारा शुरू की गई PM सूर्य घर: मुफ्त बिजली योजना देश के 1 करोड़ से अधिक परिवारों को स्वच्छ, पर्यावरण-अनुकूल और किफायती सौर ऊर्जा से जोड़ने का एक दूरदर्शी और महत्वाकांक्षी राष्ट्रीय अभियान है। इस योजना का प्राथमिक उद्देश्य मध्यम और निम्न-मध्यम आय वर्ग वाले परिवारों के मासिक बिजली बिलों के भारी-भरकम वित्तीय बोझ को खत्म करके उन्हें ऊर्जा के क्षेत्र में पूरी तरह आत्मनिर्भर बनाना है। इसके तहत पात्र लाभार्थियों को अपने छतों (Rooftops) पर सोलर पैनल स्थापित करने के लिए भारत सरकार द्वारा ₹78,000 तक की प्रत्यक्ष डीबीटी (Direct Benefit Transfer) सब्सिडी प्रदान की जाती है। इतना ही नहीं, अतिरिक्त लागत को आसान बनाने के लिए बैंकों के माध्यम से बहुत कम ब्याज दर पर बिना किसी जटिल गारंटी के लोन (Collateral-Free Financing) की सुविधा भी उपलब्ध कराई जाती है। यह योजना न केवल आम नागरिकों को हर महीने 300 यूनिट तक मुफ्त बिजली का लाभ देती है, बल्कि नेट-मीटरिंग तकनीक के माध्यम से अतिरिक्त उत्पादित बिजली को DISCOM को बेचकर अतिरिक्त आय कमाने का शानदार अवसर भी प्रदान करती है।'
                      : 'The PM Surya Ghar: Muft Bijli Yojana, launched by the Government of India, is a visionary and ambitious national initiative aimed at empowering over 1 crore households across the country with clean, sustainable, and affordable solar energy. The primary objective of this flagship scheme is to relieve middle and lower-middle-income families from the heavy financial burden of monthly electricity bills, fostering complete energy independence. Under this scheme, eligible beneficiaries receive a direct government subsidy (DBT) of up to ₹78,000 for installing rooftop solar systems. To make solar adoption seamlessly accessible, collateral-free bank loans are also facilitated at highly concessional interest rates. Beyond delivering up to 300 units of free electricity every month, the scheme allows households to generate passive income by feeding surplus power back into the grid through smart net-metering technology.'}
                     </p>
                    <img
                      src="/solar-working-structure.jpg"
                      alt="Working of a Solar Energy System"
                      className="w-full h-auto max-h-72 object-contain bg-[#f8f5ee] rounded-xl shadow-md border border-slate-200 p-2"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-center pt-1 sm:pt-4">
                    <img
                      src="/solar-install.jpg"
                      alt="Solar Installation Work"
                      className="w-full h-auto max-h-72 object-contain bg-[#f8f5ee] rounded-xl shadow-md border border-slate-200 p-2"
                    />
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify order-1 md:order-2">
                      {lang === 'hi'
                        ? 'नवीन एवं नवीकरणीय ऊर्जा मंत्रालय (MNRE) द्वारा संचालित इस योजना के अंतर्गत पारदर्शी और त्वरित वित्तीय सहायता (सब्सिडी) की पूरी राशि बिना किसी बिचौलिए के सीधे लाभार्थी के आधार-लिंक्ड बैंक खाते में हस्तांतरित (DBT) की जाती है। केंद्र सरकार की इस मानक संरचना के तहत, 1 किलोवाट (kW) क्षमता वाले आवासीय सोलर सिस्टम की स्थापना पर ₹30,000 की वित्तीय सहायता दी जाती है। वहीं 2 किलोवाट (kW) क्षमता के सिस्टम के लिए ₹60,000 की सब्सिडी निर्धारित की गई है। 3 किलोवाट (kW) या उससे अधिक क्षमता के बड़े सोलर प्लांट्स स्थापित करने पर लाभार्थियों को अधिकतम ₹78,000 की केंद्रीय सब्सिडी का लाभ मिलता है। यह सब्सिडी प्रक्रिया पूरी तरह डिजिटल है, जिससे आवेदकों को आवेदन की स्थिति, डीआईएसकॉम (DISCOM) अप्रूवल और बैंक खाते में फंड ट्रांसफर की हर जानकारी ऑनलाइन पोर्टल पर पारदर्शी तरीके से प्राप्त होती है।'
                      : 'Under the Ministry of New and Renewable Energy (MNRE), a fully transparent and streamlined Direct Benefit Transfer (DBT) mechanism ensures financial assistance (subsidy) is transferred straight into the beneficiary’s verified bank account without intermediary intervention. As per the standardized central subsidy framework, residential rooftop solar installations of 1 kW capacity receive a fixed financial aid of ₹30,000. For a 2 kW capacity system, the subsidy scales up to ₹60,000. For systems rated at 3 kW or higher, eligible households receive the maximum baseline central subsidy of ₹78,000. The entire allocation pipeline is managed digitally, allowing consumers to track application processing, DISCOM technical sanctioning, and subsidy release status directly on the centralized portal with full visibility.'}
                  </p>
                  </div>
                </div>

                {/* Requirements & Guidelines */}
                <div className="bg-white rounded-xl shadow-md border border-slate-200 p-4 sm:p-8 space-y-6 sm:space-y-8">
                  <div className="text-center max-w-2xl mx-auto border-b border-slate-100 pb-4">
                    <span className="bg-amber-100 text-amber-800 text-[10px] sm:text-xs font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      {lang === 'hi' ? 'आवेदन गाइडलाइन' : 'Application Guidelines'}
                    </span>
                    <h3 className="text-lg sm:text-2xl font-bold text-slate-800 mt-1">
                      {lang === 'hi' ? 'महत्वपूर्ण जानकारी एवं दिशानिर्देश' : 'Key Guidelines & Requirements'}
                    </h3>
                  </div>

                  {/* 1. Documents Required */}
                  <div className="bg-slate-50 p-4 sm:p-6 rounded-xl border border-slate-200 space-y-3 sm:space-y-4">
                    <h4 className="text-base sm:text-lg font-bold text-slate-800 flex items-center gap-2">
                      <FileCheck className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600 shrink-0" />
                      {lang === 'hi' ? '1. अनिवार्य दस्तावेज (Documents Required)' : '1. Mandatory Documents Required'}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 font-medium">
                      {lang === 'hi'
                        ? 'आवेदन प्रक्रिया शुरू करने के लिए यूजर के पास ये दस्तावेज होने चाहिए:'
                        : 'The user must have the following documents ready before starting the application process:'}
                    </p>
                    <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm text-slate-700">
                      <li className="flex items-start gap-2">
                        <span className="font-bold text-amber-600 shrink-0">•</span>
                        <span>
                          <strong>{lang === 'hi' ? 'बिजली का नवीनतम बिल:' : 'Latest Electricity Bill:'}</strong>{' '}
                          {lang === 'hi'
                            ? '(Consumer Number और Sanctioned Load जांचने के लिए)।'
                            : '(To verify Consumer Number & Sanctioned Load).'}
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-bold text-amber-600 shrink-0">•</span>
                        <span>
                          <strong>{lang === 'hi' ? 'पहचान पत्र:' : 'Identity Proof:'}</strong>{' '}
                          {lang === 'hi' ? 'सरकारी पहचान पत्र।' : 'Government ID Proof.'}
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-bold text-amber-600 shrink-0">•</span>
                        <span>
                          <strong>{lang === 'hi' ? 'पते का प्रमाण:' : 'Address / Property Proof:'}</strong>{' '}
                          {lang === 'hi'
                            ? 'प्रॉपर्टी के मालिकाना हक का दस्तावेज या टैक्स रसीद।'
                            : 'Property ownership documents or latest house tax receipt.'}
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-bold text-amber-600 shrink-0">•</span>
                        <span>
                          <strong>{lang === 'hi' ? 'बैंक पासबुक या कैंसिल्ड चेक:' : 'Bank Passbook or Cancelled Cheque:'}</strong>{' '}
                          {lang === 'hi'
                            ? 'ताकि सरकार द्वारा सब्सिडी का पैसा सीधे बैंक खाते में (DBT के जरिए) भेजा जा सके।'
                            : 'Ensures direct subsidy transfer straight into your bank account via Direct Benefit Transfer (DBT).'}
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* 2. Technical Requirements */}
                  <div className="bg-slate-50 p-4 sm:p-6 rounded-xl border border-slate-200 space-y-3 sm:space-y-4">
                    <h4 className="text-base sm:text-lg font-bold text-slate-800 flex items-center gap-2">
                      <Wrench className="w-5 h-5 sm:w-6 sm:h-6 text-sky-600 shrink-0" />
                      {lang === 'hi' ? '2. तकनीकी आवश्यकताएं (Technical Requirements)' : '2. Technical Requirements'}
                    </h4>
                    <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                      <li className="flex items-start gap-2">
                        <span className="font-bold text-sky-600 shrink-0">•</span>
                        <span>
                          <strong>{lang === 'hi' ? 'छत पर खाली जगह:' : 'Rooftop Space:'}</strong>{' '}
                          {lang === 'hi'
                            ? '1 kW सोलर सिस्टम लगाने के लिए लगभग 90 से 120 वर्ग फुट (sq. ft.) छायारहित (shadow-free) खुली छत की जरूरत होती है।'
                            : 'Around 90 to 120 sq. ft. of shadow-free open rooftop area is required for installing a 1 kW solar system.'}
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-bold text-sky-600 shrink-0">•</span>
                        <span>
                          <strong>{lang === 'hi' ? 'मंजूरी (Feasibility Approval):' : 'Feasibility Approval:'}</strong>{' '}
                          {lang === 'hi'
                            ? 'आपकी स्थानीय बिजली वितरण कंपनी (DISCOM) यह जांचती है कि आपके घर का स्वीकृत लोड (Sanctioned Load) सोलर प्लांट की क्षमता के अनुकूल है या नहीं।'
                            : 'Your local DISCOM verifies whether your sanctioned load matches the requested solar capacity.'}
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* 3. Application Process */}
                  <div className="bg-slate-50 p-4 sm:p-6 rounded-xl border border-slate-200 space-y-3 sm:space-y-4">
                    <h4 className="text-base sm:text-lg font-bold text-slate-800 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 shrink-0" />
                      {lang === 'hi' ? '3. सही और सुरक्षित आवेदन प्रक्रिया (How to Apply Properly)' : '3. Official Application Steps'}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 font-medium">
                      {lang === 'hi'
                        ? 'यूज़र को किसी भी धोखाधड़ी से बचने के लिए केवल सरकार के आधिकारिक पोर्टल पर ही आवेदन करना चाहिए:'
                        : 'To avoid online frauds, users must strictly apply through the government official portal:'}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700">
                      <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                        <span className="font-bold text-amber-600 block mb-0.5">{lang === 'hi' ? 'स्टेप 1:' : 'Step 1:'}</span>
                        {lang === 'hi' ? 'सबसे पहले सरकार की आधिकारिक वेबसाइट ' : 'Visit official portal '}
                        <a
                          href="https://pmsuryaghar.gov.in"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 font-medium underline"
                        >
                          pmsuryaghar.gov.in
                        </a>
                        {lang === 'hi' ? ' पर जाकर रजिस्ट्रेशन करें।' : ' and complete registration.'}
                      </div>

                      <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                        <span className="font-bold text-amber-600 block mb-0.5">{lang === 'hi' ? 'स्टेप 2:' : 'Step 2:'}</span>
                        {lang === 'hi'
                          ? 'पोर्टल पर मौजूद MNRE-Empaneled Vendors (सरकार द्वारा मान्यता प्राप्त कंपनियों) की सूची में से ही किसी एक वेंडर को चुनें। यदि यूज़र किसी गैर-पंजीकृत वेंडर से काम करवाता है, तो सरकारी सब्सिडी नहीं मिलेगी।'
                          : 'Select an MNRE-empaneled vendor. Installing through unempaneled vendors forfeits government subsidy eligibility.'}
                      </div>

                      <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                        <span className="font-bold text-amber-600 block mb-0.5">{lang === 'hi' ? 'स्टेप 3:' : 'Step 3:'}</span>
                        {lang === 'hi'
                          ? 'वेंडर द्वारा सिस्टम लगाने के बाद DISCOM अधिकारी आकर नेट-मीटर (Net-Meter) इंस्टॉल करेंगे।'
                          : 'Post-installation, local DISCOM officers inspect and install the Net-Meter.'}
                      </div>

                      <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                        <span className="font-bold text-amber-600 block mb-0.5">{lang === 'hi' ? 'स्टेप 4:' : 'Step 4:'}</span>
                        {lang === 'hi'
                          ? 'नेट-मीटरिंग और फाइनल निरीक्षण के 30 दिनों के भीतर सरकारी सब्सिडी सीधे यूज़र के खाते में आ जाएगी।'
                          : 'Direct DBT subsidy gets credited straight into your bank account within 30 days of inspection.'}
                      </div>
                    </div>
                  </div>
                </div>

                <InfoSections lang={lang} />
              </div>
            </div>
          )}

          {/* ==================== 2. CALCULATOR TAB ==================== */}
          {activeTab === 'calculator' && (
            <div className="space-y-4 sm:space-y-8" ref={resultsRef}>
              <div className="text-center max-w-2xl mx-auto mb-3 sm:mb-6">
                <span className="bg-amber-100 text-amber-800 text-[10px] sm:text-xs font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {lang === 'hi' ? 'डिजिटल अनुमान कैलकुलेटर' : 'Digital Estimation Calculator'}
                </span>
                <h2 className="text-lg sm:text-2xl font-bold text-slate-800 mt-1.5 sm:mt-2">
                  {lang === 'hi' ? 'सोलर सब्सिडी और बैंक EMI कैलकुलेटर' : 'Solar Subsidy & Bank EMI Calculator'}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  {lang === 'hi'
                    ? 'अपनी आवश्यकता दर्ज करें और सब्सिडी, कुल लागत तथा अनुमानित बैंक किस्त का तुरंत विवरण प्राप्त करें।'
                    : 'Enter your requirements to instantly calculate central subsidies, net costs, and estimated loan EMIs.'}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 items-start">
                <CalculatorForm lang={lang} setLang={setLang} onCalculate={handleCalculation} />
                <ResultsSummary result={calculationResult} lang={lang} />
              </div>
            </div>
          )}

          {/* ==================== 3. ABOUT US PAGE ==================== */}
          {activeTab === 'about' && <AboutUs lang={lang} />}

          {/* ==================== 4. CONTACT US PAGE ==================== */}
          {activeTab === 'contact' && (
            <div className="bg-white rounded-xl shadow-md border border-slate-200 p-4 sm:p-10 space-y-4 sm:space-y-8">
              <div className="border-b border-slate-200 pb-3 sm:pb-4">
                <h2 className="text-lg sm:text-2xl font-bold text-slate-800 flex items-center gap-2">
                  <Mail className="w-5 h-5 sm:w-7 sm:h-7 text-amber-600 shrink-0" />
                  {lang === 'hi' ? 'संपर्क करें (Contact Us)' : 'Contact Our Experts'}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5 sm:mt-1">
                  {lang === 'hi'
                    ? 'सोलर सब्सिडी, वेंडर सहायता या किसी प्रश्न के लिए हमारी सहायता टीम से जुड़ें।'
                    : 'Reach out to our dedicated support team for any queries regarding solar subsidies or vendors.'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
                {/* Contact Form */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert(lang === 'hi' ? 'संदेश सफलतापूर्वक भेजा गया!' : 'Message sent successfully!');
                  }}
                  className="space-y-3 sm:space-y-4"
                >
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {lang === 'hi' ? 'आपका नाम' : 'Your Name'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex. Rahul Sharma"
                      className="w-full px-3 py-1.5 sm:py-2 border border-slate-300 rounded-md text-xs sm:text-sm focus:ring-2 focus:ring-amber-500 outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {lang === 'hi' ? 'ईमेल आईडी' : 'Email Address'}
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      className="w-full px-3 py-1.5 sm:py-2 border border-slate-300 rounded-md text-xs sm:text-sm focus:ring-2 focus:ring-amber-500 outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {lang === 'hi' ? 'संदेश / पूछताछ' : 'Message / Inquiry'}
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder={
                        lang === 'hi' ? 'अपनी आवश्यकता या सवाल यहाँ लिखें...' : 'Type your query here...'
                      }
                      className="w-full px-3 py-1.5 sm:py-2 border border-slate-300 rounded-md text-xs sm:text-sm focus:ring-2 focus:ring-amber-500 outline-none transition"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-amber-500 hover:bg-amber-400 active:scale-98 text-slate-950 font-bold py-2 sm:py-2.5 rounded-md text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>{lang === 'hi' ? 'संदेश भेजें' : 'Send Message'}</span>
                  </button>
                </form>

                {/* Contact Details & Image */}
                <div className="space-y-4 sm:space-y-6 flex flex-col justify-between">
                  <div className="space-y-3 sm:space-y-4 bg-slate-50 p-3.5 sm:p-6 rounded-xl border border-slate-200 text-xs sm:text-sm">
                    <div className="flex items-center gap-2.5 sm:gap-3 text-slate-700">
                      <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 shrink-0" />
                      <div>
                        <p className="font-semibold">{lang === 'hi' ? 'ईमेल सपोर्ट:' : 'Email Support:'}</p>
                        <p className="text-slate-500 text-xs sm:text-sm">support@solarcounsel.in</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5 sm:gap-3 text-slate-700">
                      <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 shrink-0" />
                      <div>
                        <p className="font-semibold">{lang === 'hi' ? 'हेल्पलाइन समय:' : 'Helpline Hours:'}</p>
                        <p className="text-slate-500 text-xs sm:text-sm">
                          {lang === 'hi'
                            ? 'सोमवार से शनिवार (सुबह 10:00 से शाम 6:00 बजे)'
                            : 'Mon to Sat (10:00 AM to 6:00 PM IST)'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5 sm:gap-3 text-slate-700">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-rose-600 shrink-0" />
                      <div>
                        <p className="font-semibold">{lang === 'hi' ? 'मुख्य कार्यालय:' : 'Head Office:'}</p>
                        <p className="text-slate-500 text-xs sm:text-sm">
                          {lang === 'hi'
                            ? 'सोलर कंसल्टेंसी टावर, गोमती नगर, लखनऊ, उत्तर प्रदेश'
                            : 'Solar Consultancy Tower, Gomti Nagar, Lucknow, UP'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <img
                    src="https://images.unsplash.com/photo-1613665813446-82a78c468a1d?q=80&w=800&auto=format&fit=crop"
                    alt="Solar Energy Contact"
                    className="rounded-xl shadow-md border border-slate-200 h-28 sm:h-44 w-full object-cover"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ==================== 5. PRIVACY POLICY PAGE ==================== */}
          {activeTab === 'privacy' && (
            <div className="bg-white rounded-xl shadow-md border border-slate-200 p-4 sm:p-10 space-y-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <div className="border-b border-slate-200 pb-3 sm:pb-4">
                <h2 className="text-lg sm:text-2xl font-bold text-slate-800 flex items-center gap-2">
                  <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600 shrink-0" />
                  {lang === 'hi' ? 'गोपनीयता नीति (Privacy Policy)' : 'Privacy Policy'}
                </h2>
                <p className="text-xs text-slate-400 mt-0.5 sm:mt-1">
                  {lang === 'hi' ? 'अंतिम अपडेट: अगस्त 2026' : 'Last Updated: August 2026'}
                </p>
              </div>

              <p className="text-justify">
                {lang === 'hi'
                  ? 'सोलर कंसल्टेंसी सर्विसेज आपके व्यक्तिगत डेटा और गोपनीयता की सुरक्षा के प्रति पूरी तरह से समर्पित है। यह गोपनीयता नीति बताती है कि जब आप हमारी वेबसाइट और सोलर कैलकुलेटर का उपयोग करते हैं, तो हम आपकी जानकारी को किस प्रकार एकत्र, उपयोग और सुरक्षित करते हैं।'
                  : 'Solar Consultancy Services is deeply committed to protecting your personal data and privacy. This Privacy Policy explains how we collect, use, and protect your information when you interact with our website and solar estimation tools.'}
              </p>

              {/* Data Collection */}
              <div className="space-y-2">
                <h3 className="text-sm sm:text-base font-bold text-slate-800 flex items-center gap-2">
                  <Database className="w-4 h-4 text-amber-600 shrink-0" />
                  {lang === 'hi' ? '1. हम कौन सा डेटा एकत्र करते हैं?' : '1. Information We Collect'}
                </h3>
                <p className="text-justify">
                  {lang === 'hi'
                    ? 'हमारे प्लेटफ़ॉर्म पर कैलकुलेटर और संपर्क फॉर्म का उपयोग करते समय, हम आपके द्वारा स्वेच्छा से प्रदान की गई जानकारी एकत्र कर सकते हैं, जैसे कि आपका नाम, ईमेल पता, मोबाइल नंबर, और आपके मासिक बिजली बिल या सोलर लोड से संबंधित विवरण।'
                    : 'When you use our calculators or contact forms, we may collect information you voluntarily provide, such as your name, email address, phone number, and details regarding your monthly electricity consumption or requested solar capacity.'}
                </p>
              </div>

              {/* Data Usage */}
              <div className="space-y-2">
                <h3 className="text-sm sm:text-base font-bold text-slate-800 flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-amber-600 shrink-0" />
                  {lang === 'hi' ? '2. डेटा का उपयोग कैसे किया जाता है?' : '2. How We Use Your Information'}
                </h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    {lang === 'hi'
                      ? 'सटीक सोलर सब्सिडी और EMI का अनुमान प्रदान करने के लिए।'
                      : 'To calculate accurate solar subsidy estimations and monthly EMI projections.'}
                  </li>
                  <li>
                    {lang === 'hi'
                      ? 'आपकी पूछताछ का उत्तर देने और आपके अनुरोधों के अनुसार मार्गदर्शन प्रदान करने के लिए।'
                      : 'To respond to your inquiries and offer guidance based on your requests.'}
                  </li>
                  <li>
                    {lang === 'hi'
                      ? 'हमारी वेबसाइट की कार्यक्षमता और उपयोगकर्ता अनुभव को बेहतर बनाने के लिए।'
                      : 'To continuously improve our platform functions and overall user experience.'}
                  </li>
                </ul>
              </div>

              {/* Data Security */}
              <div className="space-y-2">
                <h3 className="text-sm sm:text-base font-bold text-slate-800 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-amber-600 shrink-0" />
                  {lang === 'hi' ? '3. डेटा सुरक्षा और गोपनीयता' : '3. Data Protection & Security'}
                </h3>
                <p className="text-justify">
                  {lang === 'hi'
                    ? 'हम आपकी जानकारी को सुरक्षित रखने के लिए कड़े तकनीकी सुरक्षा मानकों का पालन करते हैं। हम आपका व्यक्तिगत डेटा किसी तीसरे पक्ष को बेचते या व्यावसायिक लाभ के लिए साझा नहीं करते हैं।'
                    : 'We implement rigorous security measures to maintain the safety of your personal information. We do not sell, trade, or otherwise transfer your personally identifiable information to external third parties.'}
                </p>
              </div>

              {/* Cookies & Transparency */}
              <div className="space-y-2">
                <h3 className="text-sm sm:text-base font-bold text-slate-800 flex items-center gap-2">
                  <Eye className="w-4 h-4 text-amber-600 shrink-0" />
                  {lang === 'hi' ? '4. कुकीज़ और थर्ड-पार्टी लिंक्स' : '4. Cookies & External Links'}
                </h3>
                <p className="text-justify">
                  {lang === 'hi'
                    ? 'यह प्लेटफ़ॉर्म उपयोगकर्ता अनुभव को बेहतर बनाने के लिए बुनियादी स्थानीय कुकीज़ का उपयोग कर सकता है। हमारी वेबसाइट में आधिकारिक सरकारी पोर्टलों (जैसे pmsuryaghar.gov.in) के लिंक हो सकते हैं; उनकी अपनी स्वतंत्र गोपनीयता नीतियां हैं।'
                    : 'This platform may use standard cookies to enhance user experience. Our site contains links to official government portals (such as pmsuryaghar.gov.in) which operate under independent privacy policies.'}
                </p>
              </div>

              <div className="my-3 sm:my-4">
                <img
                  src="/privacy-policy.jpg"
                  alt="Privacy & Data Protection"
                  className="rounded-lg shadow-sm border border-slate-200 h-28 sm:h-48 w-full object-cover"
                />
              </div>
            </div>
          )}

          {/* ==================== 6. TERMS & CONDITIONS PAGE ==================== */}
{activeTab === 'terms' && (
  <div className="bg-white rounded-xl shadow-md border border-slate-200 p-4 sm:p-10 space-y-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
    <div className="border-b border-slate-200 pb-3 sm:pb-4">
      <h2 className="text-lg sm:text-2xl font-bold text-slate-800 flex items-center gap-2">
        <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 shrink-0" />
        {lang === 'hi' ? 'नियम एवं शर्तें (Terms & Conditions)' : 'Terms & Conditions'}
      </h2>
      <p className="text-xs text-slate-400 mt-0.5 sm:mt-1">
        {lang === 'hi' ? 'अंतिम अपडेट: अगस्त 2026' : 'Last Updated: August 2026'}
      </p>
    </div>

    <p className="text-justify">
      {lang === 'hi'
        ? 'इस वेबसाइट या कैलकुलेटर प्लेटफ़ॉर्म का उपयोग करके, आप निम्नलिखित नियमों और शर्तों का पूर्ण पालन करने के लिए अपनी सहमति व्यक्त करते हैं। यदि आप इन शर्तों से सहमत नहीं हैं, तो कृपया प्लेटफ़ॉर्म का उपयोग न करें।'
        : 'By accessing or using this website and solar calculator platform, you agree to comply with and be bound by the following Terms and Conditions. If you do not agree with these terms, please discontinue use of this site.'}
    </p>

    {/* 1. Services Provided */}
    <div className="space-y-2">
      <h3 className="text-sm sm:text-base font-bold text-slate-800 flex items-center gap-2">
        <FileText className="w-4 h-4 text-amber-600 shrink-0" />
        {lang === 'hi' ? '1. सेवाओं की प्रकृति और अनुमान' : '1. Nature of Services & Estimations'}
      </h3>
      <p className="text-justify">
        {lang === 'hi'
          ? 'यह प्लेटफ़ॉर्म केवल एक सूचनात्मक और डिजिटल सहायता टूल है। यहाँ दिखाए गए सोलर प्लांट की लागत, सब्सिडी राशि और बैंक EMI के आंकड़े अनुमानित हैं। वास्तविक लागत और सब्सिडी DISCOM नीतियों, वेंडर की दरों और सरकारी दिशानिर्देशों के अनुसार बदल सकती है।'
          : 'This platform is solely an informational and digital estimation tool. The solar costs, subsidy amounts, and loan EMIs generated are estimates. Actual figures may vary based on DISCOM policies, vendor pricing, and official regulations.'}
      </p>
    </div>

    {/* 2. Non-Affiliation Disclaimer */}
    <div className="space-y-2">
      <h3 className="text-sm sm:text-base font-bold text-slate-800 flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
        {lang === 'hi' ? '2. गैर-सरकारी संबद्धता (Non-Governmental Status)' : '2. Non-Governmental Status'}
      </h3>
      <p className="text-justify">
        {lang === 'hi'
          ? 'यह एक स्वतंत्र कंसल्टेंसी और जागरूकता प्लेटफ़ॉर्म है। हमारा किसी भी सरकारी संस्था या PM सूर्य घर योजना के आधिकारिक पोर्टल से प्रत्यक्ष संबंध नहीं है। आधिकारिक सब्सिडी आवेदनों के लिए केवल pmsuryaghar.gov.in का उपयोग करें।'
          : 'This is an independent consultancy and educational platform. It is not directly affiliated with any government department or the official PM Surya Ghar scheme. For official registration, strictly visit pmsuryaghar.gov.in.'}
      </p>
    </div>

    {/* 3. User Responsibility */}
    <div className="space-y-2">
      <h3 className="text-sm sm:text-base font-bold text-slate-800 flex items-center gap-2">
        <UserCheck className="w-4 h-4 text-amber-600 shrink-0" />
        {lang === 'hi' ? '3. उपयोगकर्ता की जिम्मेदारी' : '3. User Responsibility'}
      </h3>
      <p className="text-justify">
        {lang === 'hi'
          ? 'उपयोगकर्ता यह स्वीकार करता है कि वह प्लेटफ़ॉर्म पर सटीक जानकारी प्रदान करेगा। किसी भी वेंडर का चयन करने या अनुबंध करने से पहले यूज़र को स्वयं वेंडर की मान्यता और साख की जांच करनी होगी।'
          : 'Users acknowledge that they are responsible for verifying vendor credentials and government empaneled status independently before entering into any formal contracts or financial transactions.'}
      </p>
    </div>

    {/* Local Public Image Reference */}
    <div className="my-3 sm:my-4">
      <img
        src="/terms-banner.jpg"
        alt="Terms and Conditions Solar"
        className="rounded-lg shadow-sm border border-slate-200 h-28 sm:h-48 w-full object-cover"
      />
    </div>
  </div>
)}
        </main>
      </div>

      {/* Global Footer */}
      <Footer lang={lang} setActiveTab={setActiveTab} />
    </div>
  );
}