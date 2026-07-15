import { Link } from 'react-router-dom';
import './HelpCard.css';

export default function HelpCard({ icono, titulo, descripcion, to, colorClase = 'text-danger' }) {
  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div className="card bg-black border-dark h-100 shadow-lg rounded-3 p-4 help-card">
        <div className={`d-flex align-items-center gap-2 mb-3 ${colorClase}`}>
          <i className={`bi ${icono} fs-3`}></i>
        </div>
        <h4 className="text-white fw-bold mb-2">{titulo}</h4>
        <p className="text-white-50 small flex-grow-1">{descripcion}</p>
        <Link to={to} className="btn btn-outline-light btn-sm w-100 mt-3 fw-semibold">
          Ir <i className="bi bi-chevron-right small ms-1"></i>
        </Link>
      </div>
    </div>
  );
}