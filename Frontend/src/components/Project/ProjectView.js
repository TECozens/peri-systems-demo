import React, {useContext} from "react"
import * as UI from "@chakra-ui/react"
import projectContext from "../../context/project/projectContext";

const Project = ({project}) => {
    const projectsContext = useContext(projectContext);
    const { selectProject } = projectsContext;

    const handleOnClick = () => {
        selectProject(project);
    }



    return (
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={handleOnClick}
            >{project.name}</button>
        </li>
    )
}

export default Project;