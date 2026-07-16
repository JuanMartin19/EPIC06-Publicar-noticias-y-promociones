import React, { useState, useEffect } from 'react';
import { marketingService } from '../../services/marketingService';

const MarketingDashboard = () => {
    const [noticias, setNoticias] = useState([]);
    const [promociones, setPromociones] = useState([]);
    const [loading, setLoading] = useState(false);

    // Estados para los formularios
    const [archivoNoticia, setArchivoNoticia] = useState(null);
    const [urlNoticia, setUrlNoticia] = useState('');
    const [archivoPromocion, setArchivoPromocion] = useState(null);
    const [urlPromocion, setUrlPromocion] = useState('');
    const [vehiculoId, setVehiculoId] = useState('');

    useEffect(() => {
        cargarDatos();
    }, []);

    const cargarDatos = async () => {
        try {
            // AHORA PEDIMOS TODAS (ACTIVAS E INACTIVAS)
            const dataNoticias = await marketingService.getTodasLasNoticias();
            const dataPromociones = await marketingService.getTodasLasPromociones();
            setNoticias(dataNoticias);
            setPromociones(dataPromociones);
        } catch (error) {
            console.error("Error cargando datos:", error);
        }
    };

    // --- MANEJADORES PARA SUBIR ---
    const handleGuardarNoticia = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData();
            if (archivoNoticia) formData.append('archivo', archivoNoticia);
            if (urlNoticia) formData.append('imagenUrl', urlNoticia);

            await marketingService.subirNoticia(formData);
            setArchivoNoticia(null);
            setUrlNoticia('');
            cargarDatos();
        } catch (error) {
            alert('Error al subir el banner');
        } finally {
            setLoading(false);
        }
    };

    const handleGuardarPromocion = async (e) => {
        e.preventDefault();
        if (!vehiculoId) { alert("Debes indicar el ID del vehículo."); return; }
        setLoading(true);
        try {
            const formData = new FormData();
            if (archivoPromocion) formData.append('archivo', archivoPromocion);
            if (urlPromocion) formData.append('imagenUrl', urlPromocion);
            formData.append('vehiculoId', vehiculoId);

            await marketingService.vincularPromocion(formData);
            setArchivoPromocion(null);
            setUrlPromocion('');
            setVehiculoId('');
            cargarDatos();
        } catch (error) {
            alert('Error al guardar la promoción');
        } finally {
            setLoading(false);
        }
    };

    // --- NUEVOS MANEJADORES PARA EL SWITCH ACTIVO/INACTIVO ---
    const handleToggleNoticia = async (id) => {
        await marketingService.toggleActivoNoticia(id);
        cargarDatos(); 
    };

    const handleTogglePromocion = async (id) => {
        await marketingService.toggleActivoPromocion(id);
        cargarDatos(); 
    };

    // --- MANEJADORES PARA ELIMINAR FÍSICAMENTE ---
    const handleEliminarNoticia = async (id) => {
        if(window.confirm('¿ELIMINAR por completo del servidor y BD? Esta acción no se puede deshacer.')) {
            await marketingService.eliminarNoticia(id);
            cargarDatos(); 
        }
    };

    const handleEliminarPromocion = async (id) => {
        if(window.confirm('¿ELIMINAR por completo del servidor y BD? Esta acción no se puede deshacer.')) {
            await marketingService.eliminarPromocion(id);
            cargarDatos(); 
        }
    };

    return (
        <div className="container-fluid mt-4">
            <h2 className="mb-4">Gestión de Marketing</h2>

            <div className="row">
                {/* =========================================
                COLUMNA 1: NOTICIAS (RULETA) 
                ========================================= */}
                <div className="col-md-6 mb-4">
                    <div className="card shadow-sm">
                        <div className="card-header bg-primary text-white">
                            <h5 className="mb-0">Ruleta Principal (Noticias)</h5>
                        </div>
                        <div className="card-body">

                            {/* FORMULARIO DE SUBIDA */}
                            <form onSubmit={handleGuardarNoticia} className="mb-4 p-3 border rounded bg-light">
                                <h6 className="mb-3">Agregar nuevo banner</h6>
                                <div className="mb-3">
                                    <label className="form-label text-muted small">Subir archivo físico</label>
                                    <input type="file" className="form-control form-control-sm" accept="image/jpeg, image/png, image/gif, image/webp" onChange={(e) => setArchivoNoticia(e.target.files[0])} />
                                </div>
                                <div className="mb-3 text-center text-muted small fw-bold">Ó</div>
                                <div className="mb-3">
                                    <label className="form-label text-muted small">URL de Internet</label>
                                    <input type="text" className="form-control form-control-sm" value={urlNoticia} onChange={(e) => setUrlNoticia(e.target.value)} placeholder="https://..." />
                                </div>
                                <button type="submit" className="btn btn-primary btn-sm w-100" disabled={loading}>
                                    {loading ? 'Procesando...' : 'Subir Banner'}
                                </button>
                            </form>

                            {/* LISTA VISUAL CON SWITCHES */}
                            <h6 className="fw-bold text-secondary border-bottom pb-2">Banners Registrados ({noticias.length})</h6>
                            {noticias.length === 0 ? (
                                <p className="text-muted small">No hay noticias en la base de datos.</p>
                            ) : (
                                <ul className="list-group">
                                    {noticias.map(not => (
                                        <li key={not.id} className="list-group-item d-flex justify-content-between align-items-center">
                                            {/* Si está inactiva, la imagen se opaca para dar retroalimentación visual */}
                                            <img src={not.imagenUrl} alt="Banner" style={{ height: '50px', width: '120px', objectFit: 'cover', borderRadius: '4px', opacity: not.activo ? 1 : 0.4 }} />

                                            <div className="d-flex align-items-center gap-3">
                                                {/* SWITCH DE BOOTSTRAP PARA ACTIVAR/DESACTIVAR */}
                                                <div className="form-check form-switch m-0 d-flex align-items-center gap-2">
                                                    <input 
                                                        className="form-check-input mt-0" 
                                                        type="checkbox" 
                                                        role="switch" 
                                                        id={`switchNoticia${not.id}`} 
                                                        checked={not.activo} 
                                                        onChange={() => handleToggleNoticia(not.id)} 
                                                        style={{ cursor: 'pointer' }}
                                                    />
                                                    <label className="form-check-label small text-muted mb-0" htmlFor={`switchNoticia${not.id}`} style={{ cursor: 'pointer', minWidth: '45px' }}>
                                                        {not.activo ? 'Pública' : 'Oculta'}
                                                    </label>
                                                </div>

                                                {/* BOTÓN ROJO SOLO PARA DESTRUIR */}
                                                <button className="btn btn-outline-danger btn-sm" onClick={() => handleEliminarNoticia(not.id)} title="Borrar totalmente">
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}

                        </div>
                    </div>
                </div>

                {/* =========================================
                COLUMNA 2: PROMOCIONES 
                ========================================= */}
                <div className="col-md-6 mb-4">
                    <div className="card shadow-sm">
                        <div className="card-header bg-success text-white">
                            <h5 className="mb-0">Tarjetas de Promoción</h5>
                        </div>
                        <div className="card-body">

                            {/* FORMULARIO DE SUBIDA */}
                            <form onSubmit={handleGuardarPromocion} className="mb-4 p-3 border rounded bg-light">
                                <h6 className="mb-3">Vincular nueva promoción</h6>
                                <div className="mb-3">
                                    <label className="form-label text-muted small">Subir archivo físico</label>
                                    <input type="file" className="form-control form-control-sm" accept="image/jpeg, image/png, image/gif, image/webp" onChange={(e) => setArchivoPromocion(e.target.files[0])} />
                                </div>
                                <div className="mb-3 text-center text-muted small fw-bold">Ó</div>
                                <div className="mb-3">
                                    <label className="form-label text-muted small">URL de Internet</label>
                                    <input type="text" className="form-control form-control-sm" value={urlPromocion} onChange={(e) => setUrlPromocion(e.target.value)} placeholder="https://..." />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label text-muted small">ID del Vehículo (Requerido)</label>
                                    <input type="number" className="form-control form-control-sm" value={vehiculoId} onChange={(e) => setVehiculoId(e.target.value)} placeholder="Ej: 5" required />
                                </div>
                                <button type="submit" className="btn btn-success btn-sm w-100" disabled={loading}>
                                    {loading ? 'Procesando...' : 'Crear Promoción'}
                                </button>
                            </form>

                            {/* LISTA VISUAL CON SWITCHES */}
                            <h6 className="fw-bold text-secondary border-bottom pb-2">Promociones Registradas ({promociones.length})</h6>
                            {promociones.length === 0 ? (
                                <p className="text-muted small">No hay promociones en la base de datos.</p>
                            ) : (
                                <ul className="list-group">
                                    {promociones.map(promo => (
                                        <li key={promo.id} className="list-group-item d-flex justify-content-between align-items-center">
                                            <div className="d-flex align-items-center">
                                                <img src={promo.imagenUrl} alt="Promo" style={{ height: '50px', width: '80px', objectFit: 'cover', marginRight: '15px', borderRadius: '4px', opacity: promo.activo ? 1 : 0.4 }} />
                                                <span className="badge bg-secondary">Auto ID: {promo.vehiculoId}</span>
                                            </div>

                                            <div className="d-flex align-items-center gap-3">
                                                {/* SWITCH DE BOOTSTRAP */}
                                                <div className="form-check form-switch m-0 d-flex align-items-center gap-2">
                                                    <input 
                                                        className="form-check-input mt-0" 
                                                        type="checkbox" 
                                                        role="switch" 
                                                        id={`switchPromo${promo.id}`} 
                                                        checked={promo.activo} 
                                                        onChange={() => handleTogglePromocion(promo.id)} 
                                                        style={{ cursor: 'pointer' }}
                                                    />
                                                     <label className="form-check-label small text-muted mb-0" htmlFor={`switchPromo${promo.id}`} style={{ cursor: 'pointer', minWidth: '45px' }}>
                                                        {promo.activo ? 'Pública' : 'Oculta'}
                                                    </label>
                                                </div>

                                                <button className="btn btn-outline-danger btn-sm" onClick={() => handleEliminarPromocion(promo.id)} title="Borrar totalmente">
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarketingDashboard;