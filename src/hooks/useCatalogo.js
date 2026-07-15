import { useState, useMemo } from 'react';
import { vehiculos } from '../data/vehiculos';

export function useCatalogo() {
  const [categoriaActiva, setCategoriaActiva] = useState('autos');
  const [busqueda, setBusqueda] = useState('');

  const vehiculosActivos = useMemo(() => {
    const lista = vehiculos[categoriaActiva] || [];
    if (!busqueda.trim()) return lista;

    const termino = busqueda.toLowerCase();
    return lista.filter((v) => v.nombre.toLowerCase().includes(termino));
  }, [categoriaActiva, busqueda]);

  return {
    categoriaActiva,
    setCategoriaActiva,
    busqueda,
    setBusqueda,
    vehiculosActivos,
  };
}