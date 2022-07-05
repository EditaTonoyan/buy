import {api} from "../axios";

export function getCompaniesApi () {
    return api.get('owner/companies')
}

export function createCompaniesApi(data) {
    return api.post('owner/companies', data)
}

export function editCompaniesApi(data, id) {
    return api.put(`owner/companies/${id}`, data)
}

export function deleteCompaniesApi(id) {
    return api.delete(`owner/companies/${id}`)
}
