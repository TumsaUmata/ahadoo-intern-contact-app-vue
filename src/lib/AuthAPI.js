import axios from 'axios';

const SIGNUP_URL = "http://localhost:3000/api/Users";
const LOGIN_URL = 'http://localhost:3000/api/Users/login';

export default {
    getLogin(credentials) {
        return axios.post(SIGNUP_URL, credentials);
    },
    getRegister(credentials) {
        return axios.post(LOGIN_URL, credentials);
    },
};