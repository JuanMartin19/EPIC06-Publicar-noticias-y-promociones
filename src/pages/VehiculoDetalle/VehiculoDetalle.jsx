import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getVehiculoPorId } from "../../api/vehiculosApi";

export default function VehiculoDetalle() {
  const { id } = useParams();
  const [vehiculo, setVehiculo] = useState(null);
  const [imagenActiva, setImagenActiva] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Visor ampliado (lightbox)
  const [visorAbierto, setVisorAbierto] = useState(false);

  useEffect(() => {
    let activo = true;
    setLoading(true);

    getVehiculoPorId(id)
      .then((data) => {
        if (!activo) return;
        setVehiculo(data);
        setImagenActiva(0);
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
  }, [id]);

  if (loading) {
    return <p className="text-center py-5">Cargando vehículo...</p>;
  }

  if (error || !vehiculo) {
    return (
      <div className="text-center py-5">
        <p className="text-danger">No se pudo cargar este vehículo.</p>
        <Link to="/catalogo" className="btn btn-outline-dark mt-2">
          Volver al catálogo
        </Link>
      </div>
    );
  }

  const imagenes = vehiculo.imagenes && vehiculo.imagenes.length > 0 ? vehiculo.imagenes : [];

  function imagenAnterior() {
    setImagenActiva((prev) => (prev - 1 + imagenes.length) % imagenes.length);
  }

  function imagenSiguiente() {
    setImagenActiva((prev) => (prev + 1) % imagenes.length);
  }

  const ficha = [
    { label: "Motor", valor: vehiculo.motor, icon: "bi-cpu" },
    { label: "Transmisión", valor: vehiculo.transmision, icon: "bi-gear" },
    { label: "Tipo de combustible", valor: vehiculo.tipoCombustible, icon: "bi-fuel-pump" },
    { label: "Potencia", valor: vehiculo.potencia, icon: "bi-lightning-charge" },
    { label: "Torque", valor: vehiculo.torque, icon: "bi-arrow-repeat" },
    { label: "Rendimiento", valor: vehiculo.rendimiento, icon: "bi-speedometer2" },
    { label: "Tracción", valor: vehiculo.traccion, icon: "bi-signpost-split" },
    { label: "Velocidad máxima", valor: vehiculo.velocidadMaxima, icon: "bi-speedometer" },
    { label: "Aceleración 0-100", valor: vehiculo.aceleracion, icon: "bi-stopwatch" },
    { label: "Capacidad de pasajeros", valor: vehiculo.capacidadPasajeros, icon: "bi-people" },
  ].filter((item) => item.valor !== null && item.valor !== undefined && item.valor !== "");

  return (
    <div className="container py-5">
      <Link to="/catalogo" className="btn btn-link text-decoration-none mb-4 ps-0">
        <i className="bi bi-arrow-left me-1"></i> Volver al catálogo
      </Link>

      <div className="row g-5">
        {/* ---------- Galería de imágenes ---------- */}
        <div className="col-12 col-lg-6">
          <div
            className="ratio ratio-4x3 bg-black rounded-3 overflow-hidden mb-3"
            style={{ cursor: imagenes.length > 0 ? "zoom-in" : "default" }}
            onClick={() => imagenes.length > 0 && setVisorAbierto(true)}
          >
            {imagenes.length > 0 ? (
              <img
                src={imagenes[imagenActiva]}
                alt={vehiculo.modelo}
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
              />
            ) : (
              <div className="d-flex align-items-center justify-content-center text-white-50">
                Sin imágenes disponibles
              </div>
            )}
          </div>

          {imagenes.length > 1 && (
            <div className="d-flex gap-2 flex-wrap">
              {imagenes.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt={`${vehiculo.modelo} ${i + 1}`}
                  onClick={() => setImagenActiva(i)}
                  className={`rounded-2 ${i === imagenActiva ? "border border-dark border-3" : "border"}`}
                  style={{ width: 70, height: 70, objectFit: "cover", cursor: "pointer" }}
                />
              ))}
            </div>
          )}
        </div>

        {/* ---------- Info y ficha técnica ---------- */}
        <div className="col-12 col-lg-6">
          <p className="text-uppercase text-secondary small mb-1">{vehiculo.marcaNombre}</p>
          <h1 className="fw-bold mb-2">{vehiculo.modelo} <span className="text-secondary fs-4">{vehiculo.anio}</span></h1>

          {vehiculo.promocionId ? (
            <div className="mb-3">
              <span className="badge bg-danger mb-2">
                <i className="bi bi-tag-fill me-1"></i>Promoción
              </span>
              <div className="text-secondary text-decoration-line-through">
                ${Number(vehiculo.precio).toLocaleString()}
              </div>
              <p className="fs-3 fw-bold text-danger mb-0">
                ${Number(vehiculo.precioFinal).toLocaleString()}
              </p>
            </div>
          ) : (
            <p className="fs-3 fw-bold text-danger mb-3">
              ${Number(vehiculo.precio).toLocaleString()}
            </p>
          )}

          <span className={`badge ${vehiculo.disponible ? "bg-success" : "bg-secondary"} mb-3`}>
            {vehiculo.disponible ? "Disponible" : "No disponible"}
          </span>

          {vehiculo.descripcion && (
            <p className="text-secondary mb-4">{vehiculo.descripcion}</p>
          )}

          <h5 className="fw-bold mb-3">Ficha técnica</h5>
          <div className="border rounded-3 p-3">
            {ficha.map((item) => (
              <div
                key={item.label}
                className="d-flex justify-content-between align-items-center py-2 border-bottom"
              >
                <span className="text-secondary">
                  <i className={`bi ${item.icon} me-2`}></i>
                  {item.label}
                </span>
                <span className="fw-semibold">{item.valor}</span>
              </div>
            ))}
            {ficha.length === 0 && (
              <p className="text-secondary mb-0">Sin datos técnicos registrados.</p>
            )}
          </div>

          <button className="btn btn-dark btn-lg mt-4 w-100">
            Solicitar cotización
          </button>
        </div>
      </div>

      {/* ---------- Visor ampliado (lightbox) ---------- */}
      {visorAbierto && (
        <div
          onClick={() => setVisorAbierto(false)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1050,
          }}
        >
          {/* Botón cerrar */}
          <button
            onClick={() => setVisorAbierto(false)}
            className="btn btn-light btn-sm"
            style={{ position: "absolute", top: 20, right: 20 }}
          >
            <i className="bi bi-x-lg"></i> Cerrar
          </button>

          {/* Título + contador */}
          <div className="text-white text-center" style={{ position: "absolute", top: 20, left: 20 }}>
            <div className="fw-bold">{vehiculo.modelo}</div>
            {imagenes.length > 1 && (
              <div className="small text-white-50">
                {imagenActiva + 1} / {imagenes.length}
              </div>
            )}
          </div>

          {/* Flecha izquierda */}
          {imagenes.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                imagenAnterior();
              }}
              className="btn btn-light rounded-circle"
              style={{ position: "absolute", left: 20, width: 48, height: 48 }}
            >
              <i className="bi bi-chevron-left"></i>
            </button>
          )}

          {/* Imagen ampliada */}
          <img
            src={imagenes[imagenActiva]}
            alt={vehiculo.modelo}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "85vw",
              maxHeight: "85vh",
              objectFit: "contain",
              borderRadius: 8,
            }}
          />

          {/* Flecha derecha */}
          {imagenes.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                imagenSiguiente();
              }}
              className="btn btn-light rounded-circle"
              style={{ position: "absolute", right: 20, width: 48, height: 48 }}
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          )}
        </div>
      )}
    </div>
  );
}