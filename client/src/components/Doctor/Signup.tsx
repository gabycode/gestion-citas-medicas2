import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerDoctor } from "../../services/doctoresService";
import { useState } from "react";

export default function SignupDoctor() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const especialidades = [
    "Medicina General",
    "Pediatría",
    "Ginecología",
    "Cardiología",
    "Dermatología",
    "Neurología",
    "Traumatología",
    "Psiquiatría",
    "Endocrinología",
    "Oftalmología",
    "Otorrinolaringología",
    "Urología",
    "Reumatología",
    "Gastroenterología",
    "Neumología",
  ];

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      await registerDoctor(data);
      toast.success("Registro exitoso. Ahora puedes iniciar sesión ✅");
      navigate("/login");
    } catch (err: any) {
      console.error("Error en el registro:", err);
      toast.error(err.response?.data?.message || "Error al registrar");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle =
    "w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500";
  const buttonStyle =
    "bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200 w-full";
  const labelStyle = "block text-sm font-medium text-gray-700 mb-1";
  const errorStyle = "text-red-500 text-sm mt-1";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full space-y-8 bg-white p-10 rounded-lg shadow-xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <h2 className="text-3xl font-bold text-center text-blue-700">
            Registro de Doctor
          </h2>

          <div>
            <label className={labelStyle}>Nombre</label>
            <input {...register("nombre", { required: "Nombre requerido" })} className={inputStyle} />
            {errors.nombre && <p className={errorStyle}>{errors.nombre.message?.toString()}</p>}
          </div>

          <div>
            <label className={labelStyle}>Apellido</label>
            <input {...register("apellido", { required: "Apellido requerido" })} className={inputStyle} />
            {errors.apellido && <p className={errorStyle}>{errors.apellido.message?.toString()}</p>}
          </div>

          <div>
            <label className={labelStyle}>Especialidad</label>
            <select {...register("especialidad", { required: "Especialidad requerida" })} className={inputStyle}>
              <option value="">Seleccione una especialidad</option>
              {especialidades.map((esp) => (
                <option key={esp} value={esp}>{esp}</option>
              ))}
            </select>
            {errors.especialidad && <p className={errorStyle}>{errors.especialidad.message?.toString()}</p>}
          </div>

          <div>
            <label className={labelStyle}>Teléfono</label>
            <input {...register("telefono", { required: "Teléfono requerido" })} className={inputStyle} />
            {errors.telefono && <p className={errorStyle}>{errors.telefono.message?.toString()}</p>}
          </div>

          <div>
            <label className={labelStyle}>Correo electrónico</label>
            <input
              {...register("email", {
                required: "Correo requerido",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Correo inválido",
                },
              })}
              className={inputStyle}
              type="email"
            />
            {errors.email && <p className={errorStyle}>{errors.email.message?.toString()}</p>}
          </div>

          <div>
            <label className={labelStyle}>Contraseña</label>
            <input
              {...register("password", {
                required: "Contraseña requerida",
                minLength: {
                  value: 6,
                  message: "Mínimo 6 caracteres",
                },
              })}
              type="password"
              className={inputStyle}
            />
            {errors.password && <p className={errorStyle}>{errors.password.message?.toString()}</p>}
          </div>

          <button type="submit" className={buttonStyle} disabled={loading}>
            {loading ? "Registrando..." : "Registrarse"}
          </button>
        </form>
      </div>
    </div>
  );
}