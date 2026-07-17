import { useEffect } from 'react';
import './Toast.css';

export default function Toast({ mensaje, tipo = 'exito', onClose, duracion = 4000 }) {
  useEffect(() => {
    const timer = setTimeout(onClose, duracion);
    return () => clearTimeout(timer);
  }, [onClose, duracion]);

  const icono = tipo === 'exito' ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill';

  return (
    <div className={`app-toast app-toast-${tipo}`}>
      <i className={`bi ${icono} me-2`}></i>
      <span>{mensaje}</span>
      <button className="app-toast-close" onClick={onClose} aria-label="Cerrar">
        <i className="bi bi-x"></i>
      </button>
    </div>
  );
}