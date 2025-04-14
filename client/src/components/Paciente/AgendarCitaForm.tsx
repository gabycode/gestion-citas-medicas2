import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createCita } from "../../services/citasService";
import { useState, useEffect } from "react";
import { Doctor } from "../../types";
import { getAllDoctores } from "../../services/doctoresService";
import twoDoctorsImage from "../../assets/two-doctors.png";
import { ArrowLeftIcon } from "lucide-react";

export default function AgendarCitaForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [doctores, setDoctores] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDoctores = async () => {
      try {
        const response = await getAllDoctores();
        setDoctores(response.data);
      } catch (error) {
        console.error("Error al cargar doctores:", error);
      }
    };

    fetchDoctores();
  }, []);

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const citaData = {
        fecha: data.fecha,
        hora: data.hora,
        doctor: data.doctorId,
        paciente: {
          nombre: data.nombre,
          apellido: data.apellido,
          correo: data.correo,
          telefono: data.telefono,
        },
      };

      const citaResponse = await createCita(citaData);
      reset();
      setLoading(false);

      toast.success("Cita agendada con éxito 🎉");

      navigate("/confirmacion", { state: { cita: citaResponse.data } });
    } catch (err: any) {
      setLoading(false);
      console.error("Error completo:", err);

      if (err.response) {
        toast.error(err.response.data.message || "Error del servidor");
      } else {
        toast.error(err.message || "Error desconocido");
      }
    }
  };

  const inputStyle =
    "w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500";
  const buttonStyle =
    "bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200";
  const labelStyle = "block text-sm font-medium text-gray-700 mb-1";
  const errorStyle = "text-red-500 text-sm mt-1";

  return (
    <div className="flex shadow-md">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full bg-white p-6  md:rounded-l-lg md:w-1/2"
      >
        <div
          className="flex items-center cursor-pointer gap-2"
          onClick={() => navigate("/")}
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <p className="text-sm ">
            <span></span>Volver al inicio
          </p>
        </div>

        <div className="h-full flex flex-col justify-center md:w-[80%] mx-auto">
          <h2 className="text-3xl font-bold text-center text-blue-700">
            Agenda tu cita médica
          </h2>
          <p className="text-sm text-gray-600 text-center mb-4">
            Completa el formulario para agendar tu cita médica
          </p>
          <div className="flex flex-col md:flex-row gap-4 my-4">
            <div className="md:w-1/2">
              <label className={labelStyle}>Nombre</label>
              <input
                {...register("nombre", {
                  required: "El nombre es obligatorio",
                })}
                placeholder="Ingrese su nombre"
                className={inputStyle}
              />
              {errors.nombre && (
                <p className={errorStyle}>
                  {errors.nombre.message?.toString()}
                </p>
              )}
            </div>

            <div className="md:w-1/2">
              <label className={labelStyle}>Apellido</label>
              <input
                {...register("apellido", {
                  required: "El apellido es obligatorio",
                })}
                placeholder="Ingrese su apellido"
                className={inputStyle}
              />
              {errors.apellido && (
                <p className={errorStyle}>
                  {errors.apellido.message?.toString()}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 my-4">
            <div className="md:w-1/2">
              <label className={labelStyle}>Correo electrónico</label>
              <input
                {...register("correo", {
                  required: "El correo es obligatorio",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Correo electrónico inválido",
                  },
                })}
                placeholder="ejemplo@correo.com"
                type="email"
                className={inputStyle}
              />
              {errors.correo && (
                <p className={errorStyle}>
                  {errors.correo.message?.toString()}
                </p>
              )}
            </div>

            <div className="md:w-1/2">
              <label className={labelStyle}>Teléfono</label>
              <input
                {...register("telefono", {
                  required: "El teléfono es obligatorio",
                })}
                placeholder="Ej: 809-123-4567"
                className={inputStyle}
              />
              {errors.telefono && (
                <p className={errorStyle}>
                  {errors.telefono.message?.toString()}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className={labelStyle}>Doctor</label>
            <select
              {...register("doctorId", {
                required: "Debe seleccionar un doctor",
              })}
              className={inputStyle}
            >
              <option value="">Seleccione un doctor</option>
              {doctores.map((doctor) => (
                <option key={doctor._id} value={doctor._id}>
                  {doctor.nombre} {doctor.apellido} - {doctor.especialidad}
                </option>
              ))}
            </select>
            {errors.doctorId && (
              <p className={errorStyle}>
                {errors.doctorId.message?.toString()}
              </p>
            )}
          </div>
          <div className="flex flex-col md:flex-row gap-4 my-4">
            <div className="md:w-1/2">
              <label className={labelStyle}>Fecha</label>
              <input
                {...register("fecha", { required: "La fecha es obligatoria" })}
                type="date"
                className={inputStyle}
              />
              {errors.fecha && (
                <p className={errorStyle}>{errors.fecha.message?.toString()}</p>
              )}
            </div>

            <div className="md:w-1/2">
              <label className={labelStyle}>Hora</label>
              <input
                {...register("hora", { required: "La hora es obligatoria" })}
                type="time"
                className={inputStyle}
              />
              {errors.hora && (
                <p className={errorStyle}>{errors.hora.message?.toString()}</p>
              )}
            </div>
          </div>
          <button
            type="submit"
            className={`${buttonStyle} w-full mt-6`}
            disabled={loading}
          >
            {loading ? "Procesando..." : "Agendar cita"}
          </button>
        </div>
      </form>
      <div className="hidden md:block w-1/2  bg-[#01388f] overflow-hidden rounded-r-lg">
        <img
          src={twoDoctorsImage}
          alt="Doctors"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
