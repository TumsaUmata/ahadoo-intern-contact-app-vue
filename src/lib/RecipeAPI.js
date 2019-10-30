import ezFetch from 'ez-fetch';

const API_URL = "http://localhost:3000/api/recipes";

export default {
  getRecipes() {
    return fetch(API_URL)
        .then(response => response.json());
  },
  getRecipe(id) {
    return fetch(`${API_URL}/${id}`)
        .then(response => response.json());
  },
  createRecipe(product) {
    return ezFetch.post(API_URL, product);
  },
  updateRecipe(id, product) {
    return ezFetch.put(`${API_URL}/${id}`, product);
  },
  deleteRecipe(id) {
    return ezFetch.delete(`${API_URL}/${id}`);
  },
};
