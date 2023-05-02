import React, { Component } from "react";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Link } from "react-router-dom";

import AddArtists from "./components/add-artists.component";
import ArtistsList from "./components/artists-list.component";

import image from './logo.png';

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/artists" className="navbar-brand">
          <img src={image} className='img-home' width={45} height={45} />
          </a>
          <h3>React Firestore CRUD</h3>
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
          </div>
        </nav>
        
        <div className="container mt-3" id="general">
          <Routes>
            <Route exact path="artists"    element={<ArtistsList />} />
            <Route exact path="add"  element={<AddArtists />} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
