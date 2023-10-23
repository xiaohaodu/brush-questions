import base from "@/network/base";
import axios from "../http";

export function directory(book) {
  return axios({
    method: "get",
    url: `${base.url}/directory/?book=${book}`,
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization: localStorage.Authorization,
    },
  });
}
