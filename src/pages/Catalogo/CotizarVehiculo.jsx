import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getVehiculos, solicitarCotizacionVehiculo } from '../../services/vehiculos';

export default function CotizarVehiculo() {
  const location = useLocation();
  const [vehiculos, setVehiculos] = useState([]);
  const [form, setForm] = useState({
    nombreCliente: '',
    correo: '',
    telefono: '',
    mensaje: '',
    vehiculoId: '',
    formaPago: 'CONTADO',
    enganche: '',
    plazoMeses: ''
  });

  // Cargar catálogo para la lista desplegable
  useEffect(() => {
    const cargarSelect = async () => {
      const data = await getVehiculos();
      setVehiculos(data);
    };
    cargarSelect();
  }, []);

  // Escuchamos si viene un vehiculoId en la navegación para pre-seleccionarlo
  useEffect(() => {
    if (location.state && location.state.vehiculoId) {
      setForm(prevForm => ({
        ...prevForm,
        vehiculoId: location.state.vehiculoId.toString()
      }));
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nombreCliente || !form.correo || !form.telefono || !form.vehiculoId) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor, llena todos los campos obligatorios y selecciona un vehículo.',
        confirmButtonColor: '#e03a3e'
      });
      return;
    }

    if (form.formaPago === 'FINANCIADO' && (!form.enganche || !form.plazoMeses)) {
      Swal.fire({
        icon: 'warning',
        title: 'Datos de financiamiento incompletos',
        text: 'Indica el enganche y el plazo de pago para tu solicitud financiada.',
        confirmButtonColor: '#e03a3e'
      });
      return;
    }

    try {
      const payload = {
        ...form,
        vehiculoId: parseInt(form.vehiculoId),
        enganche: form.formaPago === 'FINANCIADO' ? parseFloat(form.enganche) : null,
        plazoMeses: form.formaPago === 'FINANCIADO' ? parseInt(form.plazoMeses) : null
      };

      await solicitarCotizacionVehiculo(payload);

      Swal.fire({
        icon: 'success',
        title: '¡Cotización Solicitada!',
        text: 'Tu solicitud ha sido registrada. Un asesor te contactará pronto.',
        confirmButtonColor: '#28a745'
      });

      setForm({
        nombreCliente: '',
        correo: '',
        telefono: '',
        mensaje: '',
        vehiculoId: '',
        formaPago: 'CONTADO',
        enganche: '',
        plazoMeses: ''
      });

    } catch (error) {
      console.error("Error al solicitar cotización:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error de Red',
        text: 'No se pudo registrar tu solicitud. Inténtalo más tarde.',
        confirmButtonColor: '#dc3545'
      });
    }
  };

  return (
    <div className="container py-5 bg-white text-dark" style={{ fontFamily: 'Segoe UI, sans-serif' }}>

      <div className="row justify-content-center mb-4 text-center">
        <div className="col-12 col-md-8">
          <h1 className="fw-extrabold text-black mt-2 mb-3">Cotiza tu Auto</h1>
          <p className="text-secondary opacity-75">
            Selecciona el vehículo que te interesa e ingresa tus datos de contacto. Nuestro equipo te enviará la cotización a la brevedad.
          </p>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-12 col-md-9 col-lg-7">
          <div className="card bg-black text-white p-4 p-md-5 shadow-lg rounded-4 border-0">
            <form onSubmit={handleSubmit}>

              <div className="row g-3 mb-3">
                <div className="col-12">
                  <label className="small text-white-50 mb-1">Nombre Completo</label>
                  <input type="text" name="nombreCliente" value={form.nombreCliente} onChange={handleChange} className="form-control bg-dark text-white border-secondary py-2" placeholder="Ej: Juan Pérez" />
                </div>
                <div className="col-6">
                  <label className="small text-white-50 mb-1">Correo Electrónico</label>
                  <input type="email" name="correo" value={form.correo} onChange={handleChange} className="form-control bg-dark text-white border-secondary py-2" placeholder="juan@example.com" />
                </div>
                <div className="col-6">
                  <label className="small text-white-50 mb-1">Teléfono</label>
                  <input type="tel" name="telefono" value={form.telefono} onChange={handleChange} className="form-control bg-dark text-white border-secondary py-2" placeholder="4421234567" />
                </div>
              </div>

              <div className="mb-3">
                <label className="small text-white-50 mb-1">Selecciona el Vehículo</label>
                <select name="vehiculoId" value={form.vehiculoId} onChange={handleChange} className="form-select bg-dark text-white border-secondary py-2">
                  <option value="">-- Seleccionar --</option>
                  {vehiculos.map(v => (
                    <option key={v.id} value={v.id}>
                      {v.marcaNombre} {v.modelo} {v.anio} (${Number(v.precio).toLocaleString()})
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="small text-white-50 mb-1">Forma de Pago</label>
                <select name="formaPago" value={form.formaPago} onChange={handleChange} className="form-select bg-dark text-white border-secondary py-2">
                  <option value="CONTADO">Contado</option>
                  <option value="FINANCIADO">Financiado</option>
                </select>
              </div>

              {form.formaPago === 'FINANCIADO' && (
                <div className="row g-2 mb-3">
                  <div className="col-6">
                    <label className="small text-white-50 mb-1">Enganche ($)</label>
                    <input type="number" name="enganche" value={form.enganche} onChange={handleChange} className="form-control bg-dark text-white border-secondary py-2" placeholder="Ej: 50000" min="0" />
                  </div>
                  <div className="col-6">
                    <label className="small text-white-50 mb-1">Plazo</label>
                    <select name="plazoMeses" value={form.plazoMeses} onChange={handleChange} className="form-select bg-dark text-white border-secondary py-2">
                      <option value="">-- Seleccionar --</option>
                      <option value="12">12 meses</option>
                      <option value="24">24 meses</option>
                      <option value="36">36 meses</option>
                      <option value="48">48 meses</option>
                      <option value="60">60 meses</option>
                    </select>
                  </div>
                </div>
              )}

              <div className="mb-4">
                <label className="small text-white-50 mb-1">Comentarios (Opcional)</label>
                <textarea name="mensaje" value={form.mensaje} onChange={handleChange} rows="3" className="form-control bg-dark text-white border-secondary" placeholder="Cuéntanos más sobre lo que buscas, forma de pago, etc..."></textarea>
              </div>

              <button type="submit" className="btn btn-danger w-100 fw-bold py-2.5 rounded-3 text-uppercase" style={{ backgroundColor: '#e03a3e' }}>
                Solicitar Cotización
              </button>

            </form>
          </div>
        </div>
      </div>

    </div>
  );
}
