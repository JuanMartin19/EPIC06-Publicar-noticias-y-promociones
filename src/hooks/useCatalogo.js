import { useState, useEffect, useMemo } from 'react';
import { getVehiculos, getCategorias } from '../services/vehiculos';

export function useCatalogo() {
  const [vehiculos, setVehiculos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaActiva, setCategoriaActiva] = useState('todos');
  const [busqueda, setBusqueda] = useState('');
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarData = async () => {
      try {
        const [vehiculosData, categoriasData] = await Promise.all([
          getVehiculos(),
          getCategorias(),
        ]);
        setVehiculos(vehiculosData);
        setCategorias(categoriasData);
      } catch (error) {
        console.error("Error al obtener el catálogo de vehículos:", error);
      } finally {
        setCargando(false);
      }
    };
    cargarData();
  }, []);

  const vehiculosActivos = useMemo(() => {
    let lista = vehiculos;

    if (categoriaActiva !== 'todos') {
      lista = lista.filter((v) => v.categoriaNombre?.toLowerCase() === categoriaActiva.toLowerCase());
    }

    if (busqueda.trim()) {
      const termino = busqueda.toLowerCase();
      lista = lista.filter((v) =>
        `${v.marcaNombre} ${v.modelo}`.toLowerCase().includes(termino)
      );
    }

    return lista;
  }, [vehiculos, categoriaActiva, busqueda]);

  return {
    categorias,
    categoriaActiva,
    setCategoriaActiva,
    busqueda,
    setBusqueda,
    vehiculosActivos,
    cargando,
  };
}
