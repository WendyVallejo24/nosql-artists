import React, { Component } from "react";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Link } from "react-router-dom";

import AddArtists from "./components/add-artists.component";
import ArtistsList from "./components/artists-list.component";
import { Login } from "./components/users/Login";
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { Logout } from './components/users/Logout';
import { Register } from './components/users/Register';
import { Perfil } from './components/users/Perfil';

import image from './logo.png';

class App extends Component {
  render() {
    return (
      <div>
        <div className="header">
          <nav className="navbar navbar-expand">
            <a href="/artists" className="navbar-brand">
              <img src={image} className='img-home' width={45} height={45} alt="" />
            </a>
            <h3>Famous</h3>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/artists"} className="nav-link">
                  Artists
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/add"} className="nav-link">
                  Add
                </Link>
              </li>
              <li className='nav-item'>
                <Link to={"/perfil"} className='nav-link'>
                  Perfil
                </Link>
              </li>
              <li className='logout'>
                <AuthProvider>
                  <Logout />
                </AuthProvider>
              </li>
            </div>
          </nav>
        </div>
        <br />
        <br />
        <br />
        <br />
        <div className="container mt-3" id="general">
          <AuthProvider>
            <Routes>
              <Route path='login' element={<Login />} />
              <Route path='register' element={<Register />} />
              <Route exact path="artists" element={
                <ProtectedRoute>
                  <ArtistsList />
                </ProtectedRoute>
              } />
              <Route exact path="add" element={
                <ProtectedRoute>
                  <AddArtists />
                </ProtectedRoute>
              } />
              <Route path="perfil" element={
                <ProtectedRoute>
                  <Perfil />
                </ProtectedRoute>
              } />
            </Routes>
          </AuthProvider>
        </div>
      </div>
    );
  }
}

export default App;
