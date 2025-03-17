import BookMenu from "../components/layout/Book";
import Faq from "../components/layout/Faq";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import Hero from "../components/layout/Hero";
import Navbar from "../components/layout/Navbar";
import RentUs from "../components/layout/RentUs";
import Tour from "../components/layout/Tourist";

export const Home = () => (
  <>
    <Header />
    <Navbar />
    <Hero />
    <BookMenu />
    <RentUs />
    <Tour />
    <Faq />
    <Footer />
  </>
);

export default Home;
