import React, { useState } from "react";
import {
  FaCheck,
  FaTimes,
  FaInfoCircle,
  FaUserAlt,
  FaWeight,
  FaHeartbeat,
  FaCalendarAlt,
  FaLanguage,
} from "react-icons/fa";

const Who = () => {
  const [language, setLanguage] = useState("en"); // 'en' or 'am'

  const content = {
    en: {
      title: "Who Can Donate Blood?",
      subtitle:
        "Blood donation is a simple, safe process that can save lives. Learn about the eligibility requirements in Debre Berhan.",
      basicTitle: "Basic Requirements",
      healthTitle: "Health Considerations",
      frequencyTitle: "Donation Frequency",
      faqTitle: "Frequently Asked Questions",
      ctaTitle: "Ready to Save Lives?",
      ctaText:
        "If you meet the eligibility requirements, consider becoming a blood donor today at Debre Berhan Blood Center. Your donation can save up to 3 lives!",
      requirements: [
        {
          text: "Age: 18-65 years (16-17 with parental consent)",
          icon: <FaUserAlt />,
        },
        { text: "Weight: At least 50 kg (110 lbs)", icon: <FaWeight /> },
        {
          text: "Health: Generally feeling well and healthy",
          icon: <FaHeartbeat />,
        },
        {
          text: "Identification: Valid government-issued ID required",
          icon: <FaInfoCircle />,
        },
      ],
      health: [
        {
          text: "Hemoglobin: At least 12.5 g/dL for women, 13.0 g/dL for men",
          valid: true,
        },
        { text: "No cold, flu, or infection symptoms", valid: false },
        {
          text: "Not eligible during pregnancy and for 6 weeks after",
          valid: false,
        },
        { text: "Some medications may require temporary deferral", info: true },
      ],
      faqs: [
        {
          question: "Where can I donate in Debre Berhan?",
          answer:
            "The Debre Berhan Blood Center is located at the Debre Berhan Referral Hospital compound, open Monday to Saturday from 8:30 AM to 3:30 PM.",
        },
        {
          question: "What blood types are most needed?",
          answer:
            "All blood types are needed, but type O is especially critical as it's the universal donor type.",
        },
        {
          question: "Are there any cultural or religious restrictions?",
          answer:
            "Blood donation is permitted by all major religions in Ethiopia. The Ethiopian Orthodox Church, Islam, and Protestant denominations all support blood donation.",
        },
      ],
      buttons: {
        findCenter: "Find Donation Centers",
        learnMore: "Learn More",
        switchLanguage: "ቋንቋ ቀይር",
      },
    },
    am: {
      title: "ደም መለገስ የሚችሉ ማን ናቸው?",
      subtitle:
        "ደም መለገስ ሕይወት ማዳን ቀላል እና ደህንነቱ የተጠበቀ ሂደት ነው። በደብረ ብርሃን የሚተገበሩትን መስፈርቶች ይወቁ።",
      basicTitle: "መሰረታዊ መስፈርቶች",
      healthTitle: "ጤናዊ ጉዳዮች",
      frequencyTitle: "የልገሳ ድግግሞሽ",
      faqTitle: "በተደጋጋሚ የሚነሱ ጥያቄዎች",
      ctaTitle: "ሕይወት ለማዳን ዝግጁ ኖት?",
      ctaText:
        "መስፈርቶቹን ካሟሉ ዛሬም በደብረ ብርሃን የደም ባንክ ደም ይለግሱ። የለገሱት ደም የ3 ሰው ሕይወት ሊያድን ይችላል!",
      requirements: [
        {
          text: "እድሜ፡ 18-65 ዓመት (16-17 ዓመት የወላጆች ፈቃድ ካለ)",
          icon: <FaUserAlt />,
        },
        { text: "ክብደት፡ ቢያንስ 50 ኪ.ግ (110 ፓውንድ)", icon: <FaWeight /> },
        { text: "ጤና፡ በአጠቃላይ ጤናማ ስሜት ውስጥ መሆን", icon: <FaHeartbeat /> },
        { text: "መለያ፡ ትክክለኛ የመንግስት መለያ መያዝ", icon: <FaInfoCircle /> },
      ],
      health: [
        { text: "ሄሞግሎቢን፡ ሴቶች 12.5 g/dL፣ ወንዶች 13.0 g/dL ቢያንስ", valid: true },
        { text: "የሰውነት ሙቀት፣ ሽፍታ ወይም ኢንፌክሽን ምልክቶች አለመኖር", valid: false },
        { text: "በእርግዝና እና ከወሊድ በኋላ ለ6 ሳምንት ደም መለገስ አይቻልም", valid: false },
        { text: "አንዳንድ መድሃኒቶች ጊዜያዊ እገዳ ሊያስከትሉ ይችላሉ", info: true },
      ],
      faqs: [
        {
          question: "በደብረ ብርሃን የት ላመልክት እችላለሁ?",
          answer:
            "የደብረ ብርሃን ደም ባንክ በደብረ ብርሃን ሪፈራል ሆስፒታል ውስጥ ይገኛል፣ ከሰኞ እስከ ቅዳሜ ከጠዋት 8፡30 እስከ ማታ 3፡30 ይሠራል።",
        },
        {
          question: "ምን ዓይነት የደም ዓይነቶች በጣም ያስፈልጋሉ?",
          answer:
            "ሁሉም የደም ዓይነቶች አስፈላጊ ናቸው፣ ነገር ግን የO ዓይነት ደም በጣም አስፈላጊ ነው ምክንያቱም ለሁሉም የሚስማማ �ይነት ነው።",
        },
        {
          question: "የባህል ወይም የሃይማኖት ገደቦች አሉ?",
          answer:
            "ደም መለገስ በኢትዮጵያ ውስጥ ባሉ ሁሉም ዋና ዋና ሃይማኖቶች ይፈቀዳል። የኢትዮጵያ ኦርቶዶክስ ቤተክርስቲያን፣ እስልምና እና ፕሮቴስታንት ሃይማኖቶች ሁሉ ደም ማሳደድን ይደግፋሉ።",
        },
      ],
      buttons: {
        findCenter: "የደም መለገስ ማዕከሎችን ያግኙ",
        learnMore: "ተጨማሪ ይወቁ",
        switchLanguage: "Switch to English",
      },
    },
  };

  const current = content[language];

  return (
    <div className="min-h-screen p-4 sm:p-8 bg-base-100">
      <div className="max-w-6xl mx-auto">
        {/* Language Switch Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setLanguage(language === "en" ? "am" : "en")}
            className="btn btn-ghost gap-2"
          >
            <FaLanguage /> {current.buttons.switchLanguage}
          </button>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-red-700">
            {current.title}
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            {current.subtitle}
          </p>
        </div>

        {/* Eligibility Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Basic Requirements */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-red-600">
              <FaUserAlt /> {current.basicTitle}
            </h2>
            <ul className="space-y-3">
              {current.requirements.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">{item.icon}</span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Health Conditions */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-red-600">
              <FaHeartbeat /> {current.healthTitle}
            </h2>
            <ul className="space-y-3">
              {current.health.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  {item.valid ? (
                    <FaCheck className="text-green-500 mt-1" />
                  ) : item.info ? (
                    <FaInfoCircle className="text-blue-500 mt-1" />
                  ) : (
                    <FaTimes className="text-red-500 mt-1" />
                  )}
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Local Information */}
        <div className="bg-blue-50 p-6 rounded-lg mb-12 border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">
            {language === "en"
              ? "Debre Berhan Blood Donation Information"
              : "የደብረ ብርሃን የደም ልገሳ መረጃ"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded shadow-sm">
              <h3 className="font-bold mb-2">
                {language === "en" ? "Blood Center Location" : "የደም ባንክ አድራሻ"}
              </h3>
              <p>
                {language === "en"
                  ? "Debre Berhan Referral Hospital Compound"
                  : "ደብረ ብርሃን ሪፈራል ሆስፒታል ውስጥ"}
              </p>
            </div>
            <div className="bg-white p-4 rounded shadow-sm">
              <h3 className="font-bold mb-2">
                {language === "en" ? "Operating Hours" : "ስራ ሰዓት"}
              </h3>
              <p>
                {language === "en"
                  ? "Monday-Saturday: 8:30 AM - 3:30 PM"
                  : "ሰኞ-ቅዳሜ፡ ከጠዋት 8፡30 - ማታ 3፡30"}
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">
            {current.faqTitle}
          </h2>
          <div className="space-y-4">
            {current.faqs.map((faq, index) => (
              <div
                key={index}
                className="collapse collapse-plus bg-white border border-gray-200 rounded-lg"
              >
                <input
                  type="radio"
                  name="faq-accordion"
                  defaultChecked={index === 0}
                />
                <div className="collapse-title text-lg font-semibold">
                  {faq.question}
                </div>
                <div className="collapse-content">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-red-50 p-6 rounded-lg text-center border border-red-200">
          <h2 className="text-2xl font-bold mb-4 text-red-700">
            {current.ctaTitle}
          </h2>
          <p className="mb-6 max-w-2xl mx-auto">{current.ctaText}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="btn btn-primary">
              {current.buttons.findCenter}
            </button>
            <button className="btn btn-outline">
              {current.buttons.learnMore}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Who;
