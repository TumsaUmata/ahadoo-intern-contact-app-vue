import axios from 'axios';

const API_URL = "http://localhost:3000/contacts";

export default {
  getRecipes(skip) {
    return fetch(API_URL + `?filter[limit]=3&filter[skip]=` + skip)
        .then(response => response.json());
  },
  getRecipe(id) {
    return fetch(`${API_URL}/${id}`)
        .then(response => response.json());
  },
  createRecipe(product) {
    return axios.post(API_URL, product);
  },
  updateRecipe(id, product) {
    return axios.put(`${API_URL}/${id}`, product);
  },
  deleteRecipe(id) {
    return axios.delete(`${API_URL}/${id}`);
  },
};
