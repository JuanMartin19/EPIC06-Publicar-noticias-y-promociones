const API_URL = "http://localhost:8082/api/public/servicios";

export const getServicios = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Error al obtener los servicios");
        return await response.json();
    } catch (error) {
        console.error("Error en servicioService:", error);
        return [];
    }
};