import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserHome from "./components/User/UserHome";
import UserBooking from "./components/User/UserBooking";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<UserHome />} />
          <Route path="/user/booking" element={<UserBooking />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
