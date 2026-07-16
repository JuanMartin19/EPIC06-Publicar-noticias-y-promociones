import { useState, useEffect, useMemo } from "react";
import comercialApi from "../api/Comercialapi";

export function useMarcaDetalle(marcaKey) {
  const [busqueda, setBusqueda] = useState("");
  const [marca, setMarca] = useState(null);
  const [vehiculos, setVehiculos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let activo = true;
    setLoading(true);
    setNotFound(false);

    comercialApi
      .get("/api/vehiculos/marcas")
      .then((res) => {
        if (!activo) return null;

        // marcaKey viene de la URL como string, el id del backend es numérico
        const encontrada = res.data.find((m) => String(m.id) === String(marcaKey));

        if (!encontrada) {
          setNotFound(true);
          setLoading(false);
          return null;
        }

        setMarca(encontrada);

        return comercialApi.get("/api/vehiculos/filtrar/marca", {
          params: { nombre: encontrada.nombre },
        });
      })
      .then((res) => {
        if (!activo || !res) return;

        const data = res.data.map((v) => ({
          id: v.id,
          nombre: v.modelo,
          imagen: v.imagenes && v.imagenes[0],
          motor: v.motor,
          transmision: v.transmision,
          rendimiento: v.rendimiento,
          precio: `$${Number(v.precio).toLocaleString()}`,
        }));

        setVehiculos(data);
      })
      .catch((err) => {
        console.error("No se pudo cargar la marca:", err);
        if (activo) setNotFound(true);
      })
      .finally(() => {
        if (activo) setLoading(false);
      });

    return () => {
      activo = false;
    };
  }, [marcaKey]);

  const vehiculosFiltrados = useMemo(() => {
    if (!busqueda.trim()) return vehiculos;
    const termino = busqueda.toLowerCase();
    return vehiculos.filter((v) => v.nombre.toLowerCase().includes(termino));
  }, [vehiculos, busqueda]);

  return { marca, busqueda, setBusqueda, vehiculosFiltrados, loading, notFound };
}