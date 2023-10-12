import base from "@/network/base";
import axios from "axios";
import qs from "qs";

export function postWrongQuestion(data) {
    return axios({
        method: 'post',
        url: `${base.url}/wrongQuestion`,
        headers: { 'content-type': 'application/x-www-form-urlencoded', 'Authorization': localStorage.Authorization },
        data: qs.stringify(data)
    });
}

export function getWrongQuestion(id, book, chapter) {
    return axios({
        method: 'get',
        url: `${base.url}/wrongQuestion/?book=${book}&chapter=${chapter}&id=${id}`,
        headers: { 'content-type': 'application/x-www-form-urlencoded', 'Authorization': localStorage.Authorization },
    });
}

export function deleteWrongQuestion(data) {
    return axios({
        method: 'delete',
        url: `${base.url}/wrongQuestion`,
        headers: { 'content-type': 'application/x-www-form-urlencoded', 'Authorization': localStorage.Authorization },
        data: qs.stringify(data)
    });
}
