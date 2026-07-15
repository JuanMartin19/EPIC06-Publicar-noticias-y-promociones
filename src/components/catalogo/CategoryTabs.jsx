import { categorias } from '../../data/vehiculos';
import './CategoryTabs.css';

export default function CategoryTabs({ categoriaActiva, onChange }) {
  return (
    <div className="d-flex justify-content-center gap-3 flex-wrap">
      {categorias.map((cat) => (
        <button
          key={cat.key}
          onClick={() => onChange(cat.key)}
          className={`btn btn-lg fw-semibold d-flex align-items-center gap-2 category-tab ${
            categoriaActiva === cat.key ? 'btn-dark active' : 'btn-outline-dark'
          }`}
        >
          <i className={`bi ${cat.icon}`}></i>
          {cat.label}
        </button>
      ))}
    </div>
  );
}