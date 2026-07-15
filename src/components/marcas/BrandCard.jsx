import { Link } from 'react-router-dom';
import './BrandCard.css';

export default function BrandCard({ marca }) {
  return (
    <Link to={`/marcas/${marca.key}`} className="brand-card text-decoration-none">
      <div className="card bg-black border-dark h-100 shadow-lg rounded-3 p-4 text-center">
        <div className="brand-logo-wrap mb-3">
          <img src={marca.logo} alt={marca.nombre} className="brand-logo" />
        </div>
        <h4 className="text-white fw-bold mb-2">{marca.nombre}</h4>
        <p className="text-white-50 small mb-0">{marca.descripcion}</p>
      </div>
    </Link>
  );
}