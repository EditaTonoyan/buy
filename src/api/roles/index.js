import {api} from "../axios";

export function getRolesApi () {
    return api.get('owner/roles')
}

export function createRoleApi(data) {
    return api.post('owner/roles', data)
}

export function editRoleApi(data, id) {
    return api.put(`owner/roles/${id}`, data)
}

export function deleteRoleApi(id) {
    return api.delete(`owner/roles/${id}`)
}
