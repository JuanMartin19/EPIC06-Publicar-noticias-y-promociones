import api from '../api/axiosInstance';

// GET del catálogo completo de vehículos
export const getVehiculos = async () => {
    try {
        const response = await api.get('/api/vehiculos');
        return response.data;
    } catch (error) {
        console.error("Error al obtener vehículos con Axios:", error);
        return [];
    }
};

export const getVehiculoPorId = async (id) => {
    const response = await api.get(`/api/vehiculos/${id}`);
    return response.data;
};

export const getVehiculosPorCategoria = async (nombreCategoria) => {
    const response = await api.get('/api/vehiculos/filtrar/categoria', {
        params: { nombre: nombreCategoria },
    });
    return response.data;
};

export const getVehiculosPorMarca = async (nombreMarca) => {
    const response = await api.get('/api/vehiculos/filtrar/marca', {
        params: { nombre: nombreMarca },
    });
    return response.data;
};

export const getCategorias = async () => {
    try {
        const response = await api.get('/api/vehiculos/categorias');
        return response.data;
    } catch (error) {
        console.error("Error al obtener categorías con Axios:", error);
        return [];
    }
};

export const getMarcas = async () => {
    const response = await api.get('/api/vehiculos/marcas');
    return response.data;
};

// POST para solicitar la cotización de un vehículo del catálogo
export const solicitarCotizacionVehiculo = async (datosCotizacion) => {
    const response = await api.post('/api/public/cotizaciones-vehiculos', datosCotizacion);
    return response.data;
};

// GET para obtener todas las cotizaciones (panel admin)
export const getCotizacionesVehiculosAdmin = async () => {
    const response = await api.get('/api/public/cotizaciones-vehiculos');
    return response.data;
};

export const cambiarEstadoCotizacionVehiculo = async (id, nuevoEstado) => {
    const response = await api.put(`/api/public/cotizaciones-vehiculos/${id}/estado?estado=${nuevoEstado}`);
    return response.data;
};
