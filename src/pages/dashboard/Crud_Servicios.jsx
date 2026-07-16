import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import './CRUD_Servicios.css';

export default function CRUD_Servicios() {
  const API_URL = "http://localhost:8082/api/public/servicios";

  const [servicios, setServicios] = useState([]);
  const [form, setForm] = useState({ id: '', nombre: '', descripcion: '', precioBase: '', imagenUrl: '' });
  const [editando, setEditando] = useState(false);

  const cargarServicios = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setServicios(data);
    } catch (error) {
      console.error("Error al cargar los servicios:", error);
    }
  };

  useEffect(() => {
    cargarServicios();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nombre || !form.descripcion || !form.precioBase || !form.imagenUrl) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Todos los campos son obligatorios para guardar el servicio.',
        confirmButtonColor: '#0d6efd'
      });
      return;
    }

    const metodo = editando ? "PUT" : "POST";
    const url = editando ? `${API_URL}/${form.id}` : API_URL;

    try {
      const res = await fetch(url, {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: form.nombre,
          descripcion: form.descripcion,
          precioBase: form.precioBase,
          imagenUrl: form.imagenUrl
        })
      });

      if (res.ok) {
        Swal.fire({
          icon: 'success',
          title: editando ? '¡Actualizado!' : '¡Creado!',
          text: editando ? 'El servicio se ha actualizado con éxito.' : 'El servicio se ha registrado con éxito.',
          confirmButtonColor: '#0d6efd',
          timer: 2000
        });
        limpiarFormulario();
        cargarServicios();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un problema en el servidor al procesar la solicitud.',
          confirmButtonColor: '#dc3545'
        });
      }
    } catch (error) {
      console.error("Error al procesar el formulario:", error);
    }
  };

  const seleccionarEditar = (servicio) => {
    setEditando(true);
    setForm({
      id: servicio.id,
      nombre: servicio.nombre,
      descripcion: servicio.descripcion,
      precioBase: servicio.precioBase,
      imagenUrl: servicio.imagenUrl
    });
  };

  const handleEliminar = async (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Esta acción eliminará el servicio de forma permanente en el esquema comercial.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
          if (res.ok) {
            Swal.fire({
              title: '¡Eliminado!',
              text: 'El servicio ha sido removido.',
              icon: 'success',
              timer: 1500,
              showConfirmButton: false
            });
            cargarServicios();
            if (form.id === id) limpiarFormulario();
          }
        } catch (error) {
          console.error("Error al eliminar servicio:", error);
        }
      }
    });
  };

  const limpiarFormulario = () => {
    setForm({ id: '', nombre: '', descripcion: '', precioBase: '', imagenUrl: '' });
    setEditando(false);
  };

  return (
    <div className="crud-servicios-container p-4 bg-white text-dark">
      <h1 className="text-black mb-4 fw-bold">Gestión de Servicios Automotrices</h1>

      <div className="row g-4">
        <div className="col-12 col-lg-4">
          <div className="card bg-white border-light shadow rounded-3 overflow-hidden">
            <div className={`card-header py-3 ${editando ? 'bg-warning text-dark' : 'bg-primary text-white'}`}>
              <h5 className="m-0 fw-bold text-dark text-center">
                {editando ? 'Modificar Servicio' : 'Agregar Servicio'}
              </h5>
            </div>
            
            <div className="card-body p-4 bg-light-card">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label text-secondary small fw-semibold">Nombre del Servicio</label>
                  <input
                    type="text"
                    className="form-control admin-input-light"
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    placeholder="Ej: Servicio express"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label text-secondary small fw-semibold">Descripción Detallada</label>
                  <textarea
                    className="form-control admin-input-light"
                    name="descripcion"
                    value={form.descripcion}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Detalles del paquete..."
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label text-secondary small fw-semibold">Precio Base ($)</label>
                  <input
                    type="number"
                    className="form-control admin-input-light"
                    name="precioBase"
                    value={form.precioBase}
                    onChange={handleChange}
                    placeholder="Ej: 2099.00"
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label text-secondary small fw-semibold">URL de la Imagen</label>
                  <input
                    type="url"
                    className="form-control admin-input-light"
                    name="imagenUrl"
                    value={form.imagenUrl}
                    onChange={handleChange}
                    placeholder="https://images.unsplash.com/..."
                  />
                </div>

                <div className="d-flex gap-2">
                  <button type="submit" className={`btn w-100 fw-bold ${editando ? 'btn-warning text-dark' : 'btn-primary'}`}>
                    {editando ? 'Actualizar Servicio' : 'Guardar Servicio'}
                  </button>
                  {editando && (
                    <button type="button" className="btn btn-outline-secondary" onClick={limpiarFormulario}>
                      Cancelar
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* COLUMNA 2: TABLA OSCURA DE REGISTROS */}
        <div className="col-12 col-lg-8">
          <div className="card bg-black border-dark shadow-lg rounded-3 text-white p-4 bg-dark-card">
            <h5 className="fw-bold mb-3 text-white-50">
              Servicios Registrados ({servicios.length})
            </h5>
            
            <div className="table-responsive">
              <table className="table table-dark table-hover align-middle border-dark m-0">
                <thead>
                  <tr className="text-white-50 border-bottom border-secondary">
                    <th scope="col" style={{ width: '80px' }}>Imagen</th>
                    <th scope="col">Servicio</th>
                    <th scope="col" style={{ width: '120px' }}>Precio</th>
                    <th scope="col" className="text-center" style={{ width: '120px' }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {servicios.map((srv) => (
                    <tr key={srv.id} className="border-bottom border-dark">
                      <td>
                        <img 
                          src={srv.imagenUrl} 
                          alt={srv.nombre} 
                          className="rounded"
                          style={{ width: '60px', height: '45px', objectFit: 'cover' }} 
                        />
                      </td>
                      <td>
                        <span className="fw-bold d-block text-white">{srv.nombre}</span>
                        <small className="text-white-50 text-truncate d-inline-block" style={{ maxWidth: '300px' }}>
                          {srv.descripcion}
                        </small>
                      </td>
                      <td>
                        <span className="fw-bold text-danger">${srv.precioBase}</span>
                      </td>
                      <td className="text-center">
                        <div className="d-flex justify-content-center gap-2">
                          <button 
                            className="btn btn-sm btn-outline-info" 
                            onClick={() => seleccionarEditar(srv)}
                            title="Editar"
                          >
                            <i className="bi bi-pencil-square"></i>
                          </button>
                          <button 
                            className="btn btn-sm btn-outline-danger" 
                            onClick={() => handleEliminar(srv.id)}
                            title="Eliminar"
                          >
                            <i className="bi bi-trash3-fill"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {servicios.length === 0 && (
                    <tr>
                      <td colSpan="4" className="text-center py-4 text-secondary">
                        No hay servicios registrados.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}