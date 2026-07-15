import HelpCard from './HelpCard';

const opciones = [
  {
    icono: 'bi-chat-dots-fill',
    titulo: 'Contactar a un asesor',
    descripcion: 'Escríbenos directamente y un asesor te responderá tus dudas sobre vehículos, servicios o cotizaciones.',
    to: '/contacto',
    colorClase: 'text-danger',
  },
  {
    icono: 'bi-question-circle-fill',
    titulo: 'Preguntas frecuentes',
    descripcion: 'Revisa las respuestas a las dudas más comunes sobre citas, garantías y formas de pago.',
    to: '/preguntas-frecuentes',
    colorClase: 'text-info',
  },
  {
    icono: 'bi-car-front-fill',
    titulo: 'Explorar el catálogo',
    descripcion: 'Consulta los vehículos disponibles por tipo o por marca antes de agendar tu visita.',
    to: '/catalogo',
    colorClase: 'text-success',
  },
];

export default function HelpGrid() {
  return (
    <div className="row g-4">
      {opciones.map((op, index) => (
        <HelpCard key={index} {...op} />
      ))}
    </div>
  );
}