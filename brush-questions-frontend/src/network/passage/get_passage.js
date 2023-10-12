import base from "@/network/base";
import axios from 'axios';


export function get_passage(book, chapter) {
    return axios({
        method: 'get',
        url: `${base.url}/passages/get_passages/?book=${book}&chapter=${chapter}`,
        headers: { 'content-type': 'application/x-www-form-urlencoded', 'Authorization': localStorage.Authorization },
    });
}

export function get_passage_page(book, chapter, page) {
    return axios({
        method: 'get',
        url: `${base.url}/passages/get_passages/?book=${book}&chapter=${chapter}&page=${page}`,
        headers: { 'content-type': 'application/x-www-form-urlencoded', 'Authorization': localStorage.Authorization },
    });
}