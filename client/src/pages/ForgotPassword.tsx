import ForgotPasswordDoctor from "../components/Doctor/ForgotPassword";
import backgroundImage from "../assets/background.webp";

export default function ForgotPassword() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-100 px-4 bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
        <ForgotPasswordDoctor />
    </div>
  );
}
