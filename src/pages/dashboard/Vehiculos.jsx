import { useEffect, useState, useCallback } from "react";
import comercialApi from "../../api/Comercialapi";

const MARCA_VACIA = { nombre: "", logo: "", descripcion: "" };
const CATEGORIA_VACIA = { nombre: "" };
const VEHICULO_VACIO = {
  modelo: "",
  anio: "",
  precio: "",
  descripcion: "",
  disponible: true,
  marcaId: "",
  categoriaId: "",
  imagenes: "",
  // Ficha técnica
  motor: "",
  transmision: "",
  tipoCombustible: "",
  potencia: "",
  torque: "",
  rendimiento: "",
  traccion: "",
  velocidadMaxima: "",
  aceleracion: "",
  capacidadPasajeros: "",
};

export default function Vehiculos() {
  const [seccion, setSeccion] = useState("marca"); // 'marca' | 'categoria' | 'vehiculo'

  const [marcas, setMarcas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);

  const [formMarca, setFormMarca] = useState(MARCA_VACIA);
  const [editandoMarcaId, setEditandoMarcaId] = useState(null);

  const [formCategoria, setFormCategoria] = useState(CATEGORIA_VACIA);
  const [editandoCategoriaId, setEditandoCategoriaId] = useState(null);

  const [formVehiculo, setFormVehiculo] = useState(VEHICULO_VACIO);
  const [editandoVehiculoId, setEditandoVehiculoId] = useState(null);

  const [mensaje, setMensaje] = useState(null); // { tipo: 'ok' | 'error', texto: '' }
  const [cargando, setCargando] = useState(true);

  const cargarTodo = useCallback(async () => {
    setCargando(true);
    try {
      const [resMarcas, resCategorias, resVehiculos] = await Promise.all([
        comercialApi.get("/api/vehiculos/marcas"),
        comercialApi.get("/api/vehiculos/categorias"),
        comercialApi.get("/api/vehiculos"),
      ]);
      setMarcas(resMarcas.data);
      setCategorias(resCategorias.data);
      setVehiculos(resVehiculos.data);
    } catch (err) {
      mostrarMensaje("error", "No se pudo cargar la información. Revisa que el backend esté corriendo.");
      console.error(err);
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    cargarTodo();
  }, [cargarTodo]);

  function mostrarMensaje(tipo, texto) {
    setMensaje({ tipo, texto });
    setTimeout(() => setMensaje(null), 4000);
  }

  // ---------- Marca ----------

  function cargarMarcaParaEditar(m) {
    setEditandoMarcaId(m.id);
    setFormMarca({ nombre: m.nombre, logo: m.logo || "", descripcion: m.descripcion || "" });
  }

  function cancelarEdicionMarca() {
    setEditandoMarcaId(null);
    setFormMarca(MARCA_VACIA);
  }

  async function handleGuardarMarca(e) {
    e.preventDefault();
    if (!formMarca.nombre.trim()) return;

    try {
      if (editandoMarcaId) {
        await comercialApi.put(`/api/vehiculos/marcas/${editandoMarcaId}`, formMarca);
        mostrarMensaje("ok", "Marca actualizada correctamente.");
      } else {
        await comercialApi.post("/api/vehiculos/marcas", formMarca);
        mostrarMensaje("ok", "Marca creada correctamente.");
      }
      cancelarEdicionMarca();
      cargarTodo();
    } catch (err) {
      mostrarMensaje("error", "No se pudo guardar la marca (¿ya existe ese nombre?).");
      console.error(err);
    }
  }

  async function handleEliminarMarca(id) {
    if (!confirm("¿Eliminar esta marca? Solo funciona si ningún vehículo la está usando.")) return;
    try {
      await comercialApi.delete(`/api/vehiculos/marcas/${id}`);
      mostrarMensaje("ok", "Marca eliminada.");
      cargarTodo();
    } catch (err) {
      mostrarMensaje("error", "No se pudo eliminar la marca (probablemente tiene vehículos asociados).");
      console.error(err);
    }
  }

  // ---------- Categoria ----------

  function cargarCategoriaParaEditar(c) {
    setEditandoCategoriaId(c.id);
    setFormCategoria({ nombre: c.nombre });
  }

  function cancelarEdicionCategoria() {
    setEditandoCategoriaId(null);
    setFormCategoria(CATEGORIA_VACIA);
  }

  async function handleGuardarCategoria(e) {
    e.preventDefault();
    if (!formCategoria.nombre.trim()) return;

    try {
      if (editandoCategoriaId) {
        await comercialApi.put(`/api/vehiculos/categorias/${editandoCategoriaId}`, formCategoria);
        mostrarMensaje("ok", "Categoría actualizada correctamente.");
      } else {
        await comercialApi.post("/api/vehiculos/categorias", formCategoria);
        mostrarMensaje("ok", "Categoría creada correctamente.");
      }
      cancelarEdicionCategoria();
      cargarTodo();
    } catch (err) {
      mostrarMensaje("error", "No se pudo guardar la categoría (¿ya existe ese nombre?).");
      console.error(err);
    }
  }

  async function handleEliminarCategoria(id) {
    if (!confirm("¿Eliminar esta categoría? Solo funciona si ningún vehículo la está usando.")) return;
    try {
      await comercialApi.delete(`/api/vehiculos/categorias/${id}`);
      mostrarMensaje("ok", "Categoría eliminada.");
      cargarTodo();
    } catch (err) {
      mostrarMensaje("error", "No se pudo eliminar la categoría (probablemente tiene vehículos asociados).");
      console.error(err);
    }
  }

  // ---------- Vehiculo ----------

  function handleChangeVehiculo(e) {
    const { name, value, type, checked } = e.target;
    setFormVehiculo((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function cargarVehiculoParaEditar(v) {
    setEditandoVehiculoId(v.id);
    setFormVehiculo({
      modelo: v.modelo,
      anio: v.anio,
      precio: v.precio,
      descripcion: v.descripcion || "",
      disponible: v.disponible,
      marcaId: v.marcaId,
      categoriaId: v.categoriaId,
      imagenes: (v.imagenes || []).join(", "),
      // Ficha técnica
      motor: v.motor || "",
      transmision: v.transmision || "",
      tipoCombustible: v.tipoCombustible || "",
      potencia: v.potencia || "",
      torque: v.torque || "",
      rendimiento: v.rendimiento || "",
      traccion: v.traccion || "",
      velocidadMaxima: v.velocidadMaxima || "",
      aceleracion: v.aceleracion || "",
      capacidadPasajeros: v.capacidadPasajeros ?? "",
    });
  }

  function cancelarEdicionVehiculo() {
    setEditandoVehiculoId(null);
    setFormVehiculo(VEHICULO_VACIO);
  }

  async function handleGuardarVehiculo(e) {
    e.preventDefault();

    if (!formVehiculo.modelo.trim() || !formVehiculo.marcaId || !formVehiculo.categoriaId) {
      mostrarMensaje("error", "Modelo, marca y categoría son obligatorios.");
      return;
    }

    const body = {
      modelo: formVehiculo.modelo,
      anio: Number(formVehiculo.anio),
      precio: Number(formVehiculo.precio),
      descripcion: formVehiculo.descripcion,
      disponible: formVehiculo.disponible,
      marcaId: Number(formVehiculo.marcaId),
      categoriaId: Number(formVehiculo.categoriaId),
      imagenes: formVehiculo.imagenes
        .split(",")
        .map((url) => url.trim())
        .filter((url) => url.length > 0),
      // Ficha técnica
      motor: formVehiculo.motor,
      transmision: formVehiculo.transmision,
      tipoCombustible: formVehiculo.tipoCombustible,
      potencia: formVehiculo.potencia,
      torque: formVehiculo.torque,
      rendimiento: formVehiculo.rendimiento,
      traccion: formVehiculo.traccion,
      velocidadMaxima: formVehiculo.velocidadMaxima,
      aceleracion: formVehiculo.aceleracion,
      capacidadPasajeros: formVehiculo.capacidadPasajeros
        ? Number(formVehiculo.capacidadPasajeros)
        : null,
    };

    try {
      if (editandoVehiculoId) {
        await comercialApi.put(`/api/vehiculos/${editandoVehiculoId}`, body);
        mostrarMensaje("ok", "Vehículo actualizado correctamente.");
      } else {
        await comercialApi.post("/api/vehiculos", body);
        mostrarMensaje("ok", "Vehículo creado correctamente.");
      }
      cancelarEdicionVehiculo();
      cargarTodo();
    } catch (err) {
      mostrarMensaje("error", "No se pudo guardar el vehículo.");
      console.error(err);
    }
  }

  async function handleEliminarVehiculo(id) {
    if (!confirm("¿Eliminar este vehículo?")) return;
    try {
      await comercialApi.delete(`/api/vehiculos/${id}`);
      mostrarMensaje("ok", "Vehículo eliminado.");
      cargarTodo();
    } catch (err) {
      mostrarMensaje("error", "No se pudo eliminar el vehículo.");
      console.error(err);
    }
  }

  return (
    <div className="container-fluid py-4">
      <h1 className="mb-4">Gestión de Vehículos</h1>

      {mensaje && (
        <div className={`alert ${mensaje.tipo === "ok" ? "alert-success" : "alert-danger"}`}>
          {mensaje.texto}
        </div>
      )}

      {/* ---------- Pestañas ---------- */}
      <ul className="nav nav-pills mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${seccion === "marca" ? "active" : ""}`}
            onClick={() => setSeccion("marca")}
          >
            Marca
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${seccion === "categoria" ? "active" : ""}`}
            onClick={() => setSeccion("categoria")}
          >
            Categoría
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${seccion === "vehiculo" ? "active" : ""}`}
            onClick={() => setSeccion("vehiculo")}
          >
            Vehículo
          </button>
        </li>
      </ul>

      {/* ---------- Sección Marca ---------- */}
      {seccion === "marca" && (
        <div className="card mb-4">
          <div className="card-header">
            {editandoMarcaId ? `Editando marca #${editandoMarcaId}` : "Nueva marca"}
          </div>
          <div className="card-body">
            <form onSubmit={handleGuardarMarca}>
              <div className="row g-3">
                <div className="col-12 col-md-4">
                  <label className="form-label">Nombre</label>
                  <input
                    className="form-control"
                    value={formMarca.nombre}
                    onChange={(e) => setFormMarca({ ...formMarca, nombre: e.target.value })}
                    placeholder="Ej. Toyota"
                    required
                  />
                </div>
                <div className="col-12 col-md-4">
                  <label className="form-label">URL del logo</label>
                  <input
                    className="form-control"
                    value={formMarca.logo}
                    onChange={(e) => setFormMarca({ ...formMarca, logo: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
                <div className="col-12 col-md-4">
                  <label className="form-label">Descripción</label>
                  <input
                    className="form-control"
                    value={formMarca.descripcion}
                    onChange={(e) => setFormMarca({ ...formMarca, descripcion: e.target.value })}
                    placeholder="Ej. Confianza y durabilidad"
                  />
                </div>
              </div>

              <div className="mt-3 d-flex gap-2">
                <button type="submit" className="btn btn-primary">
                  {editandoMarcaId ? "Guardar cambios" : "Crear marca"}
                </button>
                {editandoMarcaId && (
                  <button type="button" className="btn btn-secondary" onClick={cancelarEdicionMarca}>
                    Cancelar edición
                  </button>
                )}
              </div>
            </form>

            <hr />

            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead>
                  <tr>
                    <th>Logo</th>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {marcas.map((m) => (
                    <tr key={m.id}>
                      <td>
                        {m.logo ? (
                          <img
                            src={m.logo}
                            alt={m.nombre}
                            style={{ width: 50, height: 50, objectFit: "contain" }}
                          />
                        ) : (
                          <span className="text-muted">Sin logo</span>
                        )}
                      </td>
                      <td>{m.nombre}</td>
                      <td>{m.descripcion}</td>
                      <td className="text-end">
                        <button
                          className="btn btn-sm btn-outline-primary me-2"
                          onClick={() => cargarMarcaParaEditar(m)}
                        >
                          Editar
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleEliminarMarca(m.id)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                  {marcas.length === 0 && (
                    <tr>
                      <td colSpan={4} className="text-center text-muted py-3">
                        Sin marcas aún.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ---------- Sección Categoria ---------- */}
      {seccion === "categoria" && (
        <div className="card mb-4">
          <div className="card-header">
            {editandoCategoriaId ? `Editando categoría #${editandoCategoriaId}` : "Nueva categoría"}
          </div>
          <div className="card-body">
            <form onSubmit={handleGuardarCategoria}>
              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <label className="form-label">Nombre</label>
                  <input
                    className="form-control"
                    value={formCategoria.nombre}
                    onChange={(e) => setFormCategoria({ nombre: e.target.value })}
                    placeholder="Ej. SUV"
                    required
                  />
                </div>
              </div>

              <div className="mt-3 d-flex gap-2">
                <button type="submit" className="btn btn-primary">
                  {editandoCategoriaId ? "Guardar cambios" : "Crear categoría"}
                </button>
                {editandoCategoriaId && (
                  <button type="button" className="btn btn-secondary" onClick={cancelarEdicionCategoria}>
                    Cancelar edición
                  </button>
                )}
              </div>
            </form>

            <hr />

            <ul className="list-group">
              {categorias.map((c) => (
                <li key={c.id} className="list-group-item d-flex justify-content-between align-items-center">
                  {c.nombre}
                  <div>
                    <button
                      className="btn btn-sm btn-outline-primary me-2"
                      onClick={() => cargarCategoriaParaEditar(c)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleEliminarCategoria(c.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </li>
              ))}
              {categorias.length === 0 && (
                <li className="list-group-item text-muted">Sin categorías aún.</li>
              )}
            </ul>
          </div>
        </div>
      )}

      {/* ---------- Sección Vehiculo ---------- */}
      {seccion === "vehiculo" && (
        <>
          <div className="card mb-4">
            <div className="card-header">
              {editandoVehiculoId ? `Editando vehículo #${editandoVehiculoId}` : "Registrar nuevo vehículo"}
            </div>
            <div className="card-body">
              <form onSubmit={handleGuardarVehiculo}>
                {/* ---- Datos generales ---- */}
                <h6 className="text-uppercase text-muted small fw-bold mb-3">Datos generales</h6>
                <div className="row g-3">
                  <div className="col-12 col-md-4">
                    <label className="form-label">Modelo</label>
                    <input
                      className="form-control"
                      name="modelo"
                      value={formVehiculo.modelo}
                      onChange={handleChangeVehiculo}
                      placeholder="Ej. RAV4"
                      required
                    />
                  </div>

                  <div className="col-6 col-md-2">
                    <label className="form-label">Año</label>
                    <input
                      className="form-control"
                      type="number"
                      name="anio"
                      value={formVehiculo.anio}
                      onChange={handleChangeVehiculo}
                      required
                    />
                  </div>

                  <div className="col-6 col-md-2">
                    <label className="form-label">Precio</label>
                    <input
                      className="form-control"
                      type="number"
                      step="0.01"
                      name="precio"
                      value={formVehiculo.precio}
                      onChange={handleChangeVehiculo}
                      required
                    />
                  </div>

                  <div className="col-6 col-md-2">
                    <label className="form-label">Marca</label>
                    <select
                      className="form-select"
                      name="marcaId"
                      value={formVehiculo.marcaId}
                      onChange={handleChangeVehiculo}
                      required
                    >
                      <option value="">Selecciona...</option>
                      {marcas.map((m) => (
                        <option key={m.id} value={m.id}>{m.nombre}</option>
                      ))}
                    </select>
                  </div>

                  <div className="col-6 col-md-2">
                    <label className="form-label">Categoría</label>
                    <select
                      className="form-select"
                      name="categoriaId"
                      value={formVehiculo.categoriaId}
                      onChange={handleChangeVehiculo}
                      required
                    >
                      <option value="">Selecciona...</option>
                      {categorias.map((c) => (
                        <option key={c.id} value={c.id}>{c.nombre}</option>
                      ))}
                    </select>
                  </div>

                  <div className="col-12">
                    <label className="form-label">Descripción</label>
                    <textarea
                      className="form-control"
                      name="descripcion"
                      value={formVehiculo.descripcion}
                      onChange={handleChangeVehiculo}
                      rows={2}
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label">
                      Imágenes (pega uno o varios links de internet, separados por coma)
                    </label>
                    <textarea
                      className="form-control"
                      name="imagenes"
                      value={formVehiculo.imagenes}
                      onChange={handleChangeVehiculo}
                      rows={2}
                      placeholder="https://ejemplo.com/foto1.jpg, https://ejemplo.com/foto2.jpg"
                    />
                  </div>

                  <div className="col-12 col-md-4 d-flex align-items-center">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="disponible"
                        id="disponibleCheck"
                        checked={formVehiculo.disponible}
                        onChange={handleChangeVehiculo}
                      />
                      <label className="form-check-label" htmlFor="disponibleCheck">
                        Disponible
                      </label>
                    </div>
                  </div>
                </div>

                {/* ---- Ficha técnica ---- */}
                <hr className="my-4" />
                <h6 className="text-uppercase text-muted small fw-bold mb-3">Ficha técnica</h6>
                <div className="row g-3">
                  <div className="col-6 col-md-3">
                    <label className="form-label">Motor</label>
                    <input
                      className="form-control"
                      name="motor"
                      value={formVehiculo.motor}
                      onChange={handleChangeVehiculo}
                      placeholder="Ej. 2.5L 4 cilindros"
                    />
                  </div>

                  <div className="col-6 col-md-3">
                    <label className="form-label">Transmisión</label>
                    <input
                      className="form-control"
                      name="transmision"
                      value={formVehiculo.transmision}
                      onChange={handleChangeVehiculo}
                      placeholder="Ej. Automática 8 vel."
                    />
                  </div>

                  <div className="col-6 col-md-3">
                    <label className="form-label">Tipo de combustible</label>
                    <input
                      className="form-control"
                      name="tipoCombustible"
                      value={formVehiculo.tipoCombustible}
                      onChange={handleChangeVehiculo}
                      placeholder="Ej. Gasolina, Híbrido"
                    />
                  </div>

                  <div className="col-6 col-md-3">
                    <label className="form-label">Potencia</label>
                    <input
                      className="form-control"
                      name="potencia"
                      value={formVehiculo.potencia}
                      onChange={handleChangeVehiculo}
                      placeholder="Ej. 203 hp"
                    />
                  </div>

                  <div className="col-6 col-md-3">
                    <label className="form-label">Torque</label>
                    <input
                      className="form-control"
                      name="torque"
                      value={formVehiculo.torque}
                      onChange={handleChangeVehiculo}
                      placeholder="Ej. 250 Nm"
                    />
                  </div>

                  <div className="col-6 col-md-3">
                    <label className="form-label">Rendimiento</label>
                    <input
                      className="form-control"
                      name="rendimiento"
                      value={formVehiculo.rendimiento}
                      onChange={handleChangeVehiculo}
                      placeholder="Ej. 15 km/l"
                    />
                  </div>

                  <div className="col-6 col-md-3">
                    <label className="form-label">Tracción</label>
                    <input
                      className="form-control"
                      name="traccion"
                      value={formVehiculo.traccion}
                      onChange={handleChangeVehiculo}
                      placeholder="Ej. 4x2, AWD"
                    />
                  </div>

                  <div className="col-6 col-md-3">
                    <label className="form-label">Velocidad máxima</label>
                    <input
                      className="form-control"
                      name="velocidadMaxima"
                      value={formVehiculo.velocidadMaxima}
                      onChange={handleChangeVehiculo}
                      placeholder="Ej. 190 km/h"
                    />
                  </div>

                  <div className="col-6 col-md-3">
                    <label className="form-label">Aceleración 0-100</label>
                    <input
                      className="form-control"
                      name="aceleracion"
                      value={formVehiculo.aceleracion}
                      onChange={handleChangeVehiculo}
                      placeholder="Ej. 8.2 s"
                    />
                  </div>

                  <div className="col-6 col-md-3">
                    <label className="form-label">Capacidad de pasajeros</label>
                    <input
                      className="form-control"
                      type="number"
                      name="capacidadPasajeros"
                      value={formVehiculo.capacidadPasajeros}
                      onChange={handleChangeVehiculo}
                      placeholder="Ej. 5"
                    />
                  </div>
                </div>

                <div className="mt-4 d-flex gap-2">
                  <button type="submit" className="btn btn-success">
                    {editandoVehiculoId ? "Guardar cambios" : "Crear vehículo"}
                  </button>
                  {editandoVehiculoId && (
                    <button type="button" className="btn btn-secondary" onClick={cancelarEdicionVehiculo}>
                      Cancelar edición
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          <div className="card">
            <div className="card-header">Catálogo actual</div>
            <div className="card-body p-0">
              {cargando ? (
                <p className="p-3 mb-0">Cargando...</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead>
                      <tr>
                        <th>Foto</th>
                        <th>Modelo</th>
                        <th>Año</th>
                        <th>Precio</th>
                        <th>Marca</th>
                        <th>Categoría</th>
                        <th>Disponible</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {vehiculos.map((v) => (
                        <tr key={v.id}>
                          <td>
                            {v.imagenes && v.imagenes[0] ? (
                              <img
                                src={v.imagenes[0]}
                                alt={v.modelo}
                                style={{ width: 60, height: 40, objectFit: "cover", borderRadius: 4 }}
                              />
                            ) : (
                              <span className="text-muted">Sin imagen</span>
                            )}
                          </td>
                          <td>{v.modelo}</td>
                          <td>{v.anio}</td>
                          <td>${Number(v.precio).toLocaleString()}</td>
                          <td>{v.marcaNombre}</td>
                          <td>{v.categoriaNombre}</td>
                          <td>{v.disponible ? "Sí" : "No"}</td>
                          <td className="text-end">
                            <button
                              className="btn btn-sm btn-outline-primary me-2"
                              onClick={() => cargarVehiculoParaEditar(v)}
                            >
                              Editar
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleEliminarVehiculo(v.id)}
                            >
                              Eliminar
                            </button>
                          </td>
                        </tr>
                      ))}
                      {vehiculos.length === 0 && (
                        <tr>
                          <td colSpan={8} className="text-center text-muted py-3">
                            Aún no hay vehículos registrados.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}