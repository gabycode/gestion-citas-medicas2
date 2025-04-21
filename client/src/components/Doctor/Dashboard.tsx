import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDoctorProfile } from "../../services/doctoresService";
import { obtenerCitasDelDoctor, deleteCitas } from "../../services/citasService";
import { Doctor, Cita } from "../../types";
import { toast } from "react-toastify";
import { CalendarDays, Clock, CheckCircle, Calendar as CalendarIcon, UserCog, BarChart3, XCircle } from "lucide-react";
import { formatearFecha } from "../../utils/helpers";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);
const MySwal = withReactContent(Swal);

export default function DoctorDashboard() {
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [citas, setCitas] = useState<Cita[]>([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return toast.error("No autorizado");

      try {
        const profileResponse = await getDoctorProfile(token);
        setDoctor(profileResponse.data);

        const citasData = await obtenerCitasDelDoctor(token);
        setCitas(citasData);
      } catch (err: any) {
        console.error(err);
        toast.error("Error al cargar los datos del doctor");
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.info("Sesión cerrada correctamente");
    navigate("/login");
  };

  const handleCancelarCita = async (id: string) => {
    const result = await MySwal.fire({
      title: "¿Cancelar esta cita?",
      text: "Esta acción notificará al paciente y no se podrá deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, cancelar",
      cancelButtonText: "No"
    });

    if (result.isConfirmed) {
      try {
        await deleteCitas(id);
        setCitas(citas.filter(c => c._id !== id));
        toast.success("✅ Cita cancelada correctamente y notificada al paciente.");
      } catch (error) {
        toast.error("Error al cancelar la cita");
      }
    }
  };

  const today = new Date().toISOString().split("T")[0];
  const citasHoy = citas.filter(c => c.fecha.startsWith(today));
  const citasPasadas = citas.filter(c => new Date(c.fecha + "T" + c.hora) < new Date());
  const citasPendientes = citas.filter(c => new Date(c.fecha + "T" + c.hora) >= new Date());

  const eventos = citas.map((cita) => {
    const start = new Date(`${cita.fecha}T${cita.hora}`);
    const end = new Date(start.getTime() + 30 * 60000);
    const paciente = cita.paciente as any;
    return {
      title: `${paciente?.nombre} ${paciente?.apellido}`,
      start,
      end,
      allDay: false,
    };
  });

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold text-blue-700">Panel del Doctor</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Cerrar sesión
          </button>
        </div>

        {doctor && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md border border-blue-100">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Bienvenido, Dr. {doctor.nombre} {doctor.apellido}
              </h2>
              <p className="text-gray-600 mb-1">Especialidad: {doctor.especialidad}</p>
              <p className="text-gray-600 mb-1">Teléfono: {doctor.telefono}</p>
              <p className="text-gray-600">Correo: {doctor.email}</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-green-100 space-y-3">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Opciones Rápidas</h2>
              <button
                onClick={() => setShowCalendar(!showCalendar)}
                className="w-full flex items-center gap-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                <CalendarIcon className="w-5 h-5" /> {showCalendar ? "Ocultar calendario" : "Ver calendario"}
              </button>
              <button
                onClick={() => toast.info("Editar perfil próximamente")}
                className="w-full flex items-center gap-2 bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700"
              >
                <UserCog className="w-5 h-5" /> Editar perfil
              </button>
              <button
                onClick={() => toast.info("Estadísticas próximamente")}
                className="w-full flex items-center gap-2 bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600"
              >
                <BarChart3 className="w-5 h-5" /> Ver estadísticas
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow text-center border border-gray-200">
            <CalendarDays className="w-6 h-6 mx-auto text-blue-600" />
            <h4 className="text-lg font-bold mt-2">Citas Hoy</h4>
            <p className="text-xl text-blue-700">{citasHoy.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center border border-gray-200">
            <Clock className="w-6 h-6 mx-auto text-yellow-500" />
            <h4 className="text-lg font-bold mt-2">Pendientes</h4>
            <p className="text-xl text-yellow-600">{citasPendientes.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center border border-gray-200">
            <CheckCircle className="w-6 h-6 mx-auto text-green-500" />
            <h4 className="text-lg font-bold mt-2">Completadas</h4>
            <p className="text-xl text-green-600">{citasPasadas.length}</p>
          </div>
        </div>

        {showCalendar && (
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Calendario de Citas</h2>
            <Calendar
              localizer={localizer}
              events={eventos}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500 }}
            />
          </div>
        )}

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Próximas Citas</h2>
          {citas.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {citas.map((cita) => {
                const citaDate = new Date(cita.fecha + "T" + cita.hora);
                const isPast = citaDate < new Date();
                const paciente = cita.paciente as any;
                return (
                  <li
                    key={cita._id}
                    className="py-6 px-4 flex flex-col md:flex-row md:justify-between md:items-center bg-gray-50 rounded-lg mb-4 border"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-blue-100 text-blue-700 rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg">
                        {paciente?.nombre?.[0]}{paciente?.apellido?.[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 text-lg">
                          {paciente?.nombre} {paciente?.apellido}
                        </p>
                        <p className="text-gray-600">
                          📅 {formatearFecha(cita.fecha)} ⏰ {cita.hora}
                        </p>
                        <p className="text-gray-600">📞 {paciente?.telefono}</p>
                        <p className="text-gray-600">✉️ {paciente?.correo}</p>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 flex flex-col gap-2 items-end">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        isPast ? "bg-red-100 text-red-600" : "bg-green-100 text-green-700"
                      }`}>
                        {isPast ? "Expirada" : "Activa"}
                      </span>
                      {!isPast && (
                        <button
                          onClick={() => handleCancelarCita(cita._id)}
                          className="flex items-center gap-1 mt-1 text-sm bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200"
                        >
                          <XCircle className="w-4 h-4" /> Cancelar
                        </button>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-gray-600">No tienes citas programadas.</p>
          )}
        </div>
      </div>
    </div>
  );
}