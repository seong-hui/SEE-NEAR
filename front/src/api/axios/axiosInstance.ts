import axios from "axios";

const API_URL = `${process.env.REACT_APP_URL}`;
const token = localStorage.getItem("token");

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    // "Content-Type": "application/json",
    Authorization: `Token ${token}`,
  },
});

const signupInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export { instance, signupInstance };
