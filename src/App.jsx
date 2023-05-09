import { Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Pages/Home";

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
