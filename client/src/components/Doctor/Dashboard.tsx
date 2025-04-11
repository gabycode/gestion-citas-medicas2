import { useEffect, useState } from 'react';
import { obtenerCitasDelDoctor } from '../../services/citasService';
import { formatearFecha } from '../../utils/helpers';

export default function DashboardDoctor() {
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    const fetchCitas = async () => {
      const token = localStorage.getItem('doctor_token');
      if (!token) return;
      const data = await obtenerCitasDelDoctor(token);
      setCitas(data);
    };

    fetchCitas();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Citas del doctor</h2>
      <ul className="space-y-2">
        {citas.map((cita: any) => (
          <li key={cita.id} className="p-4 bg-white shadow rounded">
            <p><strong>Paciente:</strong> {cita.paciente?.nombre ?? 'N/D'}</p>
            <p><strong>Fecha:</strong> {formatearFecha(cita.fecha)}</p>
            <p><strong>Motivo:</strong> {cita.motivo}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
