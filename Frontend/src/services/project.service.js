import axios from "axios";

export default function getProjects(userId) {
  return axios
    .get("http://localhost:8081/api/projects/getProjectsByDesigner/" + userId)
    .then(function (response) {
      return response.data.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}
