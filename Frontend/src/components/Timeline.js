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



    function isStatusComplete (status) {
        let i;
        if (typeof projects !== 'undefined') {
            for (i = 0; i < allProjectStages.length; i++) {
                if (projects.status.indexOf(allProjectStages[i]) > -1 && allProjectStages[i] === status) {
                    return (
                        <div>
                            <img src={red_tick} alt="Logo" width="88" height="84"/>
                            <p>{allProjectStages[i]}</p>
                        </div>
                    );
                } else {
                    return (
                        <div>
                            <img src={red_tick} alt="Logo" width="88" height="84"/>
                            <p>{allProjectStages[i]}</p>
                        </div>
                    );
                }
            }
        } else {
            return (
                <div>Project Not Found</div>
            );
        }
    }

    function isDesignPending() {
        isStatusComplete("Design Pending");
    }

    function isPreDesignOnGoing() {
        let i;
        if (typeof projects !== 'undefined') {
            for (i = 0; i < allProjectStages.length; i++) {
                if (projects.status.indexOf(allProjectStages[i]) > -1 && i === 1) {
                    return (
                        <div>
                            <img src={red_tick} alt="Logo" width="88" height="84"/>
                            <p>{allProjectStages[i]}</p>
                        </div>
                    );
                } else {
                    return (
                        <div>
                            <img src={circle_outline} alt="Logo" width="88" height="84"/>
                            <p>{allProjectStages[i]}</p>
                        </div>
                    );
                }
            }
        } else {
            return (
                <div>gfdfd</div>
            );
        }

    }

    function isPreDesignComplete() {
        let i;
        if (typeof projects !== 'undefined') {
            for (i = 0; i < allProjectStages.length; i++) {
                if (projects.status.indexOf(allProjectStages[i]) > -1 && i === 2) {
                    return (
                        <div>
                            <img src={red_tick} alt="Logo" width="88" height="84"/>
                            <p>{allProjectStages[i]}</p>
                        </div>
                    );
                } else {
                    return (
                        <div>
                            <img src={red_tick} alt="Logo" width="88" height="84"/>
                            <p>{allProjectStages[i]}</p>
                        </div>
                    );
                }
            }
        } else {
            return (
                <div>gfdfd</div>
            );
        }

    }

    function isAwaitingCustomerApproval() {
        let i;
        if (typeof projects !== 'undefined') {
            for (i = 0; i < allProjectStages.length; i++) {
                if (projects.status.indexOf(allProjectStages[i]) > -1 && i === 3) {
                    return (
                        <div>
                            <img src={red_tick} alt="Logo" width="88" height="84"/>
                            <p>{allProjectStages[i]}</p>
                        </div>
                    );
                } else {
                    return (
                        <div>
                            <img src={red_tick} alt="Logo" width="88" height="84"/>
                            <p>{allProjectStages[i]}</p>
                        </div>
                    );
                }
            }
        } else {
            return (
                <div>gfdfd</div>
            );
        }

    }

    function isDetailedDesignPending() {
        let i;
        if (typeof projects !== 'undefined') {
            for (i = 0; i < allProjectStages.length; i++) {
                if (projects.status.indexOf(allProjectStages[i]) > -1 && i === 4) {
                    return (
                        <div>
                            <img src={red_tick} alt="Logo" width="88" height="84"/>
                            <p>{allProjectStages[i]}</p>
                        </div>
                    );
                } else {
                    return (
                        <div>
                            <img src={red_tick} alt="Logo" width="88" height="84"/>
                            <p>{allProjectStages[i]}</p>
                        </div>
                    );
                }
            }
        } else {
            return (
                <div>gfdfd</div>
            );
        }

    }

    function isDetailedDesignOngoing() {
        let i;
        if (typeof projects !== 'undefined') {
            for (i = 0; i < allProjectStages.length; i++) {
                if (projects.status.indexOf(allProjectStages[i]) > -1 && i === 5) {
                    return (
                        <div>
                            <img src={red_tick} alt="Logo" width="88" height="84"/>
                            <p>{allProjectStages[i]}</p>
                        </div>
                    );
                } else {
                    return (
                        <div>
                            <img src={red_tick} alt="Logo" width="88" height="84"/>
                            <p>{allProjectStages[i]}</p>
                        </div>
                    );
                }
            }
        } else {
            return (
                <div>gfdfd</div>
            );
        }

    }

    function isDesignComplete() {
        let i;
        if (typeof projects !== 'undefined') {
            for (i = 0; i < allProjectStages.length; i++) {
                if (projects.status.indexOf(allProjectStages[i]) > -1 && i === 6) {
                    return (
                        <div>
                            <img src={red_tick} alt="Logo" width="88" height="84"/>
                            <p>{allProjectStages[i]}</p>
                        </div>
                    );
                } else {
                    return (
                        <div>
                            <img src={red_tick} alt="Logo" width="88" height="84"/>
                            <p>{allProjectStages[i]}</p>
                        </div>
                    );
                }
            }
        } else {
            return (
                <div>gfdfd</div>
            );
        }

    }

    function isProjectComplete() {
        let i;
        if (typeof projects !== 'undefined') {
            for (i = 0; i < allProjectStages.length; i++) {
                if (projects.status.indexOf(allProjectStages[i]) > -1 && i === 7) {
                    return (
                        <div>
                            <img src={red_tick} alt="Logo" width="88" height="84"/>
                            <p>{allProjectStages[i]}</p>
                        </div>
                    );
                } else {
                    return (
                        <div>
                            <img src={red_tick} alt="Logo" width="88" height="84"/>
                            <p>{allProjectStages[i]}</p>
                        </div>
                    );
                }
            }
        } else {
            return (
                <div>gfdfd</div>
            );
        }

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
            {isDesignPending()}
            {isPreDesignOnGoing()}
            {isPreDesignComplete()}
            {isAwaitingCustomerApproval()}
            {isDetailedDesignPending()}
            {isDetailedDesignOngoing()}
            {isDesignComplete()}
            {isProjectComplete()}
            Hello <br/>
        </div>
    );
};


export default Timeline;