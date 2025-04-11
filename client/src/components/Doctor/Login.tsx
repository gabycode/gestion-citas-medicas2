import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginDoctor } from '../../services/doctoresService';

export default function LoginDoctor() {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { token } = await loginDoctor(correo, password);
      localStorage.setItem('doctor_token', token);
      navigate('/dashboard-doctor');
    } catch (err) {
      alert('Login fallido');
      console.error(err);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 space-y-4">
      <input type="email" value={correo} onChange={e => setCorreo(e.target.value)} placeholder="Correo" className="input" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Contraseña" className="input" />
      <button onClick={handleLogin} className="btn-primary">Iniciar sesión</button>
    </div>
  );
}
