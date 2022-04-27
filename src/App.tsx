import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Pokemons from './components/Pokemons';

const App: React.FC = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Pokemons />} />
        </Routes>
      </Router>
      <Pokemons />
    </div>
  );
}

export default App;
