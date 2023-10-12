import base from "@/network/base";
import axios from "axios";
export function get_books(){
    return axios({
        method:'get',
        url:`${base.url}/book/get_books`,
        headers:{'content-type':'application/x-www/form-urlencoded','Authorization':localStorage.Authorization}
    })
}

