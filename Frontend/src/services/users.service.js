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
function getUserByID(userId) {
    return axios
        .get("http://localhost:8081/api/users/getUserByID/" + userId)
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

function getTechnicalLeadRoleID() {
    return axios
        .get("http://localhost:8081/api/users/getTechnicalLeadRoleID")
        .then(function (response) {
            return response.data.data[0]._id;
        })
        .catch(function (error) {
            console.log(error);
        });
}

const UserService = {
    getUsersWithRoleID,
    getUserByID,
    getDesignerRoleID,
    getTechnicalLeadRoleID,
};

export default UserService;
