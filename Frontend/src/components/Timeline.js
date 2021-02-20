import React, {useEffect, useRef, useState} from "react";
import ProjectService from "../services/project.service";
import circle_outline from "../icons/outline_circle.png"
import red_tick from "../icons/red_tick.png"
import "../style/timeline.css";
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



    function isStatusComplete (index) {
        if (typeof projects !== 'undefined') {
                if (index >= projects.status.length) {
                    return (
                        <div>
                            <img src={circle_outline} alt="Logo" width="88" height="84"/>
                            <p>{allProjectStages[index]}</p>
                        </div>
                    );
                }
            if (index === projects.status.length) {
                return (
                    <div>
                        <img src={circle_outline} alt="Logo" width="88" height="84"/>
                        <p>{allProjectStages[index]}</p>
                    </div>
                );
            }
                if (projects.status[index].value.indexOf(allProjectStages[index]) > -1) {
                    return (
                        <div>
                            <img src={red_tick} alt="Logo" width="88" height="84"/>
                            <p>{allProjectStages[index]}</p>
                        </div>
                    );
                } else {
                    return (
                        <div>
                            <img src={circle_outline} alt="Logo" width="88" height="84"/>
                            <p>{allProjectStages[index]}</p>
                        </div>
                    );
                }
        } else {
            return (
                <div>Project Not Found</div>
            );
        }
    }

    function isDesignPending(index) {
    }

    function isPreDesignOnGoing() {
    }

    function isPreDesignComplete() {
    }

    function isAwaitingCustomerApproval() {
    }

    function isDetailedDesignPending() {
    }

    function isDetailedDesignOngoing() {
    }

    function isDesignComplete() {
    }

    function isProjectComplete() {
    }


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
            {isStatusComplete(0)}
            {isStatusComplete(1)}
            {isStatusComplete(3)}
            {isStatusComplete(4)}
            {isStatusComplete(5)}
            {isStatusComplete(6)}
            {isStatusComplete(7)}
            Hello <br/>
        </div>
    );
};


export default Timeline;