// import React, { useState } from "react";
// import {
//   FaCheck,
//   FaTimes,
//   FaInfoCircle,
//   FaUserAlt,
//   FaWeight,
//   FaHeartbeat,
//   FaCalendarAlt,
//   FaLanguage,
// } from "react-icons/fa";

// const Who = () => {
//   const [language, setLanguage] = useState("en"); // 'en' or 'am'

//   const content = {
//     en: {
//       title: "Who Can Donate Blood?",
//       subtitle:
//         "Blood donation is a simple, safe process that can save lives. Learn about the eligibility requirements in Debre Berhan.",
//       basicTitle: "Basic Requirements",
//       healthTitle: "Health Considerations",
//       frequencyTitle: "Donation Frequency",
//       faqTitle: "Frequently Asked Questions",
//       ctaTitle: "Ready to Save Lives?",
//       ctaText:
//         "If you meet the eligibility requirements, consider becoming a blood donor today at Debre Berhan Blood Center. Your donation can save up to 3 lives!",
//       requirements: [
//         {
//           text: "Age: 18-65 years (16-17 with parental consent)",
//           icon: <FaUserAlt />,
//         },
//         { text: "Weight: At least 50 kg (110 lbs)", icon: <FaWeight /> },
//         {
//           text: "Health: Generally feeling well and healthy",
//           icon: <FaHeartbeat />,
//         },
//         {
//           text: "Identification: Valid government-issued ID required",
//           icon: <FaInfoCircle />,
//         },
//       ],
//       health: [
//         {
//           text: "Hemoglobin: At least 12.5 g/dL for women, 13.0 g/dL for men",
//           valid: true,
//         },
//         { text: "No cold, flu, or infection symptoms", valid: false },
//         {
//           text: "Not eligible during pregnancy and for 6 weeks after",
//           valid: false,
//         },
//         { text: "Some medications may require temporary deferral", info: true },
//       ],
//       faqs: [
//         {
//           question: "Where can I donate in Debre Berhan?",
//           answer:
//             "The Debre Berhan Blood Center is located at the Debre Berhan Referral Hospital compound, open Monday to Saturday from 8:30 AM to 3:30 PM.",
//         },
//         {
//           question: "What blood types are most needed?",
//           answer:
//             "All blood types are needed, but type O is especially critical as it's the universal donor type.",
//         },
//         {
//           question: "Are there any cultural or religious restrictions?",
//           answer:
//             "Blood donation is permitted by all major religions in Ethiopia. The Ethiopian Orthodox Church, Islam, and Protestant denominations all support blood donation.",
//         },
//       ],
//       buttons: {
//         findCenter: "Find Donation Centers",
//         learnMore: "Learn More",
//         switchLanguage: "ቋንቋ ቀይር",
//       },
//     },
//     am: {
//       title: "ደም መለገስ የሚችሉ ማን ናቸው?",
//       subtitle:
//         "ደም መለገስ ሕይወት ማዳን ቀላል እና ደህንነቱ የተጠበቀ ሂደት ነው። በደብረ ብርሃን የሚተገበሩትን መስፈርቶች ይወቁ።",
//       basicTitle: "መሰረታዊ መስፈርቶች",
//       healthTitle: "ጤናዊ ጉዳዮች",
//       frequencyTitle: "የልገሳ ድግግሞሽ",
//       faqTitle: "በተደጋጋሚ የሚነሱ ጥያቄዎች",
//       ctaTitle: "ሕይወት ለማዳን ዝግጁ ኖት?",
//       ctaText:
//         "መስፈርቶቹን ካሟሉ ዛሬም በደብረ ብርሃን የደም ባንክ ደም ይለግሱ። የለገሱት ደም የ3 ሰው ሕይወት ሊያድን ይችላል!",
//       requirements: [
//         {
//           text: "እድሜ፡ 18-65 ዓመት (16-17 ዓመት የወላጆች ፈቃድ ካለ)",
//           icon: <FaUserAlt />,
//         },
//         { text: "ክብደት፡ ቢያንስ 50 ኪ.ግ (110 ፓውንድ)", icon: <FaWeight /> },
//         { text: "ጤና፡ በአጠቃላይ ጤናማ ስሜት ውስጥ መሆን", icon: <FaHeartbeat /> },
//         { text: "መለያ፡ ትክክለኛ የመንግስት መለያ መያዝ", icon: <FaInfoCircle /> },
//       ],
//       health: [
//         { text: "ሄሞግሎቢን፡ ሴቶች 12.5 g/dL፣ ወንዶች 13.0 g/dL ቢያንስ", valid: true },
//         { text: "የሰውነት ሙቀት፣ ሽፍታ ወይም ኢንፌክሽን ምልክቶች አለመኖር", valid: false },
//         { text: "በእርግዝና እና ከወሊድ በኋላ ለ6 ሳምንት ደም መለገስ አይቻልም", valid: false },
//         { text: "አንዳንድ መድሃኒቶች ጊዜያዊ እገዳ ሊያስከትሉ ይችላሉ", info: true },
//       ],
//       faqs: [
//         {
//           question: "በደብረ ብርሃን የት ላመልክት እችላለሁ?",
//           answer:
//             "የደብረ ብርሃን ደም ባንክ በደብረ ብርሃን ሪፈራል ሆስፒታል ውስጥ ይገኛል፣ ከሰኞ እስከ ቅዳሜ ከጠዋት 8፡30 እስከ ማታ 3፡30 ይሠራል።",
//         },
//         {
//           question: "ምን ዓይነት የደም ዓይነቶች በጣም ያስፈልጋሉ?",
//           answer:
//             "ሁሉም የደም ዓይነቶች አስፈላጊ ናቸው፣ ነገር ግን የO ዓይነት ደም በጣም አስፈላጊ ነው ምክንያቱም ለሁሉም የሚስማማ �ይነት ነው።",
//         },
//         {
//           question: "የባህል ወይም የሃይማኖት ገደቦች አሉ?",
//           answer:
//             "ደም መለገስ በኢትዮጵያ ውስጥ ባሉ ሁሉም ዋና ዋና ሃይማኖቶች ይፈቀዳል። የኢትዮጵያ ኦርቶዶክስ ቤተክርስቲያን፣ እስልምና እና ፕሮቴስታንት ሃይማኖቶች ሁሉ ደም ማሳደድን ይደግፋሉ።",
//         },
//       ],
//       buttons: {
//         findCenter: "የደም መለገስ ማዕከሎችን ያግኙ",
//         learnMore: "ተጨማሪ ይወቁ",
//         switchLanguage: "Switch to English",
//       },
//     },
//   };

//   const current = content[language];

//   return (
//     <div className="min-h-screen p-4 sm:p-8 bg-base-100">
//       <div className="max-w-6xl mx-auto">
//         {/* Language Switch Button */}
//         <div className="flex justify-end mb-4">
//           <button
//             onClick={() => setLanguage(language === "en" ? "am" : "en")}
//             className="btn btn-ghost gap-2"
//           >
//             <FaLanguage /> {current.buttons.switchLanguage}
//           </button>
//         </div>

//         {/* Hero Section */}
//         <div className="text-center mb-12">
//           <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-red-700">
//             {current.title}
//           </h1>
//           <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
//             {current.subtitle}
//           </p>
//         </div>

//         {/* Eligibility Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
//           {/* Basic Requirements */}
//           <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
//             <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-red-600">
//               <FaUserAlt /> {current.basicTitle}
//             </h2>
//             <ul className="space-y-3">
//               {current.requirements.map((item, index) => (
//                 <li key={index} className="flex items-start gap-2">
//                   <span className="text-green-500 mt-1">{item.icon}</span>
//                   <span>{item.text}</span>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Health Conditions */}
//           <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
//             <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-red-600">
//               <FaHeartbeat /> {current.healthTitle}
//             </h2>
//             <ul className="space-y-3">
//               {current.health.map((item, index) => (
//                 <li key={index} className="flex items-start gap-2">
//                   {item.valid ? (
//                     <FaCheck className="text-green-500 mt-1" />
//                   ) : item.info ? (
//                     <FaInfoCircle className="text-blue-500 mt-1" />
//                   ) : (
//                     <FaTimes className="text-red-500 mt-1" />
//                   )}
//                   <span>{item.text}</span>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>

//         {/* Local Information */}
//         <div className="bg-blue-50 p-6 rounded-lg mb-12 border border-blue-200">
//           <h2 className="text-2xl font-bold mb-4 text-blue-800">
//             {language === "en"
//               ? "Debre Berhan Blood Donation Information"
//               : "የደብረ ብርሃን የደም ልገሳ መረጃ"}
//           </h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <div className="bg-white p-4 rounded shadow-sm">
//               <h3 className="font-bold mb-2">
//                 {language === "en" ? "Blood Center Location" : "የደም ባንክ አድራሻ"}
//               </h3>
//               <p>
//                 {language === "en"
//                   ? "Debre Berhan Referral Hospital Compound"
//                   : "ደብረ ብርሃን ሪፈራል ሆስፒታል ውስጥ"}
//               </p>
//             </div>
//             <div className="bg-white p-4 rounded shadow-sm">
//               <h3 className="font-bold mb-2">
//                 {language === "en" ? "Operating Hours" : "ስራ ሰዓት"}
//               </h3>
//               <p>
//                 {language === "en"
//                   ? "Monday-Saturday: 8:30 AM - 3:30 PM"
//                   : "ሰኞ-ቅዳሜ፡ ከጠዋት 8፡30 - ማታ 3፡30"}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* FAQ Section */}
//         <div className="mb-12">
//           <h2 className="text-2xl font-bold mb-6 text-center">
//             {current.faqTitle}
//           </h2>
//           <div className="space-y-4">
//             {current.faqs.map((faq, index) => (
//               <div
//                 key={index}
//                 className="collapse collapse-plus bg-white border border-gray-200 rounded-lg"
//               >
//                 <input
//                   type="radio"
//                   name="faq-accordion"
//                   defaultChecked={index === 0}
//                 />
//                 <div className="collapse-title text-lg font-semibold">
//                   {faq.question}
//                 </div>
//                 <div className="collapse-content">
//                   <p>{faq.answer}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Call to Action */}
//         <div className="bg-red-50 p-6 rounded-lg text-center border border-red-200">
//           <h2 className="text-2xl font-bold mb-4 text-red-700">
//             {current.ctaTitle}
//           </h2>
//           <p className="mb-6 max-w-2xl mx-auto">{current.ctaText}</p>
//           <div className="flex flex-col sm:flex-row justify-center gap-4">
//             <button className="btn btn-primary">
//               {current.buttons.findCenter}
//             </button>
//             <button className="btn btn-outline">
//               {current.buttons.learnMore}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Who;
// Features/public/Who.jsx

import React, { useState } from "react";
// Assuming you are using DaisyUI/Tailwind CSS for styling

// --- Multi-Language Content Setup ---
// This is added to make the component error-free and runnable.
const content = {
  en: {
    faqTitle: "Frequently Asked Questions",
    ctaTitle: "Ready to Make a Difference?",
    ctaText:
      "Your single donation can save up to three lives. Find a center near you or learn more about the donation process today.",
    buttons: {
      findCenter: "Find a Center",
      learnMore: "Learn More",
    },
    faqs: [
      {
        question: "Who is eligible to donate blood?",
        answer:
          "Generally, donors must be 18 years or older, weigh at least 50 kg, and be in good general health. Specific travel and health restrictions may apply.",
      },
      {
        question: "How long does the donation process take?",
        answer:
          "The entire process, including registration, medical screening, and the donation itself, typically takes about an hour. The actual blood draw usually takes less than 10 minutes.",
      },
      {
        question: "How often can I donate blood?",
        answer:
          "You can safely donate whole blood every 56 days. The frequency is slightly different for other types of donations like platelets.",
      },
    ],
  },
  am: {
    // Amharic
    faqTitle: "ተደጋጋሚ ጥያቄዎች",
    ctaTitle: "ለመለገስ ተዘጋጅተዋል?",
    ctaText:
      "እርስዎ የሚለግሱት አንዲት ደም እስከ ሶስት ሰዎችን ህይወት ማዳን ይችላል። በአቅራቢያዎ ያለውን ማዕከል ዛሬ ያግኙ ወይም ስለ ልገሳ ሂደት የበለጠ ይረዱ።",
    buttons: {
      findCenter: "ማዕከል ይፈልጉ",
      learnMore: "ይወቁ",
    },
    faqs: [
      {
        question: "ደም ለመለገስ ብቁ የሆነ ማነው?",
        answer:
          "በአጠቃላይ ለጋሾች እድሜያቸው 18 ዓመትና ከዚያ በላይ፣ ክብደታቸው ቢያንስ 50 ኪ.ግ. እና በጥሩ አጠቃላይ ጤንነት ላይ መሆን አለባቸው። ልዩ የጉዞ እና የጤና ገደቦች ሊኖሩ ይችላሉ።",
      },
      {
        question: "የልገሳው ሂደት ምን ያህል ጊዜ ይወስዳል?",
        answer:
          "ሙሉ ሂደቱ፣ ምዝገባ፣ የጤና ምርመራ እና ልገሳው ራሱ፣ በአጠቃላይ ወደ አንድ ሰዓት ያህል ይወስዳል። ትክክለኛው የደም መሳብ አብዛኛውን ጊዜ ከ10 ደቂቃ ያነሰ ነው።",
      },
      {
        question: "ምን ያህል ጊዜ ደም ልለግስ እችላለሁ?",
        answer:
          "ሙሉ ደምን በየ56 ቀኑ በደህና መለገስ ይችላሉ። ለሌሎች የልገሳ ዓይነቶች እንደ ፕሌትሌት (Platelets) ድግግሞሹ ትንሽ የተለየ ነው።",
      },
    ],
  },
};

const Who = () => {
  // State for language selection (defaulting to English for simplicity)
  const [language, setLanguage] = useState("en");

  // Dynamically select content based on current language state
  const current = content[language] || content["en"];

  // Toggle function for the language
  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "am" : "en"));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Language Toggler Button (UI Enhancement) */}
        <div className="flex justify-end mb-8">
          <button
            onClick={toggleLanguage}
            className="btn btn-outline btn-sm sm:btn-md border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition duration-300"
          >
            {language === "en" ? "Change to Amharic" : "እንግሊዝኛ ቀይር"}
          </button>
        </div>

        {/* Local Information (Enhanced Card UI) */}
        <div className="bg-white p-6 sm:p-10 rounded-xl shadow-2xl border-t-8 border-red-500 mb-12">
          <h2 className="text-3xl font-extrabold mb-6 text-gray-900 flex items-center">
            {/* Using a Lucide Icon for visual appeal and context */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-8 h-8 text-red-500 mr-3"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            {language === "en"
              ? "Debre Berhan Blood Donation Center"
              : "የደብረ ብርሃን የደም ልገሳ ማዕከል መረጃ"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-red-50 p-5 rounded-lg border-l-4 border-red-400">
              <h3 className="font-bold text-lg mb-2 text-red-800">
                {language === "en" ? "Blood Center Location" : "የደም ማዕከል አድራሻ"}
              </h3>
              <p className="text-gray-700">
                {language === "en"
                  ? "Near the Debre Berhan Blanket Factory, 300 meters right of the fence."
                  : "ደብረ ብርሃን ብርድ ልብስ ፋብሪካ በስተቀኝ በኩል 300 ሜትር ገባ ብሎ"}
              </p>
            </div>
            <div className="bg-red-50 p-5 rounded-lg border-l-4 border-red-400">
              <h3 className="font-bold text-lg mb-2 text-red-800">
                {language === "en" ? "Operating Hours" : "ስራ ሰዓት"}
              </h3>
              <p className="text-gray-700 font-semibold">
                {language === "en"
                  ? "24 hours a day, Monday through Sunday"
                  : "ሁልጊዜ ከሰኞ እስከ እሁድ 24 ሰአት ያገኙናል"}
              </p>
            </div>
            {/* Added a third card for Contact Information (UI enhancement for completeness) */}
            <div className="bg-red-50 p-5 rounded-lg border-l-4 border-red-400">
              <h3 className="font-bold text-lg mb-2 text-red-800">
                {language === "en" ? "Contact" : "የግንኙነት መረጃ"}
              </h3>
              <p className="text-gray-700">
                {language === "en"
                  ? "Phone: +251 9XX XXX XXXX"
                  : "ስልክ: +251 9XX XXX XXXX"}
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section (Cleaner, more accessible UI) */}
        <div className="mb-12 bg-white p-6 sm:p-10 rounded-xl shadow-md">
          <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-900">
            {current.faqTitle}
          </h2>
          <div className="space-y-4">
            {current.faqs.map((faq, index) => (
              <div
                key={index}
                className="collapse collapse-plus bg-gray-50 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <input
                  type="radio"
                  name="faq-accordion"
                  // Ensures only one is open at a time, but lets the user manually close all.
                  defaultChecked={index === 0}
                />
                <div className="collapse-title text-base sm:text-lg font-semibold text-gray-800">
                  {faq.question}
                </div>
                <div className="collapse-content bg-white text-gray-600 border-t border-gray-200">
                  <p className="p-4">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action (Vibrant, Prominent UI) */}
        <div className="bg-red-600 text-white p-8 sm:p-12 rounded-xl shadow-2xl text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
            {current.ctaTitle}
          </h2>
          <p className="mb-8 max-w-3xl mx-auto text-lg opacity-90">
            {current.ctaText}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="btn btn-lg btn-warning shadow-xl hover:bg-yellow-400 border-none text-red-800 font-bold">
              {current.buttons.findCenter}
            </button>
            <button className="btn btn-lg btn-outline text-white border-white hover:bg-red-700 hover:border-red-700">
              {current.buttons.learnMore}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Who;
