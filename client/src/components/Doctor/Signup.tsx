import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerDoctor } from "../../services/doctoresService";
import { useState } from "react";
import doctorLookingRight from "../../assets/doctor-looking-right.png";
import { ArrowLeftIcon } from "lucide-react";

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
    "bg-blue-600 text-white px-4 py-2 my-4 rounded hover:bg-blue-700 transition duration-200 w-full";
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
          <p className="text-sm ">Volver al inicio</p>
        </div>
        <div className="h-full flex flex-col justify-center md:w-[80%] mx-auto">
          <h2 className="text-3xl font-bold text-center text-blue-700">
            Registro de Doctor
          </h2>
          <p className="text-sm text-gray-600 text-center mb-4">
            Crea tu cuenta para comenzar a gestionar tus citas médicas
          </p>

          <div className="flex flex-col md:flex-row gap-4 my-4">
            <div className="md:w-1/2">
              <label className={labelStyle}>Nombre</label>
              <input
                {...register("nombre", { required: "Nombre requerido" })}
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
                {...register("apellido", { required: "Apellido requerido" })}
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
              <label className={labelStyle}>Especialidad</label>
              <select
                {...register("especialidad", {
                  required: "Especialidad requerida",
                })}
                className={inputStyle}
              >
                <option value="">Seleccione una especialidad</option>
                {especialidades.map((esp) => (
                  <option key={esp} value={esp}>
                    {esp}
                  </option>
                ))}
              </select>
              {errors.especialidad && (
                <p className={errorStyle}>
                  {errors.especialidad.message?.toString()}
                </p>
              )}
            </div>

            <div className="md:w-1/2">
              <label className={labelStyle}>Teléfono</label>
              <input
                {...register("telefono", { required: "Teléfono requerido" })}
                className={inputStyle}
              />
              {errors.telefono && (
                <p className={errorStyle}>
                  {errors.telefono.message?.toString()}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 my-4">
            <div className="md:w-1/2">
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
              {errors.email && (
                <p className={errorStyle}>{errors.email.message?.toString()}</p>
              )}
            </div>

            <div className="md:w-1/2">
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
              {errors.password && (
                <p className={errorStyle}>
                  {errors.password.message?.toString()}
                </p>
              )}
            </div>
          </div>

          <button type="submit" className={buttonStyle} disabled={loading}>
            {loading ? "Registrando..." : "Registrarse"}
          </button>
          <p className="text-sm text-center text-black-600 py-2">
            ¿Ya tienes una cuenta?{" "}
            <span
              onClick={() => navigate("/login")}
              className="underline cursor-pointer"
            >
              Inicia sesión
            </span>
          </p>
        </div>
      </form>
      <div className="hidden md:block w-1/2  bg-[#01388f] overflow-hidden rounded-r-lg">
        <img
          src={doctorLookingRight}
          alt="Doctors"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
