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

// --- START: Component Logic (Unchanged) ---
const About = () => {
  const [language, setLanguage] = useState("en"); // 'en' or 'am'

  const bloodBankImage = {
    src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    alt: language === "en" ? "Debre Berhan Blood Bank" : "ደብረ ብርሃን የደም ባንክ",
  };

  const content = {
    en: {
      title: "About Debre Berhan Blood Bank",
      subtitle: "Saving Lives Through Voluntary Blood Donation",
      sections: [
        {
          title: "Our Story",
          icon: <FaHistory />,
          content:
            "Established in 2010, Debre Berhan Blood Bank serves as the primary blood collection and distribution center for North Shewa Zone. We operate under the Ethiopian Red Cross Society in partnership with the Ministry of Health, ensuring safe and adequate blood supply for Debre Berhan Referral Hospital and surrounding health facilities.",
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
        { value: "12", label: "Served Hospitals" },
      ],
      contact: {
        title: "Visit Us",
        address: "Debre Berhan Referral Hospital Compound, Near Main Gate",
        phone: "+251 912 345 678",
        hours: "Monday - Saturday: 8:30 AM - 4:30 PM",
        emergency: "Available 24/7 for emergency cases",
      },
      switchLanguage: "ቋንቋ ቀይር",
    },
    am: {
      title: "ስለ ደብረ ብርሃን የደም ባንክ",
      subtitle: "በፈቃደኛ ደም ልገሳ ሕይወት ማዳን",
      sections: [
        {
          title: "የእኛ ታሪክ",
          icon: <FaHistory />,
          content:
            "በ2010 ዓ.ም የተመሠረተው ደብረ ብርሃን የደም ባንክ ለሰሜን ሸዋ ዞን ዋና የደም ማሰባሰብ እና ስርጭት ማዕከል ነው። ከኢትዮጵያ ቀይ መስቀል ማህበር እና ከጤና ሚኒስቴር ጋር በመተባበር ለደብረ ብርሃን ሪፈራል ሆስፒታል እና አካባቢው ለሚገኙ የጤና ተቋማት ደህንነቱ የተጠበቀ ደም ያቀርባል።",
        },
        {
          title: "ተልእኳችን",
          icon: <GiHealthNormal />,
          content:
            "በፈቃደኛ እና ያለምንም ክፍያ የሚሰጥ የደም ልገሳ ለሁሉም ታማሚዎች ደህንነቱ የተጠበቀ፣ በቂ እና በጊዜው የሚደርስ የደም አቅርቦት ማረጋገጥ፣ ከፍተኛ የጥራት እና የደህንነት ደረጃዎችን በመጠበቅ።",
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
        { value: "50,000+", label: "የተዳኑ ሕይወቶች" },
        { value: "15,000+", label: "በየዓመቱ የሚሰጡ ለጋሾች" },
        { value: "12", label: "የሚያገለግሉ ሆስፒታሎች" },
      ],
      contact: {
        title: "አድራሻችን",
        address: "ደብረ ብርሃን ሪፈራል ሆስፒታል ውስጥ፣ ከዋናው በር አጠገብ",
        phone: "+251 912 345 678",
        hours: "ሰኞ - ቅዳሜ፡ ከጠዋት 8፡30 - ከማታ 4፡30",
        emergency: "ለአደጋ አጋጣሚዎች ሁልጊዜ ይገኛል",
      },
      switchLanguage: "Switch to English",
    },
  };

  const current = content[language];
  // --- END: Component Logic (Unchanged) ---

  return (
    // Base background for a cleaner separation
    <div className="min-h-screen bg-white font-sans">
      {/* Hero Section: Split Image and Title */}
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
            {/* Title Block */}
            <div className="text-gray-800 lg:order-1 order-2">
              <h1 className="text-4xl sm:text-6xl font-extrabold mb-4 tracking-tight border-l-4 border-red-600 pl-4 animate-fade-in-down">
                {current.title}
              </h1>
              <p className="text-xl sm:text-2xl font-light text-gray-600 animate-fade-in">
                {current.subtitle}
              </p>
              <p className="mt-6 text-lg text-gray-600">
                {current.sections[0].content}{" "}
                {/* Use the first section content here */}
              </p>
            </div>
            {/* Image Block (Moved to Hero for visual impact) */}
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

      {/* --- Mission and Team Sections: Compact 4-Column Layout --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-12">
        <h2 className="text-3xl font-bold text-center mb-12 text-red-800 tracking-tight">
          {language === "en" ? "Our Pillars" : "የእኛ መሠረቶች"}
        </h2>

        {/* About Sections: Now in a 4-column grid for compactness and sharpness */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {current.sections.map((section, index) => (
            <div
              key={index}
              // Enhanced Dynamic effect: Card is slightly smaller, lifts more aggressively
              className="group bg-white p-6 rounded-xl shadow-lg border-b-4 border-red-500 transition-all duration-500 hover:shadow-2xl hover:scale-[1.05] hover:border-red-700 cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="text-red-600 text-2xl p-2 bg-red-50 rounded-full shadow-inner transition-transform duration-300 group-hover:scale-125">
                  {section.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-red-700 transition duration-300">
                  {section.title}
                </h3>
              </div>
              <p className="text-gray-600 text-sm">{section.content}</p>
              {/* Removed the 'Learn More' line to keep cards clean and compact */}
            </div>
          ))}
        </div>
      </div>

      <hr className="max-w-7xl mx-auto border-gray-300 mb-12" />

      {/* --- Impact Facts: Dynamic and Visible Counts --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <div className="bg-red-50 p-10 rounded-2xl shadow-xl">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-10 text-red-800 tracking-tight">
            {language === "en" ? "Our Impact in Numbers" : "በቁጥር ያለን ተጽእኖ"}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {current.facts.map((fact, index) => (
              <div key={index} className="text-center p-4">
                {/* Dynamic effect: Value scales on hover, ring emphasizes the number */}
                <div className="text-5xl font-extrabold text-red-800 mb-2 transform transition-all duration-300 hover:scale-110 hover:text-red-900 inline-block p-2 rounded-full ring-2 ring-red-300 hover:ring-red-600">
                  {fact.value}
                </div>
                <div className="text-lg font-semibold text-gray-700 mt-2">
                  {fact.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <hr className="max-w-7xl mx-auto border-gray-300 mb-12" />

      {/* --- Contact: Focused on information hierarchy --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Contact Block */}
          <div className="lg:col-span-2 bg-gray-50 p-8 lg:p-10 rounded-2xl shadow-xl border-l-4 border-red-600">
            <h2 className="text-3xl font-bold mb-8 text-gray-800 flex items-center gap-3">
              <FaMapMarkerAlt className="text-red-600 text-3xl" />
              {current.contact.title}
            </h2>
            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start gap-4 p-3 bg-white rounded-lg transition duration-300 hover:bg-red-50 hover:shadow-sm border-l-2 border-red-300">
                <FaMapMarkerAlt className="text-red-600 text-xl mt-1 flex-shrink-0" />
                <p className="text-lg text-gray-700 font-medium">
                  {current.contact.address}
                </p>
              </div>
              {/* Phone (highly interactive link) */}
              <a
                href={`tel:${current.contact.phone}`}
                className="flex items-center gap-4 p-3 bg-white rounded-lg transition duration-300 group hover:bg-red-600 hover:text-white hover:shadow-lg transform hover:scale-[1.01] border-l-2 border-red-300"
              >
                <FaPhone className="text-red-600 text-xl group-hover:text-white group-hover:scale-110 transition" />
                <p className="text-lg text-gray-700 group-hover:text-white font-medium">
                  {current.contact.phone}
                </p>
              </a>
              {/* Hours */}
              <div className="flex items-start gap-4 p-3 bg-white rounded-lg transition duration-300 hover:bg-red-50 hover:shadow-sm border-l-2 border-red-300">
                <FaClock className="text-red-600 text-xl mt-1 flex-shrink-0" />
                <p className="text-lg text-gray-700 font-medium">
                  {current.contact.hours}
                </p>
              </div>
            </div>
          </div>

          {/* Emergency / Call-to-Action Block */}
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
  );
};

export default About;

// Note: The animate-wiggle and animate-fade-in classes still require you to
// have custom Tailwind CSS keyframes or a similar utility plugin configured.
