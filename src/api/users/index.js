import {api} from "../axios";

export function getUsersApi () {
    return api.get('owner/users')
}

export function createUsersApi(data) {
    return api.post('owner/users', data)
}

export function editUsersApi(data, id) {
    return api.put(`owner/users/${id}`, data)
}

export function deleteUsersApi(id) {
    return api.delete(`owner/users/${id}`)
}
