import React, {useEffect, useRef, useState} from "react";
import ProjectService from "../services/project.service";
import AuthService from "../services/auth.service";


const Timeline = () => {
    let aProject = useRef();
    const [projects, setProjects] = useState();
    const allProjectStages = ["Design Pending", "Preliminary Design Ongoing", "Preliminary Design Complete", "Awaiting Customer Approval",
        "Detailed Design Pending", "Detailed Design Ongoing", "Design Complete", "Project Complete"]



    useEffect(() => {
        ProjectService.getProjectByID("601aaab03e3205f70dda2f86").then((projects) => {
            aProject.current = projects;
            setProjects(aProject.current)
            console.log("project");
            console.log(aProject.current);
        });
    }, []);



    function displayStatus() {
        if (typeof projects !== 'undefined') {
            return (
                <div>
                    {projects.status.map(status => (
                        <p>{status.value}</p>
                    ))}

                    {/*{projects.status[0].}*/}
                </div>
            )
        } else {
            return (
                <div>
                    <h1>project does not exist</h1>
                </div>
            )
        }
    }



    return (
        <div>
            {displayStatus()}
            Hello <br/>
        </div>
    );
};


export default Timeline;