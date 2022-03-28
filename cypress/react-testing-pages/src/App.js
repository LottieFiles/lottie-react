import LoadPage from './components/Load';
import PlayerControls from './components/Controls';
import Properties from './components/Properties';
import Methods from './components/Methods';
import Home from './components/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/load" element={<LoadPage />} />
          <Route path="/controls" element={<PlayerControls />} />
          <Route path="/methods" element={<Methods />} />
          <Route path="/properties" element={<Properties />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
