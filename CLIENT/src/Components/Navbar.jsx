import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaBars, FaTimes, FaSignInAlt } from "react-icons/fa";
import bloodBankLogo from "../assets/bb.jpg";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeHover, setActiveHover] = useState(null);
  const [amharicTextIndex, setAmharicTextIndex] = useState(0);

  const amharicTexts = [
    "የደብረ ብርሃን የደም ባንክ",
    "ሕይወት የሚያድኑ የደም ልገሶች",
    "ደም መለገሰ ሕይወት ነው",
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);

    const textInterval = setInterval(() => {
      setAmharicTextIndex((prev) => (prev + 1) % amharicTexts.length);
    }, 3000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(textInterval);
    };
  }, [amharicTexts.length]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navLinks = [
    { to: "/about", text: "About Us" },
    { to: "/who", text: "Who Can Donate?" },
  ];

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm h-16"
          : "bg-white/95 backdrop-blur-sm h-14"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo with sliding Amharic text */}
          <Link to="/" className="flex items-center group">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-600 to-red-800 opacity-90 group-hover:from-red-700 group-hover:to-red-900 transition-all duration-300 shadow-sm"></div>
              <img
                src={bloodBankLogo}
                alt="Debre Berhan Blood Bank Logo"
                className="relative z-10 w-full h-full rounded-full object-cover p-0.5 border border-white/30 group-hover:border-white/50 transition-all duration-300"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://placehold.co/64x64?text=DBBB";
                }}
              />
            </div>
            <div className="ml-3 overflow-hidden h-8">
              <div
                key={amharicTextIndex}
                className="flex flex-col transition-transform duration-500 ease-in-out"
                style={{ transform: `translateY(-${amharicTextIndex * 100}%)` }}
              >
                {amharicTexts.map((text, index) => (
                  <span
                    key={index}
                    className="text-lg sm:text-xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent whitespace-nowrap"
                  >
                    {text}
                  </span>
                ))}
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 h-full">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onMouseEnter={() => setActiveHover(link.to)}
                onMouseLeave={() => setActiveHover(null)}
              >
                {({ isActive }) => (
                  <span
                    className={`
                      relative px-4 h-full flex items-center text-sm font-medium
                      ${
                        isActive
                          ? "text-red-700"
                          : "text-gray-700 hover:text-red-600"
                      }
                      transition-colors duration-300
                    `}
                  >
                    {link.text}
                    <span
                      className={`
                        absolute bottom-0 left-1/2 h-0.5 w-0 bg-gradient-to-r from-red-600 to-red-800 transition-all duration-300
                        ${
                          activeHover === link.to
                            ? "w-4/5 -translate-x-1/2"
                            : "w-0 -translate-x-1/2"
                        }
                        ${isActive ? "!w-4/5 !-translate-x-1/2" : ""}
                      `}
                    ></span>
                  </span>
                )}
              </NavLink>
            ))}

            <div className="h-6 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent mx-2"></div>

            <Link
              to="/sign-in"
              className="flex items-center px-3 py-1.5 rounded-md border border-red-600 text-red-600 bg-white/80 hover:bg-red-50 hover:text-red-700 shadow-xs hover:shadow-sm transition-all duration-300 text-sm"
            >
              <FaSignInAlt className="mr-1.5 text-xs" />
              Sign In
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-1.5 rounded-md text-gray-700 hover:text-red-600 focus:outline-none transition-colors duration-300"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <FaTimes className="h-5 w-5 animate-spin-in" />
            ) : (
              <FaBars className="h-5 w-5 animate-pulse" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`
        md:hidden bg-white/95 backdrop-blur-lg overflow-hidden transition-all duration-300
        ${mobileMenuOpen ? "max-h-96 shadow-sm" : "max-h-0"}
      `}
      >
        <div className="px-2 pt-1 pb-3 space-y-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={toggleMobileMenu}
              className={({ isActive }) => `
                block px-3 py-2 rounded-md text-sm font-medium
                ${
                  isActive
                    ? "bg-red-50 text-red-700"
                    : "text-gray-700 hover:bg-gray-100"
                }
                transition-all duration-200
              `}
            >
              {link.text}
            </NavLink>
          ))}

          <div className="pt-1 space-y-1">
            <Link
              to="/sign-in"
              onClick={toggleMobileMenu}
              className="flex items-center justify-center px-3 py-2 rounded-md border border-red-600 text-red-600 bg-white/80 hover:bg-red-50 hover:text-red-700 shadow-xs hover:shadow-sm transition-all duration-300 text-sm"
            >
              <FaSignInAlt className="mr-1.5 text-xs" />
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
