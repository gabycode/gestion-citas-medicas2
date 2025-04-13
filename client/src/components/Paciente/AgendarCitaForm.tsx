import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createCita } from "../../services/citasService";
import { useState, useEffect } from "react";
import { Doctor } from "../../types";
import { getAllDoctores } from "../../services/doctoresService";

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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-lg mx-auto space-y-4"
    >
      <div>
        <label className={labelStyle}>Nombre</label>
        <input
          {...register("nombre", { required: "El nombre es obligatorio" })}
          placeholder="Ingrese su nombre"
          className={inputStyle}
        />
        {errors.nombre && (
          <p className={errorStyle}>{errors.nombre.message?.toString()}</p>
        )}
      </div>

      <div>
        <label className={labelStyle}>Apellido</label>
        <input
          {...register("apellido", { required: "El apellido es obligatorio" })}
          placeholder="Ingrese su apellido"
          className={inputStyle}
        />
        {errors.apellido && (
          <p className={errorStyle}>{errors.apellido.message?.toString()}</p>
        )}
      </div>

      <div>
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
          <p className={errorStyle}>{errors.correo.message?.toString()}</p>
        )}
      </div>

      <div>
        <label className={labelStyle}>Teléfono</label>
        <input
          {...register("telefono", { required: "El teléfono es obligatorio" })}
          placeholder="Ej: 809-123-4567"
          className={inputStyle}
        />
        {errors.telefono && (
          <p className={errorStyle}>{errors.telefono.message?.toString()}</p>
        )}
      </div>

      <div>
        <label className={labelStyle}>Doctor</label>
        <select
          {...register("doctorId", { required: "Debe seleccionar un doctor" })}
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
          <p className={errorStyle}>{errors.doctorId.message?.toString()}</p>
        )}
      </div>

      <div>
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

      <div>
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

      <button
        type="submit"
        className={`${buttonStyle} w-full mt-6`}
        disabled={loading}
      >
        {loading ? "Procesando..." : "Agendar cita"}
      </button>
    </form>
  );
}
