// Authentication Service, authorization
import axios from "axios";

// The Port that the Frontend connects to send to backend "5000", authorises users.
const API_URL = "http://localhost:5000/api/auth/";

//TODO Client Register Function, Not Yet Implemented on Backend
const register = (firstname, lastname, email, password) => {
    return axios.post(API_URL + "signup", {
        firstname,
        lastname,
        email,
        password,
    });
};

//NOTE We want users to Login with their Emails and PW
//TODO Tidy up naming convention
const login = (email, password) => {
    return axios.post(API_URL + "signin", {
        email,
        password,
    }).then((response) => {
        if(response.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
    });
};

const logout = () => {
    localStorage.removeItem("user");
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

//TODO Implement Register in week 6
export default {
    register,
    login,
    logout,
    getCurrentUser,
};