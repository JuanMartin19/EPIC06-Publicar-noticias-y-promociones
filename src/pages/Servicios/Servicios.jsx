import { useEffect, useState } from 'react';
import { getServicios } from '../../services/servicios';
import ServicioGrid from '../../components/servicios/ServicioGrid';
import SearchBar from '../../components/shared/SearchBar';

export default function Servicios() {
  const [servicios, setServicios] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarData = async () => {
      try {
        const data = await getServicios();
        setServicios(data);
      } catch (error) {
        console.error("Error al obtener servicios:", error);
      } finally {
        setCargando(false);
      }
    };
    cargarData();
  }, []);

  // Filtrado dinámico por el nombre del servicio basándonos en la SearchBar
  const serviciosFiltrados = servicios.filter(srv =>
    srv.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  if (cargando) {
    return <div className="text-center py-5">Cargando catálogo de servicios...</div>;
  }

  return (
    <div className="servicios-page bg-white text-dark">
      
      {/* Encabezado igual al de autos */}
      <section className="py-5 border-bottom border-light">
        <div className="container text-center py-3">
          <h1 className="fw-extrabold text-black mb-2">Nuestros Servicios</h1>
          <p className="text-secondary opacity-75">
            Explora los servicios automotrices que ofrecemos para tu vehículo
          </p>
        </div>
      </section>

      {/* Barra de búsqueda fija */}
      <section className="py-4 bg-light border-bottom border-light sticky-top" style={{ zIndex: 10 }}>
        <div className="container d-flex flex-column gap-3">
          <SearchBar value={busqueda} onChange={setBusqueda} placeholder="Buscar servicio..." />
        </div>
      </section>

      {/* Grid de Servicios */}
      <section className="py-5">
        <div className="container">
          {serviciosFiltrados.length > 0 ? (
            <ServicioGrid servicios={serviciosFiltrados} />
          ) : (
            <p className="text-center text-secondary py-5">
              No se encontraron servicios con ese nombre.
            </p>
          )}
        </div>
      </section>

    </div>
  );
}