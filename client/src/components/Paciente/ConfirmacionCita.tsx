import { useLocation, useNavigate } from "react-router-dom";
import { formatearFecha } from "../../utils/helpers";
import { toast } from "react-toastify";
import { CheckCircle } from "lucide-react";

export default function ConfirmacionCita() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const cita = state?.cita;

  if (!cita)
    return (
      <p className="text-center mt-8 text-red-600 font-semibold">
        No hay cita para mostrar.
      </p>
    );

  const volverInicio = () => {
    toast.success("¡Gracias por agendar con nosotros!");
    navigate("/");
  };

  return (
    <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-lg p-8 text-center space-y-6 border border-green-200">
      <div className="flex justify-center">
        <CheckCircle className="text-green-500 w-14 h-14" />
      </div>

      <h2 className="text-3xl font-bold text-green-700">
        ¡Tu cita ha sido confirmada!
      </h2>

      <p className="text-gray-700">
        Te hemos enviado un correo con todos los detalles.
      </p>

      <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-left space-y-3 text-gray-800 shadow-inner">
        <p>
          <span className="font-semibold">Fecha:</span>{" "}
          {formatearFecha(cita.fecha)}
        </p>
        <p>
          <span className="font-semibold">Hora:</span> {cita.hora}
        </p>
        <p>
          <span className="font-semibold">Doctor:</span> {cita.doctor?.nombre}{" "}
          {cita.doctor?.apellido}
        </p>
        <p>
          <span className="font-semibold">Especialidad:</span>{" "}
          {cita.doctor?.especialidad}
        </p>
        <p>
          <span className="font-semibold">ID de la cita:</span> {cita._id}
        </p>
      </div>

      <button
        onClick={volverInicio}
        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
      >
        Volver al inicio
      </button>
    </div>
  );
}
