import api from "./axiosInstance";

// ---------- Vehículos ----------

export async function getVehiculos() {
  const { data } = await api.get("/api/vehiculos");
  return data;
}

export async function getVehiculosDisponibles() {
  const { data } = await api.get("/api/vehiculos/disponibles");
  return data;
}

export async function getVehiculoPorId(id) {
  const { data } = await api.get(`/api/vehiculos/${id}`);
  return data;
}

export async function crearVehiculo(vehiculoDTO) {
  const { data } = await api.post("/api/vehiculos", vehiculoDTO);
  return data;
}

export async function actualizarVehiculo(id, vehiculoDTO) {
  const { data } = await api.put(`/api/vehiculos/${id}`, vehiculoDTO);
  return data;
}

export async function eliminarVehiculo(id) {
  await api.delete(`/api/vehiculos/${id}`);
}

export async function getVehiculosPorCategoria(nombreCategoria) {
  const { data } = await api.get("/api/vehiculos/filtrar/categoria", {
    params: { nombre: nombreCategoria },
  });
  return data;
}

export async function getVehiculosPorMarca(nombreMarca) {
  const { data } = await api.get("/api/vehiculos/filtrar/marca", {
    params: { nombre: nombreMarca },
  });
  return data;
}

export async function getVehiculosPorAnio(anio) {
  const { data } = await api.get("/api/vehiculos/filtrar/anio", {
    params: { anio },
  });
  return data;
}

// ---------- Marcas ----------

export async function getMarcas() {
  const { data } = await api.get("/api/vehiculos/marcas");
  return data;
}

export async function crearMarca(marcaDTO) {
  const { data } = await api.post("/api/vehiculos/marcas", marcaDTO);
  return data;
}

export async function actualizarMarca(id, marcaDTO) {
  const { data } = await api.put(`/api/vehiculos/marcas/${id}`, marcaDTO);
  return data;
}

export async function eliminarMarca(id) {
  await api.delete(`/api/vehiculos/marcas/${id}`);
}

// ---------- Categorías ----------

export async function getCategorias() {
  const { data } = await api.get("/api/vehiculos/categorias");
  return data;
}

export async function crearCategoria(categoriaDTO) {
  const { data } = await api.post("/api/vehiculos/categorias", categoriaDTO);
  return data;
}

export async function actualizarCategoria(id, categoriaDTO) {
  const { data } = await api.put(`/api/vehiculos/categorias/${id}`, categoriaDTO);
  return data;
}

export async function eliminarCategoria(id) {
  await api.delete(`/api/vehiculos/categorias/${id}`);
}