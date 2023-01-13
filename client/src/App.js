import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home/Home.jsx";
import DogDetail from "./components/DogDetail/DogDetail";
import LandingPage from "./components/Landing/LandingPage";
import Form from "./components/Form/Form.jsx";

function App() {
  return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<LandingPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/dog/:id" element={<DogDetail />} />
            <Route path="/create" element={<Form />} />
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
