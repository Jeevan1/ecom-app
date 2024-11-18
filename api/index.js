import axios from "axios";

const API = axios.create({
  baseURL: "https://dummyjson.com",
  baseURL2: "http://localhost:5174",
});

export default API;
