import { useEffect, useState, useMemo } from "react";
import { getCategorias, getVehiculosPorCategoria } from "../../api/vehiculosApi";
import CategoryTabs from "../../components/catalogo/CategoryTabs";
import VehicleGrid from "../../components/catalogo/VehicleGrid";

export default function Catalogo() {
  const [categorias, setCategorias] = useState([]);
  const [categoriaActiva, setCategoriaActiva] = useState(null);
  const [vehiculosCategoria, setVehiculosCategoria] = useState([]); // datos crudos del backend
  const [anioActivo, setAnioActivo] = useState("todos");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar categorías una sola vez
  useEffect(() => {
    getCategorias()
      .then((data) => {
        setCategorias(data);
        if (data.length > 0) {
          setCategoriaActiva(data[0].id);
        } else {
          setLoading(false);
        }
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  // Cada vez que cambia la categoría activa, pedir sus vehículos
  useEffect(() => {
    if (!categoriaActiva) return;

    const categoria = categorias.find((c) => c.id === categoriaActiva);
    if (!categoria) return;

    let activo = true;
    setLoading(true);

    getVehiculosPorCategoria(categoria.nombre)
      .then((data) => {
        if (!activo) return;
        setVehiculosCategoria(data);
        setAnioActivo("todos"); // al cambiar de categoría, reinicia el filtro de año
      })
      .catch((err) => {
        if (activo) setError(err);
      })
      .finally(() => {
        if (activo) setLoading(false);
      });

    return () => {
      activo = false;
    };
  }, [categoriaActiva, categorias]);

  // Años disponibles dentro de la categoría activa, para llenar el selector
  const aniosDisponibles = useMemo(() => {
    const unicos = [...new Set(vehiculosCategoria.map((v) => v.anio))];
    return unicos.sort((a, b) => b - a); // más reciente primero
  }, [vehiculosCategoria]);

  // Aplica el filtro de año (en el cliente) sobre lo que ya trajo el backend
  const vehiculos = useMemo(() => {
    const filtrados =
      anioActivo === "todos"
        ? vehiculosCategoria
        : vehiculosCategoria.filter((v) => v.anio === Number(anioActivo));

    return filtrados.map((v) => ({
      id: v.id,
      nombre: v.modelo,
      imagen: v.imagenes && v.imagenes[0],
      motor: v.motor,
      transmision: v.transmision,
      rendimiento: v.rendimiento,
      precio: `$${Number(v.precio).toLocaleString()}`,
    }));
  }, [vehiculosCategoria, anioActivo]);

  return (
    <div className="container py-5">
      <h1 className="text-center fw-bold mb-2">Catálogo</h1>
      <p className="text-center text-secondary mb-5">
        Elige una categoría para ver los vehículos disponibles
      </p>

      {categorias.length > 0 && (
        <CategoryTabs
          categorias={categorias}
          categoriaActiva={categoriaActiva}
          onChange={setCategoriaActiva}
        />
      )}

      {/* ---------- Filtro por año ---------- */}
      {aniosDisponibles.length > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <select
            className="form-select w-auto"
            value={anioActivo}
            onChange={(e) => setAnioActivo(e.target.value)}
          >
            <option value="todos">Todos los años</option>
            {aniosDisponibles.map((anio) => (
              <option key={anio} value={anio}>
                {anio}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="mt-5">
        {loading && <p className="text-center">Cargando vehículos...</p>}

        {!loading && error && (
          <p className="text-center text-danger">
            No se pudo cargar el catálogo. Intenta de nuevo más tarde.
          </p>
        )}

        {!loading && !error && vehiculos.length === 0 && (
          <p className="text-center text-secondary">
            No hay vehículos que coincidan con los filtros seleccionados.
          </p>
        )}

        {!loading && !error && vehiculos.length > 0 && (
          <VehicleGrid vehiculos={vehiculos} />
        )}
      </div>
    </div>
  );
}