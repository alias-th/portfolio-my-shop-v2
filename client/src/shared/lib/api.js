import axios from "axios";

export async function getCurrentUser() {
  const response = await axios({
    method: "get",
    url: "/api/v1/users/me",
  });

  const currentUser = response.data.data;

  return currentUser;
}

export async function createProduct(data) {
  await axios({
    method: "post",
    url: "/api/v1/products",
    data,
  });
}

export async function updateMe(data) {
  await axios({
    method: "patch",
    url: "/api/v1/users/updateMe",
    data,
  });
}

export async function updatePassword(data) {
  await axios({
    method: "patch",
    url: "/api/v1/users/updatePassword",
    data,
  });
}

export async function deleteMe(data) {
  await axios({
    method: "delete",
    url: "/api/v1/users/deleteMe",
  });
}

export async function getUserProducts() {
  const response = await axios({
    method: "get",
    url: "/api/v1/products/seller",
  });

  return response;
}
