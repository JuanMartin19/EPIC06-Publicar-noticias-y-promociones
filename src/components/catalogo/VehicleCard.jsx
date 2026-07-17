import { Link, useNavigate } from "react-router-dom";
import "./VehicleCard.css";

export default function VehicleCard({ vehiculo }) {
  const {
    id,
    nombre,
    imagen,
    motor,
    transmision,
    rendimiento,
    precio,
    enPromocion,
    precioPromocion,
  } = vehiculo;

  const navigate = useNavigate();

  const handleCotizar = () => {
    navigate("/catalogo/cotizar", { state: { vehiculoId: id } });
  };

  return (
    <div className="card bg-black border-dark h-100 shadow-lg overflow-hidden rounded-3 vehicle-card position-relative">
      {enPromocion && (
        <span
          className="badge bg-danger position-absolute"
          style={{ top: 12, left: 12, zIndex: 2 }}
        >
          <i className="bi bi-tag-fill me-1"></i>Promoción
        </span>
      )}

      <Link to={`/vehiculos/${id}`}>
        <img
          src={imagen}
          className="card-img-top"
          alt={nombre}
          style={{ height: "200px", objectFit: "cover", filter: "brightness(85%)" }}
        />
      </Link>

      <div className="card-body p-4 text-white">
        <Link to={`/vehiculos/${id}`} className="text-decoration-none text-white">
          <h4 className="card-title fw-bold mb-3">{nombre}</h4>
        </Link>

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
          <div>
            {enPromocion ? (
              <>
                <div className="text-white-50 small text-decoration-line-through">{precio}</div>
                <span className="fw-bold text-danger fs-5">{precioPromocion}</span>
              </>
            ) : (
              <span className="fw-bold text-danger fs-5">{precio}</span>
            )}
          </div>

          <div className="d-flex gap-2">
            <button className="btn btn-outline-light btn-sm fw-semibold" onClick={handleCotizar}>
              Cotizar
            </button>
            <Link
              to={`/vehiculos/${id}`}
              className="btn btn-outline-light btn-sm fw-semibold text-decoration-none"
            >
              Ver ficha <i className="bi bi-chevron-right small ms-1"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}