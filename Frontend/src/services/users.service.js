import axios from "axios";

function getUsersWithRoleID(roleId) {
    return axios
        .get("http://localhost:8081/api/users/getUsersWithRoleID/" + roleId)
        .then(function (response) {
            return response.data.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}

function getDesignerRoleID() {
    return axios
        .get("http://localhost:8081/api/users/getDesignerRoleID")
        .then(function (response) {
            return response.data.data[0]._id;
        })
        .catch(function (error) {
            console.log(error);
        });
}

const getUsers = async () =>
    await fetch("http://localhost:8081/api/users/getUsers")
        .then(res => (res.ok ? res : Promise.reject(res)))
        .then(res => res.json())

const example = async () =>
    await fetch('http://localhost:8081/api/users/John/0')
        .then(res => (res.ok ? res : Promise.reject(res)))
        .then(res => res.json())

const UserService = {
    getUsersWithRoleID,
    getDesignerRoleID,
    getUsers,
    example
};

export default UserService;
