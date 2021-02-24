import React, { useCallback, useEffect, useState } from "react";
import { Select, Text } from "@chakra-ui/react";
import UsersService from "../../../services/users.service";

const EngineerSelection = (props) => {
    const [allEngineers, setAllEngineers] = useState([]);
    let typeOfEngineerSelection = props.type;
    let selectValue = props.currentEngineer;

    useEffect(() => {
        getAndSetEngineers();
    });

    const getAndSetEngineers = useCallback(() => {
        getDesigners.then((designEngineers) => {
            if (typeOfEngineerSelection === "Design Checker") {
                getTechnicalLeads.then((technicalLeads) => {
                    setAllEngineers(designEngineers.concat(technicalLeads));
                });
            } else {
                setAllEngineers(designEngineers);
            }
        });
    }, [allEngineers]);

    const getDesigners = new Promise((resolve, reject) => {
        UsersService.getDesignerRoleID().then((idRetrieved) => {
            if (idRetrieved !== undefined) {
                UsersService.getUsersWithRoleID(idRetrieved).then((users) => {
                    resolve(users);
                });
            } else {
                reject(Error("Promise rejected"));
            }
        });
    });

    const getTechnicalLeads = new Promise((resolve, reject) => {
        UsersService.getTechnicalLeadRoleID().then((idRetrieved) => {
            if (idRetrieved !== undefined) {
                UsersService.getUsersWithRoleID(idRetrieved).then((users) => {
                    resolve(users);
                });
            } else {
                reject(Error("Promise rejected"));
            }
        });
    });

    function createDesignEngineerSelectionOptions() {
        if (allEngineers !== undefined) {
            return allEngineers.map((aDesigner) => (
                <option key={aDesigner._id} value={aDesigner._id}>
                    {aDesigner.firstname + " " + aDesigner.lastname}
                </option>
            ));
        }
    }

    function handleOnChange(event) {
        let newIdSelected = event.target.value;
        selectValue = newIdSelected;
        props.onChange(newIdSelected);
    }

    return (
        <div align="left" key={props.currentEngineer}>
            <Text>{typeOfEngineerSelection}:</Text>
            <Select
                w="70%"
                size="sm"
                placeholder="Select an engineer"
                name="design_engineers"
                onChange={handleOnChange}
                value={selectValue}
            >
                {createDesignEngineerSelectionOptions()}
            </Select>
        </div>
    );
};

export default EngineerSelection;
