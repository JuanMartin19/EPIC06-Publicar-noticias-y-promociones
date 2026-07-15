import { useState, useMemo } from 'react';
import { getTodosLosVehiculos, marcas } from '../data/vehiculos';

export function useMarcaDetalle(marcaKey) {
  const [busqueda, setBusqueda] = useState('');

  const marca = useMemo(
    () => marcas.find((m) => m.key === marcaKey),
    [marcaKey]
  );

  const vehiculosFiltrados = useMemo(() => {
    const todos = getTodosLosVehiculos().filter((v) => v.marca === marcaKey);
    if (!busqueda.trim()) return todos;

    const termino = busqueda.toLowerCase();
    return todos.filter((v) => v.nombre.toLowerCase().includes(termino));
  }, [marcaKey, busqueda]);

  return { marca, busqueda, setBusqueda, vehiculosFiltrados };
}