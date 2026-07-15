import { useState } from "react";

export function useRegister() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("http://localhost:9000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const text = await res.text();
      setMessage(text);
      setSuccess(res.ok);

      if (res.ok) {
        setUsername("");
        setPassword("");
      }
    } catch (err) {
      setMessage("No se pudo conectar con el servidor.");
      setSuccess(false);
    }
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    message,
    success,
    handleSubmit,
  };
}