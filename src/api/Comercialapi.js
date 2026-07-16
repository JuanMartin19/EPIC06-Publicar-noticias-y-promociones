import axios from "axios";

// Instancia dedicada al microservicio ms-comercial (catálogo de vehículos, marcas, etc.)
// Separada de tu instancia de OAuth (localhost:9000).
const comercialApi = axios.create({ baseURL: "http://localhost:8082" });

comercialApi.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("access_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default comercialApi;