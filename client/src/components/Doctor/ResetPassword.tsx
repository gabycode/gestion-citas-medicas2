import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { resetPassword } from "../../services/doctoresService";
import { useState } from "react";
import { ArrowLeftIcon } from "lucide-react";
import otpPasswordImage from "../../assets/otp-password.jpg";

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
      toast.error(
        err.response?.data?.message || "Error al restablecer contraseña"
      );
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
    <div className="flex shadow-md">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto  space-y-4 bg-white p-6 rounded-lg shadow-md"
      >
        <div
          className="flex items-center cursor-pointer gap-2"
          onClick={() => navigate("/")}
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <p className="text-sm ">Volver al inicio</p>
        </div>

        <div className="flex flex-col items-center p-6">
          <img
            src={otpPasswordImage}
            alt="Forgot Password"
            className="w-full h-full object-cover rounded-lg mb-4"
          />
          <h2 className="text-3xl font-bold text-center text-blue-700 mb-2">
            Ingresar Código OTP
          </h2>
          <p className="text-sm text-center text-gray-600 mb-4">
            Ingresa el código OTP enviado a tu correo electrónico para
            restablecer tu contraseña.
          </p>

          <div className="mb-4 w-full">
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

          <div className="mb-4 w-full">
            <label className={labelStyle}>Nueva contraseña</label>
            <input
              {...register("newPassword", {
                required: "La nueva contraseña es obligatoria",
                minLength: {
                  value: 6,
                  message: "Debe tener al menos 6 caracteres",
                },
              })}
              type="password"
              className={inputStyle}
            />
            {errors.newPassword && (
              <p className={errorStyle}>
                {errors.newPassword.message?.toString()}
              </p>
            )}
          </div>

          <button type="submit" className={buttonStyle} disabled={loading}>
            {loading ? "Procesando..." : "Restablecer contraseña"}
          </button>
        </div>
      </form>
    </div>
  );
}
