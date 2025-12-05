import React, { useState } from "react";

// ------------------- FAQ DATA (English + Amharic) -------------------
const FAQ_DATA = {
  blood: {
    en: [
      {
        question: "WHO MAY DONATE BLOOD?",
        answer:
          "Generally, donors must be in good health, weigh at least 50kg (110lbs), and be between the ages of 18 and 65. Specific eligibility criteria regarding travel, medications, and medical history apply.",
      },
      {
        question: "WHAT DO I GET IN RETURN FOR MY BLOOD DONATION?",
        answer:
          "Blood donation is a voluntary, unpaid act. However, you get the satisfaction of saving lives! Some centers may provide refreshments like juice and cookies after your donation.",
      },
      {
        question: "WHY SHOULD I DONATE BLOOD?",
        answer:
          "Blood is needed every few seconds for surgeries, cancer treatments, trauma victims, and patients with blood disorders. There is no artificial substitute for human blood.",
      },
      {
        question: "HOW OFTEN CAN I DONATE BLOOD?",
        answer:
          "Whole blood donation can usually be done every 56 days (8 weeks). Platelet donation can be done more frequently, often every 7 days, up to 24 times a year.",
      },
      {
        question: "WHAT IS THE PROCEDURE WHEN I DONATE BLOOD?",
        answer:
          "The process involves registration, a simple medical checkup, the donation itself (5-10 mins), and a short rest period with refreshments.",
      },
      {
        question: "HOW LONG DOES THE DONATION TAKE?",
        answer:
          "The entire process usually takes about 45 minutes to an hour, although the actual blood draw takes less than 10 minutes.",
      },
    ],

    am: [
      {
        question: "ደም መስጠት የሚችሉት ማን ናቸው?",
        answer:
          "አብዛኛውን ጊዜ ሰዎች ጤናማ መሆን፣ ቢያንስ 50 ኪ.ግ መመዝኛ እና ከ18–65 ዓመት መካከል መሆን ይኖርባቸዋል።",
      },
      {
        question: "ደም ሲሰጡ ምን ይመለሳል?",
        answer:
          "ደም መስጠት ነፃና በበጎ ፈቃድ የሚደረግ ነው። ነገር ግን ህይወት ማዳን የሚሰጥዎት ታላቅ ደስታ ነው!",
      },
      {
        question: "ደም መስጠት ለምን አስፈላጊ ነው?",
        answer:
          "ደም በቀዶ ጥገና፣ በካንሰር ሕክምና፣ በአደጋ ተጎጂዎች እና በደም ችግኝ ያላቸው ታካሚዎች ላይ በብዛት ይያዛል።",
      },
      {
        question: "በምን የተወሰነ ጊዜ ደም ማቅረብ እችላለሁ?",
        answer: "አጠቃላይ ደም ስጦታ በ56 ቀናት ውስጥ አንዴ ሊደረግ ይችላል።",
      },
      {
        question: "የደም መስጠት ሂደት ምንድነው?",
        answer:
          "መመዝገብ፣ ቀላል የጤና ምርመራ፣ የመስጠት ሂደት (5–10 ደቂቃ) እና ከዚያ እረፍት እና መጠጥ/መብላት።",
      },
      {
        question: "ሂደቱ ምን ያህል ጊዜ ይወስዳል?",
        answer: "አጠቃላይ ሂደቱ 45 ደቂቃ እስከ 1 ሰዓት ይወስዳል።",
      },
    ],
  },
};

// ------------------- AccordionItem Component (Refactored) -------------------
const AccordionItem = ({ item, isOpen, onClick }) => {
  return (
    <div className="mb-4 border border-red-300/50 rounded-lg shadow-lg overflow-hidden transition-all duration-300">
      <button
        className="flex justify-between items-center w-full p-4 text-left font-semibold text-red-900 bg-red-50 hover:bg-red-100 transition-colors duration-200 focus:outline-none"
        onClick={onClick}
      >
        <span>{item.question}</span>
        <span
          className={`transform transition-transform duration-300 text-xl ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          {isOpen ? "−" : "+"}
        </span>
      </button>
      <div
        className={`
          px-4 text-gray-700 transition-all duration-500 ease-in-out bg-white
          ${isOpen ? "max-h-screen py-4 opacity-100" : "max-h-0 py-0 opacity-0"}
        `}
      >
        <p className="pb-2">{item.answer}</p>
      </div>
    </div>
  );
};

// ------------------- MAIN FaqPage Component (Refactored) -------------------
const FaqPage = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [language, setLanguage] = useState("en");

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = FAQ_DATA.blood[language];

  return (
    <div className="mx-auto max-w-4xl p-4 md:p-8 bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen rounded-lg shadow-lg">
      <div className="flex justify-end mb-6">
        <button
          className="flex items-center space-x-2 p-2 rounded-lg bg-red-100 text-red-700 font-medium hover:bg-red-200 transition-colors cursor-pointer shadow-sm"
          onClick={() => setLanguage(language === "en" ? "am" : "en")}
        >
          <span className="text-xl">🅰️✳️</span>
          <span className="hidden sm:inline">
            {language === "en" ? "አማርኛ ቋንቋ" : "English Language"}
          </span>
          <span className="text-lg">›</span>
        </button>
      </div>
      <h1 className="text-2xl font-bold text-center text-red-800 mb-8">
        Frequently Asked Questions
      </h1>
      <div className="space-y-4">
        {faqs.map((item, index) => (
          <AccordionItem
            key={index}
            item={item}
            isOpen={openIndex === index}
            onClick={() => toggleAccordion(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default FaqPage;
