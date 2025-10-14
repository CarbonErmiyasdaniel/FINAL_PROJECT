const Footer = () => {
  // console.log("Footer rendered");
  const { phone, address, social, year } = {
    phone: "+123 456 7890",
    address: "123 Donation St, Blood City",
    social: { facebook: "#", telegram: "#" },
    year: new Date().getFullYear(),
  };

  return (
    <footer className="bg-gray-50 border-t py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            <span>{phone}</span>
          </div>

          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            <span>{address}</span>
          </div>

          <div className="flex gap-4">
            <a
              href={social.facebook}
              className="text-gray-600 hover:text-blue-600"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a>
            <a
              href={social.telegram}
              className="text-gray-600 hover:text-blue-400"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9.04 16.62l-.39 3.67c.56 0 .8-.24 1.09-.53l2.62-2.5 5.44 3.97c1 .55 1.71.26 1.97-.92l3.58-16.8c.32-1.47-.53-2.05-1.5-1.7L2.24 9.7c-1.45.56-1.43 1.36-.25 1.7l4.6 1.44 10.7-6.74c.5-.32.96-.14.58.2z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="text-center text-gray-500 text-sm">
          © {year} BloodDonor. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
