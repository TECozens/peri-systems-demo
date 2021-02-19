import React, {useEffect, useRef, useState} from "react";
import ProjectService from "../services/project.service";
import {Td, Th, Tr} from "@chakra-ui/table";
import AuthService from "../services/auth.service";


const Timeline = () => {
    let aProject = useRef();
    const [projects, setProjects] = useState();
    

    useEffect(() => {
        ProjectService.getProjectByID("601aaab03e3205f70dda2f86").then((projects) => {
            aProject.current = projects;
            setProjects(aProject.current)
            console.log("project");
            console.log(aProject.current);
        });
    }, []);




    function displayStatus() {

    }



    return (
        <div>
            {projects.name}
            Hello <br/>
        </div>
    );
};


export default Timeline;