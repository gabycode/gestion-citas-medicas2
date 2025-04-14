import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginDoctor } from "../../services/doctoresService";
import { useState } from "react";

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
    "bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200 w-full";
  const labelStyle = "block text-sm font-medium text-gray-700 mb-1";
  const errorStyle = "text-red-500 text-sm mt-1";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-sm mx-auto mt-10 space-y-4 bg-white p-6 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold text-center text-blue-700 mb-4">
        Iniciar Sesión - Doctor
      </h2>

      <div>
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

      <div>
        <label className={labelStyle}>Contraseña</label>
        <input
          {...register("password", {
            required: "La contraseña es obligatoria",
          })}
          type="password"
          className={inputStyle}
        />
        {errors.password && (
          <p className={errorStyle}>{errors.password.message?.toString()}</p>
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
      <p className="text-sm text-center text-black-600  mt-2">
        ¿No tienes cuenta?{" "}
        <span
          onClick={() => navigate("/signup")}
          className="underline cursor-pointer"
        >
          Regístrate aquí
        </span>
      </p>
    </form>
  );
}
