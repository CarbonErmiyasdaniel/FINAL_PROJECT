import React, { useState, useEffect } from "react";
import bloodBankLogo from "../assets/bb.jpg";

const Front = () => {
  // console.log("Front rendered");
  const slides = [
    {
      image: bloodBankLogo,
      title: "የደብረ ብርሃን የደምና ህዋስ አገልግሎት",
      description: "ሕይወት የሚያድኑ የደም ልገሶችን በመስጠት ማህበረሰባችንን እያጠናከርን ነው",
      color: "from-red-800/90 to-red-600/90",
    },
    {
      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      title: "ደም ማሳደድ ሕይወት ነው",
      description: "አንድ የደም ልገሳ እስከ ሦስት ሕይወቶችን ሊያድን ይችላል",
      color: "from-blue-800/90 to-blue-600/90",
    },
    {
      image:
        "https://images.unsplash.com/photo-1581595219315-a187dd40c322?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      title: "ደም የሁላችንም እርዳታ ነው",
      description: "ዛሬ የምትሰጡት ደም ነገ ለእርስዎ ወይም ለቤተሰብዎ ሊሆን ይችላል",
      color: "from-purple-800/90 to-purple-600/90",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToSlide = (index) => {
    if (index !== currentSlide) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide(index);
        setIsTransitioning(false);
      }, 300);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsTransitioning(false);
      }, 300);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative h-screen overflow-hidden bg-gray-900">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0">
        <img
          src={slides[currentSlide].image}
          alt="Blood bank slide"
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isTransitioning ? "opacity-0" : "opacity-100"
          }`}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://placehold.co/1200x800?text=Debre+Berhan+Blood+Bank";
          }}
        />
        <div
          className={`absolute inset-0 bg-gradient-to-br ${slides[currentSlide].color}`}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full justify-center items-center px-4 text-center">
        <div
          className={`max-w-3xl transform transition-all duration-700 ease-out ${
            isTransitioning
              ? "translate-y-6 opacity-0"
              : "translate-y-0 opacity-100"
          }`}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {slides[currentSlide].title}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
            {slides[currentSlide].description}
          </p>
        </div>

        {/* Interactive Indicators */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? "w-8 bg-white"
                  : "w-4 bg-white/50 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Stats Section */}
        <div
          className={`absolute bottom-24 left-0 right-0 bg-white/10 backdrop-blur-sm py-4 transform transition-all duration-700 ${
            isTransitioning
              ? "translate-y-10 opacity-0"
              : "translate-y-0 opacity-100"
          }`}
        >
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
            {[
              { value: "12+", label: "ዓመታት አገልግሎት" },
              { value: "50K+", label: "የተዳኑ ሕይወቶች" },
              { value: "15K+", label: "ዓመታዊ ለጋሾች" },
              { value: "12", label: "የምንደግፋቸው ሆስፒታሎች" },
            ].map((stat, index) => (
              <div
                key={index}
                className="group p-3 rounded-lg hover:bg-white/10 transition-colors duration-300"
              >
                <div className="text-3xl font-bold text-white group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-sm text-white/80 group-hover:text-white transition-colors duration-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Front;
