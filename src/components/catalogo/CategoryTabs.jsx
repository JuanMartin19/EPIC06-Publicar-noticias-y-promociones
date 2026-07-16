import "./CategoryTabs.css";

const ICONOS = {
  suv: "bi-truck",
  sedan: "bi-car-front",
  pickup: "bi-truck-flatbed",
  hatchback: "bi-car-front-fill",
  deportivo: "bi-lightning-charge",
};

function obtenerIcono(nombre) {
  const clave = (nombre || "").toLowerCase();
  return ICONOS[clave] || "bi-car-front";
}

export default function CategoryTabs({ categorias, categoriaActiva, onChange }) {
  return (
    <div className="d-flex justify-content-center gap-3 flex-wrap">
      {categorias.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onChange(cat.id)}
          className={`btn btn-lg fw-semibold d-flex align-items-center gap-2 category-tab ${
            categoriaActiva === cat.id ? "btn-dark active" : "btn-outline-dark"
          }`}
        >
          <i className={`bi ${obtenerIcono(cat.nombre)}`}></i>
          {cat.nombre}
        </button>
      ))}
    </div>
  );
}