import Faq from "../components/layout/Faq";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import Hero from "../components/layout/Hero";
import Navbar from "../components/layout/Navbar";
import RentUs from "../components/layout/RentUs";

export const Home = () => (
  <>
    <Header />
    <Navbar />
    <Hero />
    <RentUs />
    <Faq />
    <Footer />
  </>
);

export default Home;
