import './VehicleCard.css';

export default function VehicleCard({ vehiculo }) {
  const { nombre, imagen, motor, transmision, rendimiento, precio } = vehiculo;

  return (
    <div className="card bg-black border-dark h-100 shadow-lg overflow-hidden rounded-3 vehicle-card">
      <img
        src={imagen}
        className="card-img-top"
        alt={nombre}
        style={{ height: '200px', objectFit: 'cover', filter: 'brightness(85%)' }}
      />
      <div className="card-body p-4 text-white">
        <h4 className="card-title fw-bold mb-3">{nombre}</h4>

        <div className="spec-sheet mb-3">
          <div className="spec-row">
            <span className="text-white-50 small"><i className="bi bi-cpu me-2"></i>Motor</span>
            <span className="small fw-semibold">{motor}</span>
          </div>
          <div className="spec-row">
            <span className="text-white-50 small"><i className="bi bi-gear me-2"></i>Transmisión</span>
            <span className="small fw-semibold">{transmision}</span>
          </div>
          <div className="spec-row">
            <span className="text-white-50 small"><i className="bi bi-speedometer2 me-2"></i>Rendimiento</span>
            <span className="small fw-semibold">{rendimiento}</span>
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center border-top border-secondary pt-3">
          <span className="fw-bold text-danger fs-5">{precio}</span>
          <button className="btn btn-outline-light btn-sm fw-semibold">
            Cotizar <i className="bi bi-chevron-right small ms-1"></i>
          </button>
        </div>
      </div>
    </div>
  );
}