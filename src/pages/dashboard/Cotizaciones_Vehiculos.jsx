import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { getCotizacionesVehiculosAdmin, cambiarEstadoCotizacionVehiculo } from '../../services/vehiculos';

export default function Cotizaciones_Vehiculos() {
  const [cotizaciones, setCotizaciones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [filtroNombre, setFiltroNombre] = useState('');

  const cargarCotizaciones = async () => {
    try {
      const data = await getCotizacionesVehiculosAdmin();
      setCotizaciones(data);
    } catch (error) {
      console.error("Error al cargar las cotizaciones de vehículos:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error de Permisos o Red',
        text: 'No se pudieron recuperar las cotizaciones. Tu sesión pudo haber expirado.',
        confirmButtonColor: '#dc3545'
      });
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarCotizaciones();
  }, []);

  const handleCambioEstado = async (id, estadoActual, nuevoEstado) => {
    if (estadoActual === nuevoEstado) return;

    Swal.fire({
      title: '¿Actualizar estado?',
      text: `¿Estás seguro de cambiar el estado de la cotización a ${nuevoEstado}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#0d6efd',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sí, cambiar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await cambiarEstadoCotizacionVehiculo(id, nuevoEstado);
          Swal.fire({
            icon: 'success',
            title: '¡Actualizado!',
            text: 'El estado de la cotización se ha modificado correctamente.',
            timer: 1500,
            showConfirmButton: false
          });
          cargarCotizaciones();
        } catch (error) {
          console.error("Error al actualizar estado con Axios:", error);
          Swal.fire({
            icon: 'error',
            title: 'Error al actualizar',
            text: 'No tienes los permisos necesarios o el servidor rechazó el cambio.',
            confirmButtonColor: '#dc3545'
          });
          cargarCotizaciones();
        }
      } else {
        cargarCotizaciones();
      }
    });
  };

  const cotizacionesFiltradas = cotizaciones.filter(c =>
    c.nombreCliente.toLowerCase().includes(filtroNombre.toLowerCase()) ||
    `${c.vehiculoMarca} ${c.vehiculoModelo}`.toLowerCase().includes(filtroNombre.toLowerCase())
  );

  if (cargando) {
    return <div className="text-center py-5 text-secondary">Cargando cotizaciones...</div>;
  }

  return (
    <div className="cotizaciones-admin-container p-4 bg-white text-dark" style={{ fontFamily: 'Segoe UI, sans-serif' }}>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="text-black mb-1 fw-bold fs-3">Cotizaciones de Vehículos</h1>
          <p className="text-secondary small m-0">Solicitudes de cotización recibidas desde el catálogo de autos</p>
        </div>
        <button className="btn btn-sm btn-outline-dark fw-semibold" onClick={cargarCotizaciones}>
          <i className="bi bi-arrow-clockwise me-1"></i> Actualizar
        </button>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-6 col-md-4">
          <div className="card bg-light border-light shadow-sm p-3 rounded-3 text-center">
            <span className="small text-secondary fw-semibold text-uppercase">Total Recibidas</span>
            <h3 className="fw-bold text-black m-0 mt-1">{cotizaciones.length}</h3>
          </div>
        </div>
        <div className="col-6 col-md-4">
          <div className="card bg-light border-light shadow-sm p-3 rounded-3 text-center">
            <span className="small text-secondary fw-semibold text-uppercase">Pendientes</span>
            <h3 className="fw-bold text-warning m-0 mt-1">
              {cotizaciones.filter(c => c.estado === 'PENDIENTE' || !c.estado).length}
            </h3>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="card bg-light border-light shadow-sm p-3 rounded-3 text-center">
            <span className="small text-secondary fw-semibold text-uppercase">Contactados</span>
            <h3 className="fw-bold text-success m-0 mt-1">
              {cotizaciones.filter(c => c.estado === 'CONTACTADO').length}
            </h3>
          </div>
        </div>
      </div>

      <div className="mb-4 bg-light p-3 rounded-3 border border-light">
        <div className="input-group">
          <span className="input-group-text bg-white border-end-0 text-secondary"><i className="bi bi-search"></i></span>
          <input
            type="text"
            className="form-control border-start-0"
            placeholder="Buscar por nombre del cliente o vehículo..."
            value={filtroNombre}
            onChange={(e) => setFiltroNombre(e.target.value)}
          />
        </div>
      </div>

      <div className="card bg-black border-dark shadow-lg rounded-3 text-white p-4">
        <h5 className="fw-bold mb-3 text-white-50">Listado de Solicitudes Activas</h5>

        <div className="table-responsive">
          <table className="table table-dark table-hover align-middle border-dark m-0">
            <thead>
              <tr className="text-white-50 border-bottom border-secondary small text-uppercase">
                <th scope="col">Cliente / Contacto</th>
                <th scope="col">Vehículo</th>
                <th scope="col">Precio Catálogo</th>
                <th scope="col">Financiamiento</th>
                <th scope="col">Comentarios Cliente</th>
                <th scope="col" className="text-center" style={{ width: '160px' }}>Estado</th>
              </tr>
            </thead>
            <tbody>
              {cotizacionesFiltradas.map((cotizacion) => {
                const estadoActual = cotizacion.estado || 'PENDIENTE';
                return (
                  <tr key={cotizacion.id} className="border-bottom border-dark">
                    <td>
                      <span className="fw-bold d-block text-white">{cotizacion.nombreCliente}</span>
                      <small className="text-white-50 d-block"><i className="bi bi-envelope me-1"></i>{cotizacion.correo}</small>
                      <small className="text-white-50 d-block"><i className="bi bi-telephone me-1"></i>{cotizacion.telefono}</small>
                    </td>
                    <td>
                      <span className="fw-semibold text-white d-block">{cotizacion.vehiculoMarca} {cotizacion.vehiculoModelo}</span>
                      <small className="text-danger fw-bold">Año: {cotizacion.vehiculoAnio}</small>
                    </td>
                    <td>
                      <span className="fw-bold text-white">
                        ${cotizacion.vehiculoPrecio ? Number(cotizacion.vehiculoPrecio).toLocaleString() : '0'}
                      </span>
                    </td>
                    <td>
                      {cotizacion.formaPago === 'FINANCIADO' ? (
                        <>
                          <span className="badge bg-info text-dark fw-bold d-block mb-1" style={{ width: 'fit-content' }}>Financiado</span>
                          <small className="text-white-50 d-block">Enganche: ${cotizacion.enganche ? Number(cotizacion.enganche).toLocaleString() : '0'}</small>
                          <small className="text-white-50 d-block">Plazo: {cotizacion.plazoMeses} meses</small>
                        </>
                      ) : (
                        <span className="badge bg-secondary fw-bold" style={{ width: 'fit-content' }}>Contado</span>
                      )}
                    </td>
                    <td style={{ maxWidth: '220px' }}>
                      <p className="text-white-50 small m-0 text-truncate" title={cotizacion.mensaje} style={{ fontSize: '0.85rem' }}>
                        {cotizacion.mensaje || <em className="text-muted">Sin comentarios adicionales</em>}
                      </p>
                    </td>

                    <td className="text-center">
                      <select
                        value={estadoActual}
                        onChange={(e) => handleCambioEstado(cotizacion.id, estadoActual, e.target.value)}
                        className={`form-select form-select-sm fw-semibold text-center border-0 rounded-pill ${
                          estadoActual === 'CONTACTADO'
                            ? 'bg-success text-white'
                            : 'bg-warning text-dark'
                        }`}
                        style={{ cursor: 'pointer' }}
                      >
                        <option value="PENDIENTE" className="bg-dark text-white">PENDIENTE</option>
                        <option value="CONTACTADO" className="bg-dark text-white">CONTACTADO</option>
                      </select>
                    </td>
                  </tr>
                );
              })}

              {cotizacionesFiltradas.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-5 text-secondary">
                    <i className="bi bi-folder-x fs-2 d-block mb-2"></i>
                    No se encontraron registros de cotizaciones almacenados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
