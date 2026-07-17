// import { Link } from 'react-router-dom';
// import { useLogin } from '../../../hooks/useLogin';
// import './Login.css';

// export default function Login() {
//   const { redirectToLogin } = useLogin();

//   return (
//     <div className="login-page bg-white text-dark">
//       <section className="py-5 position-relative overflow-hidden">
//         <div className="container position-relative py-5" style={{ zIndex: 1 }}>
//           <div className="row align-items-center justify-content-center g-5">

//             <div className="col-12 col-lg-5">
//               <div className="card bg-black border-dark shadow-lg rounded-4 p-4 p-md-5">
//                 <div className="text-center mb-4">
//                   <div className="d-inline-flex align-items-center gap-2 mb-2 text-danger">
//                     <i className="bi bi-shield-lock-fill fs-4"></i>
//                   </div>
//                   <h1 className="fw-extrabold text-white mb-1">Iniciar sesión</h1>
//                   <p className="text-white-50 small mb-0">
//                     Accede a tu cuenta de Royal Auto Center
//                   </p>
//                 </div>

//                 <button
//                   className="btn btn-danger btn-lg w-100 fw-semibold mt-3"
//                   onClick={redirectToLogin}
//                 >
//                   Continuar con inicio de sesión
//                 </button>

//                 <p className="text-white-50 small text-center mt-4 mb-0">
//                   ¿No tienes cuenta?{' '}
//                   <Link to="/register" className="text-danger fw-semibold text-decoration-none">
//                     Regístrate aquí
//                   </Link>
//                 </p>
//               </div>
//             </div>

//             <div className="col-12 col-lg-5 text-center d-none d-lg-block">
//               <img
//                 src="https://blog.autochilango.com/wp-content/uploads/2025/02/Agencia-de-coches.jpg"
//                 alt="Royal Auto Center"
//                 className="img-fluid rounded-4 shadow border border-light"
//                 style={{ maxHeight: '400px', objectFit: 'cover' }}
//               />
//             </div>

//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

import { Link } from 'react-router-dom';
import { useLogin } from '../../../hooks/useLogin';
import './Login.css';

export default function Login() {
  const { redirectToLogin } = useLogin();

  return (
    <div className="login-page">

      <div className="login-bg-circle circle-1"></div>
      <div className="login-bg-circle circle-2"></div>

      <section className="container py-5 position-relative">

        <div className="row justify-content-center align-items-center g-5">

          {/* Card */}
          <div className="col-lg-5">

            <div className="card login-card">

              <div className="text-center">

                <div className="login-icon">
                  <i className="bi bi-shield-lock-fill"></i>
                </div>

                <h1 className="login-title">
                  Bienvenido
                </h1>

                <p className="login-subtitle">
                  Inicia sesión para administrar tu cuenta de
                  <span className="text-danger fw-semibold">
                    {" "}Royal Auto Center
                  </span>
                </p>

              </div>

              <button
  type="button"
  onClick={redirectToLogin}
  className="btn btn-danger btn-lg w-100 login-btn mt-4"
>
  <i className="bi bi-box-arrow-in-right"></i>
  <span>Continuar con inicio de sesión</span>
</button>

              <div className="login-divider">
                <span>Seguro • Rápido • Confiable</span>
              </div>

              

            </div>

          </div>

          {/* Imagen */}

          <div className="col-lg-6 d-none d-lg-block">

            <div className="login-image">

              <img
                src="https://blog.autochilango.com/wp-content/uploads/2025/02/Agencia-de-coches.jpg"
                alt="Royal Auto Center"
              />

              <div className="login-overlay">

                <h2>Royal Auto Center</h2>

                <p>
                  Administración moderna para un servicio automotriz
                  profesional.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}