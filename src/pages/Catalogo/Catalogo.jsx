import { useCatalogo } from '../../hooks/useCatalogo';
import CategoryTabs from '../../components/catalogo/CategoryTabs';
import VehicleGrid from '../../components/catalogo/VehicleGrid';
import SearchBar from '../../components/shared/SearchBar';
import './Catalogo.css';

export default function Catalogo() {
  const { categoriaActiva, setCategoriaActiva, busqueda, setBusqueda, vehiculosActivos } = useCatalogo();

  return (
    <div className="catalogo-page bg-white text-dark">

      <section className="py-5 border-bottom border-light">
        <div className="container text-center py-3">
          <h1 className="fw-extrabold text-black mb-2">Nuestro Catálogo</h1>
          <p className="text-secondary opacity-75">
            Explora los vehículos disponibles por categoría
          </p>
        </div>
      </section>

      <section className="py-4 bg-light border-bottom border-light sticky-top" style={{ zIndex: 10 }}>
        <div className="container d-flex flex-column gap-3">
          <CategoryTabs categoriaActiva={categoriaActiva} onChange={setCategoriaActiva} />
          <SearchBar value={busqueda} onChange={setBusqueda} placeholder="Buscar por nombre..." />
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          {vehiculosActivos.length > 0 ? (
            <VehicleGrid vehiculos={vehiculosActivos} />
          ) : (
            <p className="text-center text-secondary py-5">
              No se encontraron vehículos con ese nombre.
            </p>
          )}
        </div>
      </section>

    </div>
  );
}