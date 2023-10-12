import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { Games } from "./pages/Games";
import { Tournaments } from "./pages/Tournaments";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/" element={<Games />} />
        <Route path="/" element={<Tournaments />} />
        <Route path="/" element={<Login />} />
        <Route path="/" element={<Register />} />
      </Routes>
    </div>
  )
}

export default App
