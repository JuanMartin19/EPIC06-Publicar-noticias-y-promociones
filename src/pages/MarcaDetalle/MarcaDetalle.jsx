import { useParams, Link, Navigate } from 'react-router-dom';
import { useMarcaDetalle } from '../../hooks/useMarcaDetalle';
import VehicleGrid from '../../components/catalogo/VehicleGrid';
import SearchBar from '../../components/shared/SearchBar';
import './MarcaDetalle.css';

export default function MarcaDetalle() {
  const { marcaKey } = useParams();
  const { marca, busqueda, setBusqueda, vehiculosFiltrados, loading, notFound } = useMarcaDetalle(marcaKey);

  if (notFound) {
    return <Navigate to="/marcas" replace />;
  }

  if (loading || !marca) {
    return <p className="text-center py-5">Cargando marca...</p>;
  }

  return (
    <div className="marca-detalle-page bg-white text-dark">

      <section className="py-5 bg-black border-bottom border-dark">
        <div className="container text-center py-3">
          <Link to="/marcas" className="btn btn-outline-light btn-sm mb-3">
            <i className="bi bi-arrow-left me-1"></i> Volver a marcas
          </Link>
          <h1 className="fw-extrabold text-white mb-2">{marca.nombre}</h1>
          <p className="text-white-50 opacity-75">{marca.descripcion}</p>
        </div>
      </section>

      <section className="py-4 bg-light border-bottom border-light sticky-top" style={{ zIndex: 10 }}>
        <div className="container">
          <SearchBar
            value={busqueda}
            onChange={setBusqueda}
            placeholder={`Buscar en ${marca.nombre}...`}
          />
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          {vehiculosFiltrados.length > 0 ? (
            <VehicleGrid vehiculos={vehiculosFiltrados} />
          ) : (
            <p className="text-center text-secondary py-5">
              No hay vehículos de {marca.nombre} que coincidan con tu búsqueda.
            </p>
          )}
        </div>
      </section>

    </div>
  );
}