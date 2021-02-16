import axios from "axios";

function getProjects(userId) {
  return axios
    .get("http://localhost:8081/api/projects/getProjectsByDesigner/" + userId)
    .then(function (response) {
      return response.data.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}

function getData(userId) {
  return axios
    .get("http://localhost:8081/api/projects/getProjectsByTechnicalLead/" + userId)
    .then(function (response) {
      return response.data.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}


export default {getProjects, getData};

