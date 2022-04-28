import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Pokemons from './components/Pokemons';
import NavBar from './components/NavBar';
import Details from './pages/details';

export default function App() {
  return (
    <div>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Pokemons />} />
          <Route path="/:name" element={<Details />} />
        </Routes>
      </Router>
    </div>
  );
}
