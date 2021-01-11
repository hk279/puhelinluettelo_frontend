import axios from "axios";

const url = "https://fso-puhelinluettelo-backend.herokuapp.com/api/persons";
/* const url = "http://localhost:3001/api/persons"; */

const getAll = () => {
    return axios.get(url).then((res) => res.data);
};

const create = (item) => {
    return axios.post(url, item);
};

const remove = (itemId) => {
    return axios.delete(`${url}/${itemId}`);
};

const update = (itemId, data) => {
    return axios.put(`${url}/${itemId}`, data);
};

const service = { getAll, create, update, remove };
export default service;
