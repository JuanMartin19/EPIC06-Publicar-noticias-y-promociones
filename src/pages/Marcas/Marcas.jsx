import { useEffect, useState } from "react";
import { getMarcas } from "../../api/vehiculosApi";
import BrandGrid from "../../components/marcas/BrandGrid";
import "./Marcas.css";

export default function Marcas() {
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

  return (
    <div className="marcas-page bg-white text-dark">
      <section className="py-5 border-bottom border-light">
        <div className="container text-center py-3">
          <h1 className="fw-extrabold text-black mb-2">Nuestras Marcas</h1>
          <p className="text-secondary opacity-75">
            Trabajamos con las marcas más confiables del mercado
          </p>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          {loading && (
            <p className="text-center text-secondary">Cargando marcas...</p>
          )}

          {!loading && error && (
            <p className="text-center text-danger">
              No se pudieron cargar las marcas. Intenta de nuevo más tarde.
            </p>
          )}

          {!loading && !error && marcas.length === 0 && (
            <p className="text-center text-secondary">
              Aún no hay marcas registradas.
            </p>
          )}

          {!loading && !error && marcas.length > 0 && (
            <BrandGrid marcas={marcas} />
          )}
        </div>
      </section>
    </div>
  );
}