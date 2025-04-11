import { useLocation, useNavigate } from "react-router-dom";
import { formatearFecha } from "../../utils/helpers";

export default function ConfirmacionCita() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const cita = state?.cita;

  if (!cita)
    return <p className="text-center mt-8">No hay cita para mostrar.</p>;

  return (
    <div className="max-w-md mx-auto p-4 bg-green-100 rounded mt-10">
      <h2 className="text-xl font-bold">¡Cita confirmada!</h2>
      <p>
        <strong>Fecha:</strong> {formatearFecha(cita.fecha)}
      </p>
      <p>
        <strong>ID Cita:</strong> {cita._id}
      </p>
      <p>Se ha enviado un correo con los detalles.</p>
      <button
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition cursor-pointer"
        onClick={() => navigate("/")}
      >
        Volver al inicio
      </button>
    </div>
  );
}
