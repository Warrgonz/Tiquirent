import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import Services from "./pages/Services";
import Reservation from "./pages/Reservation";
import Contact from "./pages/Contact";
import Book from "./pages/Book";
import Tourist from "./pages/Tourist";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/reservations" element={<Reservation />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/book" element={<Book />} />
        <Route path="/tourist" element={<Tourist />} />
      </Routes>
    </Router>
  );
}

export default App;
