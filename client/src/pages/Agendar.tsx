import AgendarCitaForm from "../components/Paciente/AgendarCitaForm";
import backgroundImage from "../assets/background.webp";

export default function Agendar() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-100 px-4 bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <AgendarCitaForm />
    </div>
  );
}
