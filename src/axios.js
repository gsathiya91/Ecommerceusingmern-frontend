import axios from "axios";

const instance = axios.create({
    baseURL: "https://ecommerceusingmern.herokuapp.com",
});

export default instance;