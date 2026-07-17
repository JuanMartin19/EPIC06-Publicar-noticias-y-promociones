import { useEffect, useState, useCallback } from "react";
import {
  getMarcas,
  crearMarca,
  actualizarMarca,
  eliminarMarca,
  getCategorias,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria,
  getVehiculos,
  crearVehiculo,
  actualizarVehiculo,
  eliminarVehiculo,
} from "../../api/vehiculosApi";
import "./Vehiculos.css";

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
      const [dataMarcas, dataCategorias, dataVehiculos] = await Promise.all([
        getMarcas(),
        getCategorias(),
        getVehiculos(),
      ]);
      setMarcas(dataMarcas);
      setCategorias(dataCategorias);
      setVehiculos(dataVehiculos);
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
        await actualizarMarca(editandoMarcaId, formMarca);
        mostrarMensaje("ok", "Marca actualizada correctamente.");
      } else {
        await crearMarca(formMarca);
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
      await eliminarMarca(id);
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
        await actualizarCategoria(editandoCategoriaId, formCategoria);
        mostrarMensaje("ok", "Categoría actualizada correctamente.");
      } else {
        await crearCategoria(formCategoria);
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
      await eliminarCategoria(id);
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
        await actualizarVehiculo(editandoVehiculoId, body);
        mostrarMensaje("ok", "Vehículo actualizado correctamente.");
      } else {
        await crearVehiculo(body);
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
      await eliminarVehiculo(id);
      mostrarMensaje("ok", "Vehículo eliminado.");
      cargarTodo();
    } catch (err) {
      mostrarMensaje("error", "No se pudo eliminar el vehículo.");
      console.error(err);
    }
  }

  return (
    <div className="veh-page">
      <div className="veh-header">
        <h1>Gestión de Vehículos</h1>
        <p>Administra marcas, categorías y el catálogo de vehículos.</p>
      </div>

      <div className="veh-wrap">
        {mensaje && (
          <div className={`veh-alert ${mensaje.tipo === "ok" ? "ok" : "error"}`}>
            {mensaje.texto}
          </div>
        )}

        {/* ---------- Pestañas ---------- */}
        <ul className="veh-tabs">
          <li>
            <button
              type="button"
              className={`veh-tab-btn ${seccion === "marca" ? "active" : ""}`}
              onClick={() => setSeccion("marca")}
            >
              Marca
            </button>
          </li>
          <li>
            <button
              type="button"
              className={`veh-tab-btn ${seccion === "categoria" ? "active" : ""}`}
              onClick={() => setSeccion("categoria")}
            >
              Categoría
            </button>
          </li>
          <li>
            <button
              type="button"
              className={`veh-tab-btn ${seccion === "vehiculo" ? "active" : ""}`}
              onClick={() => setSeccion("vehiculo")}
            >
              Vehículo
            </button>
          </li>
        </ul>

        {/* ---------- Sección Marca ---------- */}
        {seccion === "marca" && (
          <div className="veh-card">
            <div className="veh-card-header">
              {editandoMarcaId ? `Editando marca #${editandoMarcaId}` : "Nueva marca"}
            </div>
            <div className="veh-card-body">
              <form onSubmit={handleGuardarMarca}>
                <div className="row g-3">
                  <div className="col-12 col-md-4">
                    <label className="veh-label">Nombre</label>
                    <input
                      className="veh-input"
                      value={formMarca.nombre}
                      onChange={(e) => setFormMarca({ ...formMarca, nombre: e.target.value })}
                      placeholder="Ej. Toyota"
                      required
                    />
                  </div>
                  <div className="col-12 col-md-4">
                    <label className="veh-label">URL del logo</label>
                    <input
                      className="veh-input"
                      value={formMarca.logo}
                      onChange={(e) => setFormMarca({ ...formMarca, logo: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>
                  <div className="col-12 col-md-4">
                    <label className="veh-label">Descripción</label>
                    <input
                      className="veh-input"
                      value={formMarca.descripcion}
                      onChange={(e) => setFormMarca({ ...formMarca, descripcion: e.target.value })}
                      placeholder="Ej. Confianza y durabilidad"
                    />
                  </div>
                </div>

                <div className="mt-3 d-flex gap-2">
                  <button type="submit" className="veh-btn veh-btn-primary">
                    {editandoMarcaId ? "Guardar cambios" : "Crear marca"}
                  </button>
                  {editandoMarcaId && (
                    <button type="button" className="veh-btn veh-btn-ghost" onClick={cancelarEdicionMarca}>
                      Cancelar edición
                    </button>
                  )}
                </div>
              </form>

              <hr className="veh-hr" />

              <div className="table-responsive">
                <table className="veh-table">
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
                              className="veh-thumb"
                              style={{ width: 50, height: 50, objectFit: "contain" }}
                            />
                          ) : (
                            <span style={{ color: "#6f6f76" }}>Sin logo</span>
                          )}
                        </td>
                        <td style={{ fontWeight: 600 }}>{m.nombre}</td>
                        <td style={{ color: "#a0a0a6" }}>{m.descripcion}</td>
                        <td className="text-end">
                          <button
                            className="veh-btn veh-btn-sm veh-btn-edit me-2"
                            onClick={() => cargarMarcaParaEditar(m)}
                          >
                            Editar
                          </button>
                          <button
                            className="veh-btn veh-btn-sm veh-btn-del"
                            onClick={() => handleEliminarMarca(m.id)}
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                    {marcas.length === 0 && (
                      <tr>
                        <td colSpan={4} className="veh-empty">
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
          <div className="veh-card">
            <div className="veh-card-header">
              {editandoCategoriaId ? `Editando categoría #${editandoCategoriaId}` : "Nueva categoría"}
            </div>
            <div className="veh-card-body">
              <form onSubmit={handleGuardarCategoria}>
                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <label className="veh-label">Nombre</label>
                    <input
                      className="veh-input"
                      value={formCategoria.nombre}
                      onChange={(e) => setFormCategoria({ nombre: e.target.value })}
                      placeholder="Ej. SUV"
                      required
                    />
                  </div>
                </div>

                <div className="mt-3 d-flex gap-2">
                  <button type="submit" className="veh-btn veh-btn-primary">
                    {editandoCategoriaId ? "Guardar cambios" : "Crear categoría"}
                  </button>
                  {editandoCategoriaId && (
                    <button type="button" className="veh-btn veh-btn-ghost" onClick={cancelarEdicionCategoria}>
                      Cancelar edición
                    </button>
                  )}
                </div>
              </form>

              <hr className="veh-hr" />

              <ul className="veh-list">
                {categorias.map((c) => (
                  <li key={c.id} className="veh-list-item">
                    <span style={{ fontWeight: 600 }}>{c.nombre}</span>
                    <div>
                      <button
                        className="veh-btn veh-btn-sm veh-btn-edit me-2"
                        onClick={() => cargarCategoriaParaEditar(c)}
                      >
                        Editar
                      </button>
                      <button
                        className="veh-btn veh-btn-sm veh-btn-del"
                        onClick={() => handleEliminarCategoria(c.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </li>
                ))}
                {categorias.length === 0 && (
                  <li className="veh-list-item" style={{ color: "#6f6f76", justifyContent: "center" }}>
                    Sin categorías aún.
                  </li>
                )}
              </ul>
            </div>
          </div>
        )}

        {/* ---------- Sección Vehiculo ---------- */}
        {seccion === "vehiculo" && (
          <>
            <div className="veh-card">
              <div className="veh-card-header">
                {editandoVehiculoId ? `Editando vehículo #${editandoVehiculoId}` : "Registrar nuevo vehículo"}
              </div>
              <div className="veh-card-body">
                <form onSubmit={handleGuardarVehiculo}>
                  {/* ---- Datos generales ---- */}
                  <div className="veh-section-label">Datos generales</div>
                  <div className="row g-3">
                    <div className="col-12 col-md-4">
                      <label className="veh-label">Modelo</label>
                      <input
                        className="veh-input"
                        name="modelo"
                        value={formVehiculo.modelo}
                        onChange={handleChangeVehiculo}
                        placeholder="Ej. RAV4"
                        required
                      />
                    </div>

                    <div className="col-6 col-md-2">
                      <label className="veh-label">Año</label>
                      <input
                        className="veh-input"
                        type="number"
                        name="anio"
                        value={formVehiculo.anio}
                        onChange={handleChangeVehiculo}
                        required
                      />
                    </div>

                    <div className="col-6 col-md-2">
                      <label className="veh-label">Precio</label>
                      <input
                        className="veh-input"
                        type="number"
                        step="0.01"
                        name="precio"
                        value={formVehiculo.precio}
                        onChange={handleChangeVehiculo}
                        required
                      />
                    </div>

                    <div className="col-6 col-md-2">
                      <label className="veh-label">Marca</label>
                      <select
                        className="veh-select"
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
                      <label className="veh-label">Categoría</label>
                      <select
                        className="veh-select"
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
                      <label className="veh-label">Descripción</label>
                      <textarea
                        className="veh-textarea"
                        name="descripcion"
                        value={formVehiculo.descripcion}
                        onChange={handleChangeVehiculo}
                        rows={2}
                      />
                    </div>

                    <div className="col-12">
                      <label className="veh-label">
                        Imágenes (pega uno o varios links de internet, separados por coma)
                      </label>
                      <textarea
                        className="veh-textarea"
                        name="imagenes"
                        value={formVehiculo.imagenes}
                        onChange={handleChangeVehiculo}
                        rows={2}
                        placeholder="https://ejemplo.com/foto1.jpg, https://ejemplo.com/foto2.jpg"
                      />
                    </div>

                    <div className="col-12 col-md-4 d-flex align-items-center">
                      <div className="d-flex align-items-center gap-2">
                        <input
                          className="veh-check"
                          type="checkbox"
                          name="disponible"
                          id="disponibleCheck"
                          checked={formVehiculo.disponible}
                          onChange={handleChangeVehiculo}
                        />
                        <label className="veh-label mb-0" htmlFor="disponibleCheck">
                          Disponible
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* ---- Ficha técnica ---- */}
                  <hr className="veh-hr" />
                  <div className="veh-section-label">Ficha técnica</div>
                  <div className="row g-3">
                    <div className="col-6 col-md-3">
                      <label className="veh-label">Motor</label>
                      <input
                        className="veh-input"
                        name="motor"
                        value={formVehiculo.motor}
                        onChange={handleChangeVehiculo}
                        placeholder="Ej. 2.5L 4 cilindros"
                      />
                    </div>

                    <div className="col-6 col-md-3">
                      <label className="veh-label">Transmisión</label>
                      <input
                        className="veh-input"
                        name="transmision"
                        value={formVehiculo.transmision}
                        onChange={handleChangeVehiculo}
                        placeholder="Ej. Automática 8 vel."
                      />
                    </div>

                    <div className="col-6 col-md-3">
                      <label className="veh-label">Tipo de combustible</label>
                      <input
                        className="veh-input"
                        name="tipoCombustible"
                        value={formVehiculo.tipoCombustible}
                        onChange={handleChangeVehiculo}
                        placeholder="Ej. Gasolina, Híbrido"
                      />
                    </div>

                    <div className="col-6 col-md-3">
                      <label className="veh-label">Potencia</label>
                      <input
                        className="veh-input"
                        name="potencia"
                        value={formVehiculo.potencia}
                        onChange={handleChangeVehiculo}
                        placeholder="Ej. 203 hp"
                      />
                    </div>

                    <div className="col-6 col-md-3">
                      <label className="veh-label">Torque</label>
                      <input
                        className="veh-input"
                        name="torque"
                        value={formVehiculo.torque}
                        onChange={handleChangeVehiculo}
                        placeholder="Ej. 250 Nm"
                      />
                    </div>

                    <div className="col-6 col-md-3">
                      <label className="veh-label">Rendimiento</label>
                      <input
                        className="veh-input"
                        name="rendimiento"
                        value={formVehiculo.rendimiento}
                        onChange={handleChangeVehiculo}
                        placeholder="Ej. 15 km/l"
                      />
                    </div>

                    <div className="col-6 col-md-3">
                      <label className="veh-label">Tracción</label>
                      <input
                        className="veh-input"
                        name="traccion"
                        value={formVehiculo.traccion}
                        onChange={handleChangeVehiculo}
                        placeholder="Ej. 4x2, AWD"
                      />
                    </div>

                    <div className="col-6 col-md-3">
                      <label className="veh-label">Velocidad máxima</label>
                      <input
                        className="veh-input"
                        name="velocidadMaxima"
                        value={formVehiculo.velocidadMaxima}
                        onChange={handleChangeVehiculo}
                        placeholder="Ej. 190 km/h"
                      />
                    </div>

                    <div className="col-6 col-md-3">
                      <label className="veh-label">Aceleración 0-100</label>
                      <input
                        className="veh-input"
                        name="aceleracion"
                        value={formVehiculo.aceleracion}
                        onChange={handleChangeVehiculo}
                        placeholder="Ej. 8.2 s"
                      />
                    </div>

                    <div className="col-6 col-md-3">
                      <label className="veh-label">Capacidad de pasajeros</label>
                      <input
                        className="veh-input"
                        type="number"
                        name="capacidadPasajeros"
                        value={formVehiculo.capacidadPasajeros}
                        onChange={handleChangeVehiculo}
                        placeholder="Ej. 5"
                      />
                    </div>
                  </div>

                  <div className="mt-4 d-flex gap-2">
                    <button type="submit" className="veh-btn veh-btn-primary">
                      {editandoVehiculoId ? "Guardar cambios" : "Crear vehículo"}
                    </button>
                    {editandoVehiculoId && (
                      <button type="button" className="veh-btn veh-btn-ghost" onClick={cancelarEdicionVehiculo}>
                        Cancelar edición
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>

            <div className="veh-card">
              <div className="veh-card-header">Catálogo actual</div>
              <div style={{ padding: cargando ? "1.5rem" : 0 }}>
                {cargando ? (
                  <p className="mb-0" style={{ color: "#a0a0a6" }}>Cargando...</p>
                ) : (
                  <div className="table-responsive">
                    <table className="veh-table">
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
                                  className="veh-thumb"
                                  style={{ width: 60, height: 40, objectFit: "cover" }}
                                />
                              ) : (
                                <span style={{ color: "#6f6f76" }}>Sin imagen</span>
                              )}
                            </td>
                            <td style={{ fontWeight: 600 }}>{v.modelo}</td>
                            <td>{v.anio}</td>
                            <td className="veh-price">${Number(v.precio).toLocaleString()}</td>
                            <td>{v.marcaNombre}</td>
                            <td>{v.categoriaNombre}</td>
                            <td>
                              <span className={`veh-badge ${v.disponible ? "si" : "no"}`}>
                                {v.disponible ? "Sí" : "No"}
                              </span>
                            </td>
                            <td className="text-end">
                              <button
                                className="veh-btn veh-btn-sm veh-btn-edit me-2"
                                onClick={() => cargarVehiculoParaEditar(v)}
                              >
                                Editar
                              </button>
                              <button
                                className="veh-btn veh-btn-sm veh-btn-del"
                                onClick={() => handleEliminarVehiculo(v.id)}
                              >
                                Eliminar
                              </button>
                            </td>
                          </tr>
                        ))}
                        {vehiculos.length === 0 && (
                          <tr>
                            <td colSpan={8} className="veh-empty">
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
    </div>
  );
}