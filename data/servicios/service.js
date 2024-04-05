import { api } from '@/data/api-client'

export function getAllTask(){
    return api.get("/tasks")
}

export function getTaskById(id){
    return api.get(`/tasks/${id}`)
}

export function postTask(params){
    return api.post("/tasks",params)
}

export function updateTask(params,id){
    return api.put(`/tasks/${id}`,params)
}

export function deleteTaskById(id){
    return api.delete(`/tasks/${id}`)
}