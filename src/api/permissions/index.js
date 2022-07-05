import {api} from "../axios";

export function getPermissionsApi() {
    return api.get('/owner/permissions')
}
