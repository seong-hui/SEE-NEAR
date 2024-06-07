import axios from "axios";

const API_URL = `${process.env.REACT_APP_URL}`;
const token = localStorage.getItem("token");

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Token ${token}`,
  },
});

const localInstance = axios.create({
  headers: {
    Authorization: `Token ${token}`,
  },
});

const signupInstance = axios.create({
  baseURL: API_URL,
});

export { instance, signupInstance, localInstance };
