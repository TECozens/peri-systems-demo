import axios from "axios";

function getDesignerProjects(userId) {
  return axios.get("http://localhost:8081/api/projects/getProjectsByDesigner/" + userId)
    .then(function (response) {
      return response.data.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}

function getTechnicalProjects(userId) {
  return axios.get("http://localhost:8081/api/projects/getProjectsByTechnicalLead/" + userId)
    .then(function (response) {
      return response.data.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}
    
function getProjectByID(projectId) {
    return axios.get("http://localhost:8081/api/projects/getProjectByID/" + projectId)
        .then(function (response) {
            return response.data.data;
        })
        .catch(function (error) {
            console.log(error);
        });
    }

function updateProjectStatus(projectId, status) {
    return axios
        .put(
            "http://localhost:8081/api/projects/updateProjectStatus/" +
                projectId +
                "/" +
                status
        )
        .then(function (response) {
            return response.data.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}

export default {getDesignerProjects, getTechnicalProjects, updateProjectStatus, getProjectByID};