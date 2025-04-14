import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { resetPassword } from "../../services/doctoresService";
import { useState } from "react";

export default function ResetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { state } = useLocation();
  const email = state?.email || "";
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      await resetPassword({
        email,
        otp: data.otp,
        newPassword: data.newPassword,
      });
      toast.success("Contraseña restablecida con éxito ✅");
      navigate("/login");
    } catch (err: any) {
      console.error("Error al restablecer contraseña:", err);
      toast.error(err.response?.data?.message || "Error al restablecer contraseña");
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
            Ingresar Código OTP
          </h2>

          <div>
            <label className={labelStyle}>Código OTP</label>
            <input
              {...register("otp", {
                required: "El código es obligatorio",
                minLength: { value: 6, message: "Debe tener 6 dígitos" },
              })}
              type="text"
              className={inputStyle}
            />
            {errors.otp && (
              <p className={errorStyle}>{errors.otp.message?.toString()}</p>
            )}
          </div>

          <div>
            <label className={labelStyle}>Nueva contraseña</label>
            <input
              {...register("newPassword", {
                required: "La nueva contraseña es obligatoria",
                minLength: { value: 6, message: "Debe tener al menos 6 caracteres" },
              })}
              type="password"
              className={inputStyle}
            />
            {errors.newPassword && (
              <p className={errorStyle}>{errors.newPassword.message?.toString()}</p>
            )}
          </div>

          <button type="submit" className={buttonStyle} disabled={loading}>
            {loading ? "Procesando..." : "Restablecer contraseña"}
          </button>
        </form>
      </div>
    </div>
  );
}
