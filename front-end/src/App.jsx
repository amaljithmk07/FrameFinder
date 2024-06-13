import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserHome from "./components/User/UserHome";
import UserBooking from "./components/User/UserBooking";
import Navbar from "./components/Navbar/Navbar";
import LoginRegister from "./components/LoginRegister/LoginRegister";
import PhotoRegister from "./components/LoginRegister/PhotoRegister";
import PhotographerReview from "./components/Photographer/PhotographerReview";
import Footer from "./components/Footer/Footer";
import PhotographerHome from "./components/Photographer/PhotographerHome";
import PhotoPreviousBooking from "./components/Photographer/PhotoPreviousBooking";
import PhotoProfile from "./components/Photographer/PhotoProfile";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/photographer-register" element={<PhotoRegister />} />
          <Route path="/loginregister" element={<LoginRegister />} />

          {/* //////////// */}
          <Route path="/" element={<UserHome />} />
          <Route path="/user/booking" element={<UserBooking />} />

          {/* ///////////////////// */}
          <Route path="/home" element={<PhotographerHome />} />
          <Route path="/previous-booking" element={<PhotoPreviousBooking />} />
          <Route
            path="/photographer-review/:id"
            element={<PhotographerReview />}
          />
          <Route path="/photographer-profile" element={<PhotoProfile />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
