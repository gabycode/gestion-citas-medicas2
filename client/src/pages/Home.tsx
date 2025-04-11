import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/background.webp";
import doctorImage from "../assets/doctor.webp";

export default function Home() {
  const navigate = useNavigate();

  const goToAgendar = () => navigate("/agendar");
  const goToLoginDoctor = () => navigate("/login");

  return (
    <div
      className="min-h-screen font-poppins flex flex-col items-center justify-center px-4 bg-cover bg-center text-center md:flex-row md:text-left"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="w-full md:w-1/2 pl-16">
        <h1 className="text-5xl md:text-8xl font-medium mb-4">
          Tu Salud, <br />
          Nuestra Prioridad
        </h1>
        <p className="text-base mb-6 text-gray-700 md:text-lg">
          Agenda tus citas médicas de forma rápida, segura y desde cualquier
          lugar. Simplifica tu atención médica con nuestra plataforma eficiente
          y accesible.
        </p>
        <div className="space-x-4">
          <button
            onClick={goToAgendar}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition cursor-pointer"
          >
            Agendar Cita
          </button>
          <button
            onClick={goToLoginDoctor}
            className="text-blue-700 underline cursor-pointer"
          >
            Soy doctor
          </button>
        </div>
      </div>

      <div className="hidden w-full justify-center md:w-1/2 md:flex ">
        <img
          src={doctorImage}
          alt="Doctor image"
          className="h-screen object-cover w-[80vh]"
        />
      </div>
    </div>
  );
}
