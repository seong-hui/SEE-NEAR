import axios from "axios";

const API_URL = `${process.env.REACT_APP_URL}`;
const token = localStorage.getItem("token");
console.log(token);

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Token ${token}`,
  },
});

const signupInstance = axios.create({
  baseURL: API_URL,
});

export { instance, signupInstance };
