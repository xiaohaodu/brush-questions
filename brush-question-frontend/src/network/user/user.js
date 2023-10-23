import axios from "../http";
import base from "@/network/base";

export function get_user_info(id) {
  return axios({
    method: "get",
    url: `${base.url}/userinfo/userinfo/?id=${id}`,
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization: localStorage.Authorization,
    },
  });
}
