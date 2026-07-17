import { useState } from "react";
import { registrarUsuario } from "../api/usuariosApi";
import { validarFormularioUsuario } from "../utils/validators";

export function useRegistrarUsuario() {
  const [formData, setFormData] = useState({
    nombre: "",
    username: "",
    correo: "",
    telefono: "",
    password: "",
    role: "VENTAS",
  });

  const [errores, setErrores] = useState({});
  const [estado, setEstado] = useState("idle"); // idle | enviando
  const [toast, setToast] = useState(null); // { mensaje, tipo }

  const handleChange = (e) => {
    const { name, value } = e.target;

    // El teléfono solo acepta dígitos, máximo 10
    if (name === "telefono") {
      const soloNumeros = value.replace(/\D/g, "").slice(0, 10);
      setFormData((prev) => ({ ...prev, telefono: soloNumeros }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      nombre: "",
      username: "",
      correo: "",
      telefono: "",
      password: "",
      role: "VENTAS",
    });
    setErrores({});
  };

  const cerrarToast = () => setToast(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const erroresValidacion = validarFormularioUsuario(formData);
    setErrores(erroresValidacion);

    if (Object.keys(erroresValidacion).length > 0) {
      setToast({ mensaje: "Revisa los campos marcados en rojo", tipo: "error" });
      return;
    }

    setEstado("enviando");

    try {
      await registrarUsuario(formData);
      setToast({ mensaje: "Usuario registrado exitosamente", tipo: "exito" });
      resetForm();
    } catch (err) {
      const data = err.response?.data;
      let msg = "No se pudo registrar el usuario";

      if (typeof data === "string") {
        msg = data;
      } else if (data?.error) {
        msg = data.error;
      } else if (err.message) {
        msg = err.message;
      }

      setToast({ mensaje: msg, tipo: "error" });
    } finally {
      setEstado("idle");
    }
  };

  return { formData, errores, handleChange, handleSubmit, estado, toast, cerrarToast };
}