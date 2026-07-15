import './SearchBar.css';

export default function SearchBar({ value, onChange, placeholder = 'Buscar...' }) {
  return (
    <div className="search-bar">
      <i className="bi bi-search search-icon"></i>
      <input
        type="text"
        className="form-control search-input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button className="search-clear" onClick={() => onChange('')} aria-label="Limpiar búsqueda">
          <i className="bi bi-x-circle-fill"></i>
        </button>
      )}
    </div>
  );
}