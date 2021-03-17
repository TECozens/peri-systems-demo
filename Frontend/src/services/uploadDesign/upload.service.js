import axios from "axios";

const URL = "http://localhost:8081/api"

//TODO Validate the data
const UploadService = (file) => {
    return axios.post(URL + "/uploadDesign", {

    });
};

export default UploadService;