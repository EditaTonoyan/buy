import {api} from "../axios";

export function getDeliveryApi () {
    return api.get('owner/delivery')
}

export function createDeliveryApi(data) {
    return api.post('owner/delivery', data)
}

export function editDeliveryApi(data, id) {
    return api.put(`owner/delivery/${id}`, data)
}

export function deleteDeliveryApi(id) {
    return api.delete(`owner/delivery/${id}`)
}
