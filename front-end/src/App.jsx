import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import UserHome from "./components/User/UserHome";
import UserBooking from "./components/User/UserBooking";
import Navbar from "./components/Navbar/Navbar";
import LoginRegister from "./components/LoginRegister/LoginRegister";
import PhotoRegister from "./components/LoginRegister/PhotoRegister";
import Footer from "./components/Footer/Footer";
import PhotoPreviousBooking from "./components/Photographer/PhotoPreviousBooking";
import PhotoProfile from "./components/Photographer/PhotoProfile";
import PhotographerHome from "./components/Photographer/PhotoHome";
import PhotoBookingPreview from "./components/Photographer/PhotoBookingPreview";
import UserPhotoBooking from "./components/User/UserPhotoBooking";
import PhotoCalender from "./components/Photographer/PhotoCalender";

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
          <Route
            path="/photographer-review/:id"
            element={<UserPhotoBooking />}
          />

          {/* ///////////////////// */}
          <Route path="/home" element={<PhotographerHome />} />
          <Route path="/previous-booking" element={<PhotoPreviousBooking />} />
          <Route path="/photographer-calender" element={<PhotoCalender />} />
          <Route path="/photographer-profile" element={<PhotoProfile />} />
          <Route
            path="/photo-booking-preview/:id"
            element={<PhotoBookingPreview />}
          />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
