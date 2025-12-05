import React, { useState } from "react";
import {
  FaHistory,
  FaMapMarkerAlt,
  FaPhone,
  FaClock,
  FaUsers,
  FaTint,
  FaLanguage,
  FaInfoCircle,
  FaAngleRight,
} from "react-icons/fa";
import { GiHealthNormal } from "react-icons/gi";

const About = () => {
  const [language, setLanguage] = useState("en"); // 'en' or 'am'

  const bloodBankImage = {
    src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    alt: language === "en" ? "Debre Berhan Blood Bank" : "ደብረ ብርሃን የደም ባንክ",
  };

  const content = {
    en: {
      title: "About Debre Berhan Blood Bank",
      subtitle: "Saving lives through voluntary blood donation",
      sections: [
        {
          title: "Our Story",
          icon: <FaHistory />,
          content:
            "Founded in 2006, Debre Berhan Blood Bank reports to the Amhara National Regional State Health office and is based in the city of Debre Berhan in the North Shoa zone of the Amhara region.",
        },
        {
          title: "Our Mission",
          icon: <GiHealthNormal />,
          content:
            "To provide safe, adequate and timely blood supply to all patients in need through voluntary non-remunerated blood donation, while maintaining the highest standards of quality and safety.",
        },
        {
          title: "Our Impact",
          icon: <FaTint />,
          content:
            "Last year alone, we collected over 5,000 units of blood, serving more than 15,000 patients across 12 health facilities in North Shewa. Our blood helps trauma patients, mothers with childbirth complications, children with anemia, and many others.",
        },
        {
          title: "Our Team",
          icon: <FaUsers />,
          content:
            "We have 25 dedicated staff members including hematologists, laboratory technicians, nurses, and community mobilizers. All our staff are certified by the Ethiopian Food and Drug Administration in blood bank operations.",
        },
      ],
      facts: [
        { value: "12+", label: "Years of Service" },
        { value: "50,000+", label: "Lives Saved" },
        { value: "15,000+", label: "Annual Donors" },
        { value: "18+", label: "Served Hospitals" },
      ],
      contact: {
        title: "Visit Us",
        address: "Debre Bright Blanket Factory Area ...",
        phone: "0116811906",
        hours: "Open 24 hours, Monday to Sunday",
        emergency: "Available 24/7 for emergency cases",
      },
      switchLanguage: "ቋንቋ ቀይር",
    },
    am: {
      title: "ስለ ደብረ ብርሃን የደም ባንክ",
      subtitle: "በፈቃደኛ ደም በመለገስ ሕይወት ማዳን",
      sections: [
        {
          title: "የእኛ ታሪክ",
          icon: <FaHistory />,
          content:
            "በ2006 ዓ.ም የተመሠረተው ደብረ ብርሃን የደም ባንክ ተጠሪነቱ ለአብክመ ጤና ቢሮ ሲሆን መግኛውን በአማራ ክልል ሰሜን ሸዋ ደብረ ብርሃን ከተማ ነው።",
        },
        {
          title: "አላማችን",
          icon: <GiHealthNormal />,
          content:
            "ደም ባንኩ የተቋቋመበት አላማው ደም ከበጎ ፍቃደኛ በነፃ እያሰባሰብ ጥራቱ እና ደህንነቱ የተጠበቀ ደም ለሚያስፈልጋቸው ህሙማን በነፃ ማድረስ ነው።",
        },
        {
          title: "የእኛ ተጽእኖ",
          icon: <FaTint />,
          content:
            "ባለፈው ዓመት ብቻ ከ5,000 የሚበልጡ የደም ክፍሎችን በማሰባሰብ ለሰሜን ሸዋ ውስጥ በ12 የጤና ተቋማት ውስጥ ለሚገኙ ከ15,000 በላይ ታማሚዎች አገልግለናል። የእኛ ደም ለአደጋ ሰለባዎች፣ ለወላድት እናማዎች፣ ለአኒሚያ ለሚያጋጥማቸው ልጆች እና ለሌሎችም ብዙ ይጠቅማል።",
        },
        {
          title: "የእኛ ቡድን",
          icon: <FaUsers />,
          content:
            "25 የሚሆኑ ተሞክሮ ያላቸው ሰራተኞች አሉን፣ ከእነዚህም ውስጥ የደም ባለሙያዎች፣ የላብራቶሪ ቴክኒሻኖች፣ ነርሶች እና የማህበረሰብ ማሰባሰቢያ ሰራተኞች ይገኙበታል። ሁሉም ሰራተኞቻችን በኢትዮጵያ ምግብ እና መድሃኒት አስተዳደር በደም ባንክ ስራዎች የተፈቀዱ ናቸው።",
        },
      ],
      facts: [
        { value: "12+", label: "የአገልግሎት ዓመታት" },
        { value: "50,000+", label: "የዳኑ ሕይወቶች" },
        { value: "15,000+", label: "በየዓመቱ የሚሰጡ ለጋሾች" },
        { value: "12", label: "የሚያገለግሉ ሆስፒታሎች" },
      ],
      contact: {
        title: "አድራሻችን",
        address: "ደብረ ብርሐን ብርድ ልብስ ፋብሪካ አካባቢ",
        phone: "0116811906",
        hours: "ሁልጊዜ ከሰኞ እስክ እሁድ 24 ሰአት",
        emergency: "ለአደጋ አጋጣሚዎች ሁልጊዜ ይገኛል",
      },
      switchLanguage: "Switch to English",
    },
  };

  const current = content[language];

  return (
    <div className="min-h-screen bg-white font-sans">
      <div className="bg-gray-100 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-20">
          <div className="flex justify-end mb-6">
            <button
              onClick={() => setLanguage(language === "en" ? "am" : "en")}
              className="group flex items-center gap-2 px-4 py-2 text-sm font-semibold transition duration-300 rounded-full border border-red-700 text-red-700 hover:bg-red-700 hover:text-white shadow-md"
            >
              <FaLanguage className="text-lg transition-transform duration-300 group-hover:scale-110" />
              {current.switchLanguage}
              <FaAngleRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="text-gray-800 lg:order-1 order-2">
              <h1 className="text-4xl sm:text-6xl font-extrabold mb-4 tracking-tight border-l-4 border-red-600 pl-4 animate-fade-in-down">
                {current.title}
              </h1>
              <p className="text-xl sm:text-2xl font-light text-gray-600 animate-fade-in">
                {current.subtitle}
              </p>
              <p className="mt-6 text-lg text-gray-600">
                {current.sections[0].content}
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform transition duration-500 lg:order-2 order-1">
              <img
                src={bloodBankImage.src}
                alt={bloodBankImage.alt}
                className="w-full h-full object-cover min-h-[300px] lg:min-h-[400px]"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/800x500/FEE2E2/B91C1C?text=Debre+Berhan+Blood+Bank";
                  e.target.className = "w-full h-full object-contain p-8";
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-12">
        <h2 className="text-3xl font-bold text-center mb-12 text-red-800 tracking-tight">
          {language === "en" ? "Our Pillars" : "የእኛ መሠረቶች"}
        </h2>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 bg-gray-50 p-8 lg:p-10 rounded-2xl shadow-xl border-l-4 border-red-600">
              <h2 className="text-3xl font-bold mb-8 text-gray-800 flex items-center gap-3">
                <FaMapMarkerAlt className="text-red-600 text-3xl" />
                {current.contact.title}
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-3 bg-white rounded-lg transition duration-300 hover:bg-red-50 hover:shadow-sm border-l-2 border-red-300">
                  <FaMapMarkerAlt className="text-red-600 text-xl mt-1 flex-shrink-0" />
                  <p className="text-lg text-gray-700 font-medium">
                    {current.contact.address}
                  </p>
                </div>
                <a
                  href={`tel:${current.contact.phone}`}
                  className="flex items-center gap-4 p-3 bg-white rounded-lg transition duration-300 group hover:bg-red-600 hover:text-white hover:shadow-lg transform hover:scale-[1.01] border-l-2 border-red-300"
                >
                  <FaPhone className="text-red-600 text-xl group-hover:text-white group-hover:scale-110 transition" />
                  <p className="text-lg text-gray-700 group-hover:text-white font-medium">
                    {current.contact.phone}
                  </p>
                </a>
                <div className="flex items-start gap-4 p-3 bg-white rounded-lg transition duration-300 hover:bg-red-50 hover:shadow-sm border-l-2 border-red-300">
                  <FaClock className="text-red-600 text-xl mt-1 flex-shrink-0" />
                  <p className="text-lg text-gray-700 font-medium">
                    {current.contact.hours}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-2xl shadow-xl bg-red-800 text-white flex flex-col justify-between">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 border-b border-red-400 pb-2">
                  <FaInfoCircle className="text-blue-400" />
                  {language === "en" ? "Emergency Support" : "ድንገተኛ ድጋፍ"}
                </h3>
                <p className="italic font-light text-red-100">
                  {current.contact.emergency}
                </p>
              </div>
              <a
                href={`tel:${current.contact.phone}`}
                className="w-full text-center py-3 px-4 bg-white text-red-800 font-bold rounded-full transition duration-300 hover:bg-gray-200 hover:scale-[1.02] shadow-lg flex items-center justify-center gap-2"
              >
                <FaPhone className="animate-wiggle" />
                {language === "en" ? "Call 24/7" : "24/7 ይደውሉ"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
