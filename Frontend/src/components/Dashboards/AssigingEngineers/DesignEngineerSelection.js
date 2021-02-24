import React, { useCallback, useEffect, useState } from "react";
import { Select, Text } from "@chakra-ui/react";
import UsersService from "../../../services/users.service";

const DesignEngineerSelection = (props) => {
    const [allDesigners, setAllDesigners] = useState([]);

    useEffect(() => {
        getAndSetDesigners();
    });

    const getAndSetDesigners = useCallback(() => {
        UsersService.getDesignerRoleID().then((idRetrieved) => {
            if (idRetrieved !== undefined) {
                UsersService.getUsersWithRoleID(idRetrieved).then((users) => {
                    setAllDesigners(users);
                });
            }
        });
    }, []);

    function createDesignEngineerSelectionOptions() {
        if (allDesigners !== undefined) {
            return allDesigners.map((aDesigner) => (
                <option key={aDesigner._id} size={"md"} value={aDesigner._id}>
                    {aDesigner.firstname + " " + aDesigner.lastname}
                </option>
            ));
        }
    }

    function handleOnChange(event) {
        props.onChange(event.target.value);
    }

    return (
        <div align="left" key={"assign_design_engineer_selection"}>
            <Text>Design Engineer:</Text>
            <Select
                w="70%"
                size="sm"
                placeholder="Select an engineer"
                name="design_engineers"
                onChange={handleOnChange}
            >
                {createDesignEngineerSelectionOptions()}
            </Select>
        </div>
    );
};

export default DesignEngineerSelection;
