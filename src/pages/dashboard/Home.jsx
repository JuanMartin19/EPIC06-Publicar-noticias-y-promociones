import { Link } from 'react-router-dom';
import './Home.css';

const modules = [
  {
    title: 'Dashboard',
    description: 'Consulta indicadores y estadísticas.',
    icon: 'bi-speedometer2',
    color: 'primary',
    to: '/admin/dashboard',
  },
  {
    title: 'Vehículos',
    description: 'Administra el inventario.',
    icon: 'bi-car-front-fill',
    color: 'success',
    to: '/admin/vehiculos',
  },
  {
    title: 'Servicios',
    description: 'Gestiona los servicios.',
    icon: 'bi-wrench-adjustable',
    color: 'warning',
    to: '/admin/servicios',
  },
  {
    title: 'Marketing',
    description: 'Controla campañas.',
    icon: 'bi-megaphone-fill',
    color: 'danger',
    to: '/admin/marketing',
  },
  {
    title: 'Cotizaciones',
    description: 'Consulta cotizaciones.',
    icon: 'bi-file-earmark-text-fill',
    color: 'info',
    to: '/admin/cotizaciones',
  },
  {
    title: 'Nuevo Usuario',
    description: 'Registra nuevos usuarios.',
    icon: 'bi-person-plus-fill',
    color: 'secondary',
    to: '/admin/registrar-usuario',
  },
];

export default function Home() {
  return (
    <div className="home-container">

      <div className="home-header">
        <h2>Bienvenido</h2>
        <p>Selecciona el módulo con el que deseas trabajar.</p>
      </div>

      <div className="row justify-content-center g-4">

        {modules.map((module) => (

          <div className="col-lg-4 col-md-6 d-flex" key={module.title}>

            <Link
              to={module.to}
              className="card home-card text-decoration-none flex-fill"
            >

              <div className="card-body">

                <div className={`home-icon bg-${module.color}`}>
                  <i className={`bi ${module.icon}`}></i>
                </div>

                <h5>{module.title}</h5>

                <p>{module.description}</p>

                <span className="home-link">
                  Ir al módulo
                  <i className="bi bi-arrow-right ms-2"></i>
                </span>

              </div>

            </Link>

          </div>

        ))}

      </div>

    </div>
  );
}