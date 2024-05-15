import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserHome from "./components/User/UserHome";
import UserBooking from "./components/User/UserBooking";
import Navbar from "./components/Navbar/Navbar";
import LoginRegister from "./components/LoginRegister/LoginRegister";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          {/* <Route path="/register" element={<Register />} /> */}
          <Route path="/loginregister" element={<LoginRegister />} />
          <Route path="/" element={<UserHome />} />
          <Route path="/user/booking" element={<UserBooking />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
