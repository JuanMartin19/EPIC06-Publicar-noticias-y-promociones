import ServicioCard from './ServicioCard';

export default function ServicioGrid({ servicios }) {
  return (
    <div className="row g-4">
      {servicios.map((s, index) => (
        <div className="col-12 col-md-6 col-lg-4" key={s.id || index}>
          <ServicioCard servicio={s} />
        </div>
      ))}
    </div>
  );
}