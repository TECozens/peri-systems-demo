import axios from "axios";

function getProjectsByEngineerIDAndFilter(userId, params) {
    return axios
        .get(
            "http://localhost:8081/api/projects/filter/getProjectsWithDesignEngineersByEngineerID/" +
                userId,
            { params }
        )
        .then(function (response) {
            return response.data.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}

const ProjectFilteringService = {
    getProjectsByEngineerIDAndFilter,
};

export default ProjectFilteringService;
