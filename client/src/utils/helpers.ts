export const formatearFecha = (fecha: string) => {
    const date = new Date(fecha);
    return date.toLocaleString('es-DO', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  