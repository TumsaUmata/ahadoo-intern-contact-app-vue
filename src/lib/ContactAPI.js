import axios from 'axios';

const API_URL = "http://localhost:3000/contacts";

export default {
  getContacts(skip) {
    return fetch(API_URL + `?filter[limit]=6&filter[skip]=` + skip)
        .then(response => response.json());
  },
  getContact(id) {
    return fetch(`${API_URL}/${id}`)
        .then(response => response.json());
  },
  createContact(product) {
    return axios.post(API_URL, product);
  },
  updateContact(id, product) {
    return axios.put(`${API_URL}/${id}`, product);
  },
  deleteContact(id) {
    return axios.delete(`${API_URL}/${id}`);
  },
};
