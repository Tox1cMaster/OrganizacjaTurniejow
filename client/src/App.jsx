import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { Navbar } from "./components/Navbar";
import { NavbarAuth } from "./components/NavbarAuth";
import { Home } from "./pages/Home";
import { Games } from "./pages/Games";
import { Tournaments } from "./pages/Tournaments";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { CreateTournament } from './pages/CreateTournament';
import AuthUser from './components/AuthUser';

import { Route, Routes } from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoutes';
import { Account } from './pages/Account';

function App() {
  const {getToken} = AuthUser();
  console.log(getToken());
  return (
    <div className="App">
      {getToken() ? <NavbarAuth /> : <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<Games />} />
        <Route path="/tournaments" element={<Tournaments />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoutes/>}>
          <Route path="/createTournament" element={<CreateTournament />} />
          <Route path="/account" element={<Account />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App