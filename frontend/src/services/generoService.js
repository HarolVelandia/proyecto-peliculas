import api from "./api";

export const getGeneros = () => api.get("/genero");
export const createGenero = (data) => api.post("/genero", data);
export const updateGenero = (id, data) => api.put(`/genero/${id}`, data);
export const deleteGenero = (id) => api.delete(`/genero/${id}`);
