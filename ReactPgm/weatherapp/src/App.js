import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import PlpPage from './components/PlpPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/plp" element={<PlpPage />} />
      </Routes>
    </Router>
  );
}

export default App;
