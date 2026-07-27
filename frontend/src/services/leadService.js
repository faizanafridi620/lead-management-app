import api from "./api";

export const getLeads = (params) => {
    return api.get("/leads", {params})
}

export const createLead = (data) => {
    return api.post("/leads", data)
}

export const updateLead = (id, data) => {
    return api.put(`/leads/${id}`, data)
}

export const deleteLead = (id) => {
    return api.delete(`/leads/${id}`)
}

export const getLeadsById = (id) => {
    return api.get(`/leads/${id}`)
}

export const updateLeadStatus = (id, status) => {
    return api.put(`/leads/${id}/status`,{status})
}

export const addNote = (id, note) => {
    return api.post(`/leads/${id}/notes`, {note})
}