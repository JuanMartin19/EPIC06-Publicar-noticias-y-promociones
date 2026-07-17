import './Dashboard.css';

export default function Dashboard() {
  return (
    <div className="dashboard-container">

      {/* Encabezado */}
      <div className="dashboard-header">
        <div>
          <h2>Dashboard</h2>
          <p>
            Resumen general de la actividad de Royal Auto Center.
          </p>
        </div>

        <div className="dashboard-date">
          <i className="bi bi-calendar3"></i>
          <span>{new Date().toLocaleDateString('es-MX')}</span>
        </div>
      </div>

      {/* KPIs */}

      <div className="row g-4 mb-4">

        <div className="col-lg-3 col-md-6">

          <div className="kpi-card">

            <div className="kpi-icon bg-primary">
              <i className="bi bi-car-front-fill"></i>
            </div>

            <div>
              <h3>128</h3>
              <span>Vehículos registrados</span>
            </div>

          </div>

        </div>

        <div className="col-lg-3 col-md-6">

          <div className="kpi-card">

            <div className="kpi-icon bg-success">
              <i className="bi bi-check-circle-fill"></i>
            </div>

            <div>
              <h3>64</h3>
              <span>Servicios completados</span>
            </div>

          </div>

        </div>

        <div className="col-lg-3 col-md-6">

          <div className="kpi-card">

            <div className="kpi-icon bg-warning">
              <i className="bi bi-file-earmark-text-fill"></i>
            </div>

            <div>
              <h3>21</h3>
              <span>Cotizaciones activas</span>
            </div>

          </div>

        </div>

        <div className="col-lg-3 col-md-6">

          <div className="kpi-card">

            <div className="kpi-icon bg-danger">
              <i className="bi bi-megaphone-fill"></i>
            </div>

            <div>
              <h3>7</h3>
              <span>Campañas activas</span>
            </div>

          </div>

        </div>

      </div>

      {/* Segunda fila */}

      <div className="row g-4">

        {/* Reporte */}

        <div className="col-lg-8">

          <div className="dashboard-card">

            <div className="dashboard-card-title">
              <i className="bi bi-bar-chart-line-fill"></i>
              Estadísticas Generales
            </div>

            <div className="report-placeholder">

              <i className="bi bi-graph-up-arrow"></i>

              <h5>Próximamente</h5>

              <p>
                Aquí se mostrarán gráficas de ventas,
                servicios, cotizaciones y rendimiento.
              </p>

            </div>

          </div>

        </div>

        {/* Actividad */}

        <div className="col-lg-4">

          <div className="dashboard-card">

            <div className="dashboard-card-title">
              <i className="bi bi-clock-history"></i>
              Actividad reciente
            </div>

            <ul className="activity-list">

              <li>
                <i className="bi bi-check-circle-fill text-success"></i>
                Servicio completado
                <span>Hace 15 min</span>
              </li>

              <li>
                <i className="bi bi-file-earmark-text-fill text-primary"></i>
                Nueva cotización
                <span>Hace 40 min</span>
              </li>

              <li>
                <i className="bi bi-car-front-fill text-warning"></i>
                Vehículo registrado
                <span>Hoy</span>
              </li>

              <li>
                <i className="bi bi-person-plus-fill text-danger"></i>
                Usuario agregado
                <span>Ayer</span>
              </li>

            </ul>

          </div>

        </div>

      </div>

    </div>
  );
}