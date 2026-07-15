import { useOAuthCallback } from "../../../hooks/useOAuthCallback";
import "./Callback.css";

export default function Callback() {
  const { status, errorMessage } = useOAuthCallback();

  return (
    <div className="callback-container">
      {status === "loading" && (
        <>
          <div className="spinner" />
          <p>Procesando inicio de sesión...</p>
        </>
      )}

      {status === "error" && (
        <div className="callback-error">
          <p>Ocurrió un error al iniciar sesión.</p>
          <p className="callback-error-detail">{errorMessage}</p>
        </div>
      )}
    </div>
  );
}