import api from "./api";

export const getProductoras = () => api.get("/productora");
export const createProductora = (data) => api.post("/productora", data);
export const updateProductora = (id, data) => api.put(`/productora/${id}`, data);
export const deleteProductora = (id) => api.delete(`/productora/${id}`);
