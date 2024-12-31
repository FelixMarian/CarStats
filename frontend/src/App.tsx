import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css'
// @ts-ignore
import Login from "./pages/login.jsx";
// @ts-ignore
import Register from "./pages/register.jsx";
// @ts-ignore
import Dashboard from "./pages/dashboard.jsx";
function App() {


  return (
    <>
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
