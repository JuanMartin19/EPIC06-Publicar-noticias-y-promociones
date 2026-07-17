import { useEffect, useState } from "react";
import { getMarcas } from "../../api/vehiculosApi";
import BrandGrid from "./BrandGrid";

export default function BrandsSection() {
  const [marcas, setMarcas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let activo = true;

    getMarcas()
      .then((data) => {
        if (!activo) return;

        // Mapeamos el DTO del backend (id, nombre, logo, descripcion)
        // a lo que espera BrandCard (key, nombre, logo, descripcion)
        const marcasFormateadas = data.map((m) => ({
          key: m.id,
          nombre: m.nombre,
          logo: m.logo,
          descripcion: m.descripcion,
        }));

        setMarcas(marcasFormateadas);
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
  }, []);

  if (loading) {
    return <p className="text-white text-center py-5">Cargando marcas...</p>;
  }

  if (error) {
    return (
      <p className="text-danger text-center py-5">
        No se pudieron cargar las marcas. Intenta de nuevo más tarde.
      </p>
    );
  }

  if (marcas.length === 0) {
    return (
      <p className="text-white-50 text-center py-5">
        Aún no hay marcas registradas.
      </p>
    );
  }

  return <BrandGrid marcas={marcas} />;
}