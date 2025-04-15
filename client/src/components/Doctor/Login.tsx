import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginDoctor } from "../../services/doctoresService";
import { useState } from "react";
import { ArrowLeftIcon } from "lucide-react";
import doctorTablet from "../../assets/doctor-tablet.png";

export default function LoginDoctor() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const response = await loginDoctor(data);
      const token = response.data.token;
      localStorage.setItem("token", token);
      toast.success("Inicio de sesión exitoso ✅");
      navigate("/dashboard"); // Ajusta esta ruta según tu app
    } catch (err: any) {
      console.error("Error de login:", err);
      toast.error(err.response?.data?.message || "Credenciales inválidas");
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
            Ingreso de Doctores
          </h2>
          <p className="text-sm text-center text-gray-600 mb-4">
            Inicia sesión para acceder a tu panel de control
          </p>
          <div className="mb-4">
            <label className={labelStyle}>Correo electrónico</label>
            <input
              {...register("email", {
                required: "El correo es obligatorio",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Correo inválido",
                },
              })}
              type="email"
              className={inputStyle}
            />
            {errors.email && (
              <p className={errorStyle}>{errors.email.message?.toString()}</p>
            )}
          </div>
          <div className="mb-4">
            <label className={labelStyle}>Contraseña</label>
            <input
              {...register("password", {
                required: "La contraseña es obligatoria",
              })}
              type="password"
              className={inputStyle}
            />
            {errors.password && (
              <p className={errorStyle}>
                {errors.password.message?.toString()}
              </p>
            )}
            <p
              className="text-sm text-right text-blue-600 underline cursor-pointer mt-2"
              onClick={() => navigate("/forgot-password")}
            >
              ¿Olvidaste tu contraseña?
            </p>
          </div>
          <button type="submit" className={buttonStyle} disabled={loading}>
            {loading ? "Iniciando..." : "Iniciar sesión"}
          </button>
          <p className="text-sm text-center text-black-600 py-2">
            ¿No tienes cuenta?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="underline cursor-pointer"
            >
              Regístrate aquí
            </span>
          </p>
        </div>
      </form>
      <div className="hidden md:block w-1/2  bg-[#01388f] overflow-hidden rounded-r-lg">
        <img
          src={doctorTablet}
          alt="Doctors"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
