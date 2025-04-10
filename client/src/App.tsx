import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Confirmacion from './pages/Confirmacion';
import Agendar from './pages/Agendar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/confirmacion" element={<Confirmacion />} />
        <Route path="/agendar" element={<Agendar />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
