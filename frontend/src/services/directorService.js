import api from "./api";

export const getDirectores = () => api.get("/director");
export const createDirector = (data) => api.post("/director", data);
export const updateDirector = (id, data) => api.put(`/director/${id}`, data);
export const deleteDirector = (id) => api.delete(`/director/${id}`);
