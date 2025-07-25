import "./App.css";
import Login from "./Components/Login/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminDashBoard from "./Components/AdminDasboard/AdminDashboard";
import UserDashBoard from "./Components/UserDahsboard/UserDashboard";
import DataProvider from "./DataProvider";

function App() {
  return (
    <Router>
      <DataProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<AdminDashBoard />} />
          <Route path="/user" element={<UserDashBoard />} />
        </Routes>
      </DataProvider>
    </Router>
    // </div>
  );
}

export default App;
