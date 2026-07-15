export default function ContactInfo() {
  return (
    <div className="col-12 col-lg-6">
      <div className="d-flex align-items-center gap-2 mb-2 text-danger">
        <i className="bi bi-wrench-adjustable"></i>
        <span className="small fw-bold text-uppercase tracking-wider" style={{ fontSize: '11px' }}>
          Contacto
        </span>
      </div>
      <h2 className="fw-bold text-black mb-3">¿Listo para tu próximo vehículo?</h2>
      <p className="text-secondary mb-4">
        Escríbenos y un asesor te ayudará a encontrar la unidad que se ajusta a lo que necesitas.
      </p>

      <ul className="list-unstyled d-flex flex-column gap-3">
        <li className="d-flex align-items-center gap-3">
          <span className="contact-icon"><i className="bi bi-telephone-fill"></i></span>
          <span className="text-dark">+52 442 123 4567</span>
        </li>
        <li className="d-flex align-items-center gap-3">
          <span className="contact-icon"><i className="bi bi-envelope-fill"></i></span>
          <span className="text-dark">contacto@royalautocenter.com</span>
        </li>
        <li className="d-flex align-items-center gap-3">
          <span className="contact-icon"><i className="bi bi-geo-alt-fill"></i></span>
          <span className="text-dark">Querétaro, Qro., México</span>
        </li>
      </ul>
    </div>
  );
}