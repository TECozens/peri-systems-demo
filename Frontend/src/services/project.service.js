import axios from "axios";

function getDesignerProjects(userId) {
    return axios
        .get(
            "http://localhost:8081/api/projects/getProjectsByDesigner/" + userId
        )
        .then(function (response) {
            return response.data.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}

function getTechnicalProjects(userId) {
    return axios
        .get(
            "http://localhost:8081/api/projects/getProjectsByTechnicalLead/" +
                userId
        )
        .then(function (response) {
            return response.data.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}

function getProjectsWithDesignEngineersByEngineerID(engineerId) {
    return axios
        .get(
            "http://localhost:8081/api/projects/getProjectsWithDesignEngineersByEngineerID/" +
                engineerId
        )
        .then(function (response) {
            return response.data.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}

function getProjectByID(projectId) {
    return axios
        .get("http://localhost:8081/api/projects/getProjectByID/" + projectId)
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

function updateProjectDesignEngineer(projectId, engineerId) {
    return axios
        .put(
            "http://localhost:8081/api/projects/updateProjectDesignEngineer/" +
                projectId +
                "/" +
                engineerId
        )
        .then(function (response) {
            return response.data.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}

function updateProjectDesignChecker(projectId, engineerId) {
    return axios
        .put(
            "http://localhost:8081/api/projects/updateProjectDesignChecker/" +
                projectId +
                "/" +
                engineerId
        )
        .then(function (response) {
            return response.data.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}
const sendMail = (name, email, projectId) => {
    return axios.post("http://localhost:8081/api/sendmail", {
        name,
        email,
        projectId,
    }).then((response) => {
        if(response.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
    });
};

const ProjectService = {
    getDesignerProjects,
    getTechnicalProjects,
    getProjectsWithDesignEngineersByEngineerID,
    updateProjectStatus,
    getProjectByID,
    updateProjectDesignEngineer,
    updateProjectDesignChecker,
    sendMail,
};

export default ProjectService;
