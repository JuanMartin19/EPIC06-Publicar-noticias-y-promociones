import { useRegistrarUsuario } from '../../../hooks/useRegistrarUsuario';
import Toast from '../../../components/shared/Toast';
import PasswordInput from '../../../components/shared/PasswordInput';
import './RegistrarUsuario.css';

const ROLES = [
  { value: 'ADMIN', label: 'Administrador' },
  { value: 'SERVICIO', label: 'Servicio' },
  { value: 'VENTAS', label: 'Ventas' },
  { value: 'MARKETING', label: 'Marketing' },
];

export default function RegistrarUsuario() {

  const {
    formData,
    errores,
    handleChange,
    handleSubmit,
    estado,
    toast,
    cerrarToast
  } = useRegistrarUsuario();

  return (

    <div className="registrar-page">

      {toast && (
        <Toast
          mensaje={toast.mensaje}
          tipo={toast.tipo}
          onClose={cerrarToast}
        />
      )}

      <div className="registrar-card">

        <div className="text-center mb-5">

          <div className="registrar-icon">
            <i className="bi bi-person-plus-fill"></i>
          </div>

          <h2 className="registrar-title">
            Registrar Usuario
          </h2>

          <p className="registrar-subtitle">
            Agrega un nuevo usuario al sistema de
            <strong className="text-danger">
              {" "}Royal Auto Center
            </strong>
          </p>

        </div>

        <form onSubmit={handleSubmit} noValidate>

          <div className="row g-4">

            <div className="col-md-6">
              <label className="form-label">Nombre completo</label>

              <input
                type="text"
                name="nombre"
                className={`form-control ${errores.nombre ? "is-invalid" : ""}`}
                value={formData.nombre}
                onChange={handleChange}
              />

              {errores.nombre &&
                <div className="invalid-feedback">{errores.nombre}</div>}
            </div>

            <div className="col-md-6">
              <label className="form-label">Usuario</label>

              <input
                type="text"
                name="username"
                className={`form-control ${errores.username ? "is-invalid" : ""}`}
                value={formData.username}
                onChange={handleChange}
              />

              {errores.username &&
                <div className="invalid-feedback">{errores.username}</div>}
            </div>

            <div className="col-md-6">
              <label className="form-label">Correo electrónico</label>

              <input
                type="email"
                name="correo"
                className={`form-control ${errores.correo ? "is-invalid" : ""}`}
                value={formData.correo}
                onChange={handleChange}
              />

              {errores.correo &&
                <div className="invalid-feedback">{errores.correo}</div>}
            </div>

            <div className="col-md-6">
              <label className="form-label">Teléfono</label>

              <input
                type="tel"
                name="telefono"
                className={`form-control ${errores.telefono ? "is-invalid" : ""}`}
                value={formData.telefono}
                onChange={handleChange}
              />

              {errores.telefono &&
                <div className="invalid-feedback">{errores.telefono}</div>}
            </div>

            <div className="col-md-6">
              <label className="form-label">Contraseña</label>

              <PasswordInput
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={errores.password}
              />
            </div>

            <div className="col-md-6">

              <label className="form-label">Rol</label>

              <select
                className="form-select"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                {ROLES.map(r => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </select>

            </div>

          </div>

          <button
            className="btn btn-danger registrar-btn mt-5"
            disabled={estado === "enviando"}
          >
            <i className="bi bi-person-check-fill me-2"></i>

            {estado === "enviando"
              ? "Registrando..."
              : "Registrar Usuario"}

          </button>

        </form>

      </div>

    </div>

  );
}