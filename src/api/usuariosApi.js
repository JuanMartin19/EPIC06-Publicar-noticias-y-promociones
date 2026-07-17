import api from "./axiosInstance";

export async function registrarUsuario(payload) {
  const { data } = await api.post("/register", payload);
  return data;
}