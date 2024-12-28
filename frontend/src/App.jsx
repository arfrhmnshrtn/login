import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./component/Login"
import Register from "./component/Register";
import Dashboard from "./component/Dashboard";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  )
}

export default App
