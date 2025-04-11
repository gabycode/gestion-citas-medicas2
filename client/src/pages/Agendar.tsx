import AgendarCitaForm from "../components/Paciente/AgendarCitaForm";
import backgroundImage from "../assets/background.webp";

export default function Agendar() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-100 px-4 bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold mb-6 text-center text-blue-700">
          Agenda tu Cita Médica
        </h2>
        <AgendarCitaForm />
      </div>
    </div>
  );
}
