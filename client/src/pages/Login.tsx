import ConfirmacionCita from '../components/Paciente/ConfirmacionCita';

export default function Confirmacion() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <div className="max-w-xl w-full p-6 bg-white rounded shadow">
        <ConfirmacionCita />
      </div>
    </div>
  );
}
