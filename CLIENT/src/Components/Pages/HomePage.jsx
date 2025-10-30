import Footer from "../Footer.jsx";
import Navbar from "../Navbar";
import Front from "../Front";
const HomePage = () => {
  // console.log("HomePage rendered");
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Front />
      <Footer />
    </div>
  );
};
export default HomePage;
