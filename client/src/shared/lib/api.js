import axios from "axios";

export async function getCurrentUser() {
  const response = await axios({
    method: "get",
    url: "/api/v1/users/me",
  });

  const currentUser = response.data.data;

  return currentUser;
}
