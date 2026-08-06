import React from 'react';
import { 
  Award, 
  Target, 
  Eye, 
  Users, 
  ShieldCheck, 
  Globe2, 
  Zap, 
  Calculator, 
  HelpCircle,
  AlertCircle
} from 'lucide-react';

export default function AboutUs({ lang = 'hi' }) {
  const isHindi = lang === 'hi';

  return (
    <div className="bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header Section */}
        <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-slate-200/80">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-amber-50 text-amber-600 rounded-lg border border-amber-200/60">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                {isHindi ? 'हमारे बारे में (About Us)' : 'About Us'}
              </h1>
              <p className="text-sm sm:text-base text-amber-600 font-medium">
                {isHindi 
                  ? 'भारत में स्वच्छ ऊर्जा जागरूकता एवं परामर्श हेतु आपका विश्वसनीय डिजिटल साथी' 
                  : 'Your Trusted Digital Partner for Clean Energy Awareness & Guidance in India'}
              </p>
            </div>
          </div>

          <hr className="my-6 border-slate-100" />

          {/* Main Hero Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base">
              <p>
                {isHindi ? (
                  <>
                    <strong className="text-slate-900 font-semibold">सोलर कंसल्टेंसी सर्विसेज</strong> एक अग्रणी स्वतंत्र सूचना एवं सहायता डिजिटल मंच है, जिसका मुख्य उद्देश्य भारत भर के नागरिकों को सौर ऊर्जा (Solar Energy) के लाभों, पीएम सूर्य घर मुफ़्त बिजली योजना और उपलब्ध सरकारी सब्सिडी के प्रति जागरूक करना है।
                  </>
                ) : (
                  <>
                    <strong className="text-slate-900 font-semibold">Solar Consultancy Services</strong> is a leading independent information and guidance digital platform dedicated to creating awareness about solar energy benefits, the PM Surya Ghar Free Electricity Scheme, and government subsidies across India.
                  </>
                )}
              </p>
              <p>
                {isHindi ? (
                  'हमारा लक्ष्य हर घर तक सही, पारदर्शी और सटीक जानकारी पहुँचाना है ताकि आम उपभोक्ता अपने घर या व्यवसाय के लिए सोलर पैनल लगवाते समय सही फैसला ले सकें और अधिकतम सरकारी सब्सिडी व बैंक लोन सुविधाओं का लाभ उठा सकें।'
                ) : (
                  'Our goal is to deliver accurate, transparent, and precise information to every household so consumers can make informed decisions when adopting solar rooftop solutions and leverage maximum government subsidies and green loan options.'
                )}
              </p>
            </div>

            {/* Hero Image / Banner */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-md border border-slate-200 group">
  <img 
  src="/solar-family.jpg"
  alt="Solar Rooftop Family"
  className="w-full h-full min-h-[260px] object-cover"
/>

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-4">
                  <span className="text-white text-xs font-medium flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
                    {isHindi ? 'स्वच्छ ऊर्जा, समृद्ध भारत' : 'Clean Energy, Prosperous India'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-slate-100">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 text-center">
              <div className="flex items-center justify-center gap-2 text-amber-600 mb-1">
                <Users className="w-5 h-5" />
                <span className="text-2xl font-bold text-slate-900">15,000+</span>
              </div>
              <p className="text-xs text-slate-600 font-medium">
                {isHindi ? 'संतुष्ट उपभोक्ता एवं परामर्श' : 'Satisfied Users Consulted'}
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 text-center">
              <div className="flex items-center justify-center gap-2 text-emerald-600 mb-1">
                <ShieldCheck className="w-5 h-5" />
                <span className="text-2xl font-bold text-slate-900">100%</span>
              </div>
              <p className="text-xs text-slate-600 font-medium">
                {isHindi ? 'पारदर्शिता एवं सटीक गणना' : 'Transparency & Accurate Calculation'}
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 text-center">
              <div className="flex items-center justify-center gap-2 text-blue-600 mb-1">
                <Globe2 className="w-5 h-5" />
                <span className="text-2xl font-bold text-slate-900">28+</span>
              </div>
              <p className="text-xs text-slate-600 font-medium">
                {isHindi ? 'राज्य एवं केंद्र शासित प्रदेश' : 'States & UTs Covered'}
              </p>
            </div>
          </div>
        </div>

        {/* Mission & Vision Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-xl flex items-center justify-center mb-4">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                {isHindi ? 'हमारा मिशन (Our Mission)' : 'Our Mission'}
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {isHindi 
                  ? 'भारत के हर घर को सौर ऊर्जा से जोड़ना और उपभोक्ताओं को जटिल कागजी प्रक्रियाओं व भ्रामक जानकारियों से बचाकर सीधे सही सब्सिडी और लोन अनुमान प्रदान करना।' 
                  : 'To empower every Indian household with solar energy by demystifying complex procedures and providing instant, accurate subsidy and loan estimates.'}
              </p>
            </div>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center mb-4">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                {isHindi ? 'हमारा विजन (Our Vision)' : 'Our Vision'}
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {isHindi 
                  ? 'देश में हरित और स्वच्छ ऊर्जा के उपयोग को बढ़ावा देकर कार्बन उत्सर्जन को कम करना और नागरिकों के मासिक बिजली बिल को शून्य के स्तर तक लाने में मदद करना।' 
                  : 'To accelerate green energy adoption across India, reducing carbon footprint while driving monthly electricity expenses close to zero for every family.'}
              </p>
            </div>
          </div>
        </div>

        {/* What We Offer / Key Features */}
        <div className="bg-white p-6 sm:p-10 rounded-2xl border border-slate-200/80 shadow-sm">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6 text-center">
            {isHindi ? 'हम आपको क्या सुविधाएं प्रदान करते हैं?' : 'What We Provide'}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/60">
              <Calculator className="w-8 h-8 text-amber-600 mb-3" />
              <h4 className="font-bold text-slate-900 mb-1">
                {isHindi ? 'त्वरित सब्सिडी कैलकुलेटर' : 'Instant Subsidy Calculator'}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600">
                {isHindi 
                  ? 'पीएम सूर्य घर योजना के तहत 1kW, 2kW और 3kW सिस्टम पर मिलने वाली सब्सिडी की सटीक गणना।' 
                  : 'Accurate subsidy calculations for 1kW, 2kW, and 3kW systems under PM Surya Ghar Yojana.'}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/60">
              <Zap className="w-8 h-8 text-emerald-600 mb-3" />
              <h4 className="font-bold text-slate-900 mb-1">
                {isHindi ? 'सोलर लोन एवं EMI अनुमान' : 'Solar Loan & EMI Estimation'}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600">
                {isHindi 
                  ? 'बैंक लोन ब्याज दर (7%) और 5 वर्षों की आसान किस्तों (EMI) का पारदर्शी विवरण।' 
                  : 'Transparent calculation of bank loan interest rates (7%) and 5-year easy monthly installments (EMI).'}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/60">
              <HelpCircle className="w-8 h-8 text-blue-600 mb-3" />
              <h4 className="font-bold text-slate-900 mb-1">
                {isHindi ? 'निःशुल्क परामर्श एवं मार्गदर्शन' : 'Free Expert Guidance'}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600">
                {isHindi 
                  ? 'छत की उपलब्धता, प्लांट क्षमता और सही विक्रेता (Vendor) चयन के लिए पूर्ण मार्गदर्शन।' 
                  : 'Complete support regarding roof availability, plant capacity selection, and choosing certified vendors.'}
              </p>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-5 sm:p-6 text-amber-950 flex items-start gap-4">
          <AlertCircle className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm space-y-1">
            <h5 className="font-bold text-amber-900">
              {isHindi ? 'अस्वीकरण (Disclaimer)' : 'Disclaimer'}
            </h5>
            <p className="leading-relaxed text-amber-900/90">
              {isHindi ? (
                'यह एक स्वतंत्र परामर्श व सहायता वेब पोर्टल है। हम आधिकारिक सरकारी निकाय नहीं हैं। भारत सरकार की पीएम सूर्य घर मुफ़्त बिजली योजना का आधिकारिक पोर्टल pmsuryaghar.gov.in है। हमारी वेबसाइट का उद्देश्य उपभोक्ताओं को सहायता और सही अनुमान प्रदान करना है।'
              ) : (
                'This is an independent guidance and advisory portal. We are not a government agency. The official government portal for PM Surya Ghar Scheme is pmsuryaghar.gov.in. Our platform provides estimated calculations to facilitate clean energy awareness.'
              )}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}