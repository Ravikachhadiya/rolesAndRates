import axios from 'axios';

const url = 'http://192.168.1.139:3200/v1/role/';

export function postData(endpoint, data) {
    // console.log(endpoint, data);
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
    };

    return fetch(url + endpoint, requestOptions).then(response => response.json());
    // return axios.post(url + endpoint, data);
}

export function putData(endpoint, data) {
    // console.log(endpoint, data);
    const requestOptions = {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
    };
    return fetch(url + endpoint, requestOptions).then(response => response.json());
    // return axios.put(url + endpoint, data);
}

export function getData(endpoint) {
    return fetch(url + endpoint, { method: 'GET' }).then(response => response.json());
    // return axios.get(url + endpoint);
}

export function deleteData(endpoint) {
    return fetch(url + endpoint, { method: 'DELETE' }).then(response => response.json());
    // return axios.delete(url + endpoint);
}