import { useRegister } from "./../../../hooks/useRegister";
import "./Register.css";

export default function Register() {
  const {
    username,
    setUsername,
    password,
    setPassword,
    message,
    success,
    handleSubmit,
  } = useRegister();

  return (
    <div className="register-container">
      <h1 className="register-title">Crear cuenta</h1>

      <form className="register-form" onSubmit={handleSubmit}>
        <input
          className="register-input"
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          className="register-input"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="register-button" type="submit">
          Registrarse
        </button>
      </form>

      {message && (
        <p className={success ? "register-message success" : "register-message error"}>
          {message}
        </p>
      )}
    </div>
  );
}