export const formatearFecha = (fecha: string | Date) => {
  const date = new Date(fecha);
  return date.toLocaleDateString("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC"
  });
};
