import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Pokemons from './components/Pokemons';
import NavBar from './components/NavBar';
import Details from './pages/details';

const App: React.FC = () => {
  return (
    <div>
      <Router>
      <NavBar />
        <Routes>
          <Route path="/" element={<Pokemons />} />
          <Route path="/details" element={<Details />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
