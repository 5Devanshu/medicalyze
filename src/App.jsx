import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./Components/Navbar";
import { Page1 } from "./Components/Page1";

import MedicalAnalyzer from "./Components/MedicalAnalyer";
import { Footer } from "./Components/Footer";
import { Content } from "./Components/Content";
import { Content2 } from "./Components/Content2";
import { NewContent } from "./Components/NewContent";
import { Project } from "./Components/Project";
import { Login } from "./Components/Login";
import { Register } from "./Components/Register";

function App() {
  return (
    <Router>
      <Navbar />
      
      <Routes>
        <Route path="/" element={
          <>
            <Page1 />
            <Content />
            <Content2 />
            <NewContent />
            <Project />
          </>
        } />
        <Route path="/analyze" element={<MedicalAnalyzer />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />
      </Routes>

    
    </Router>
  );
}

export default App;
