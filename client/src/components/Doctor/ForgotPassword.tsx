import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { sendOtp } from "../../services/doctoresService";
import { useState } from "react";

export default function ForgotPassword() {
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
      await sendOtp(data.email);
      toast.success("Se ha enviado el código OTP al correo electrónico 📩");
      navigate("/reset-password", { state: { email: data.email } });
    } catch (err: any) {
      console.error("Error al enviar OTP:", err);
      toast.error(err.response?.data?.message || "Error al enviar el código OTP");
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
        Recuperar Contraseña
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

      <button type="submit" className={buttonStyle} disabled={loading}>
        {loading ? "Enviando..." : "Enviar código OTP"}
      </button>
    </form>
  );
}
