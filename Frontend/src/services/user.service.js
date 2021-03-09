//Data Service, users
import axios from "axios";
import authHeader from "./auth-header";

//TODO Remove junk file and add auth header to requests.
const API_URL = "http://localhost:8081/api/auth/";

const getPublicContent = () => {
    return axios.get(API_URL + "all");
};

//TODO Implement 3 main User Roles then later Add remaining 2
const getDesignerBoard = () => {
    return axios.get(API_URL + "designer", { headers: authHeader() });
};

const getTechnicalBoard = () => {
    return axios.get(API_URL + "technical", { headers: authHeader() });
};

const getAdminBoard = () => {
    return axios.get(API_URL + "admin", { headers: authHeader() });
};

export default {
    getPublicContent,
    getDesignerBoard,
    getTechnicalBoard,
    getAdminBoard,
};