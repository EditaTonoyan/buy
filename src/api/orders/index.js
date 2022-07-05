import { api } from "../axios";

export default function getOrdersApi(filtData) {
  console.log("data_api", filtData);
  return api.get(`owner/orders/`, filtData);
}

// export function createOrderApi(data) {
//     return api.post('owner/orders', data)
// }

export function buyOrderApi(id, data) {
  return api.post(`owner/orders/purchase/${id}`, data);
}

export function rejectOrderApi([orderId, data]) {
  return api.post(`owner/orders/reject/${orderId}`, {
    cancel_message: data.message,
    cancel_message_type: data.type,
  });
}

export function getEditedOrderApi(id) {
  return api.get(`owner/orders/${id}`);
}

export function editOrderApi(data, id, type) {
  console.log(data.file);
  if (type === "notify") {
    return api.put(`owner/orders/${id}`, data);
  } else {
    return api.put(`owner/orders/only/${id}`, data);
  }
}

export function deleteOrderApi(id) {
  return api.delete(`owner/orders/${id}`);
}
