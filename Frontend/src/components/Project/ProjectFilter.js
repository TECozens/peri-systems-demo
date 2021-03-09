import React, { useCallback, useEffect, useRef, useState } from "react";
import {
    Button,
    HStack,
    Input,
    InputGroup,
    InputLeftElement,
    Select,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { Text, VStack } from "@chakra-ui/layout";
import DatePicker from "react-datepicker";
import ProjectFilteringService from "../../services/project.filtering.service";

const ProjectFilter = (props) => {
    let filters = useRef({});
    const [statusOptions, setStatusOptions] = useState();
    let firstRender = useRef(true);
    let count = props.count;

    function getUniqueStatusFromProjects(projectList) {
        if (projectList !== undefined) {
            setStatusOptions(
                projectList
                    .map((project) => project.status.value)
                    .filter(
                        (value, index, self) => self.indexOf(value) === index
                    )
            );
        }
    }

    function createSelectionOptions(listOfOptions) {
        if (listOfOptions !== undefined) {
            return listOfOptions.map((aStatus) => (
                <option key={count++} value={aStatus}>
                    {aStatus}
                </option>
            ));
        }
    }

    function handleKeyPress(event) {
        // checking if the key pressed is a letter and if so it prevents the
        // letter from being typed in
        let key = event.keyCode || event.which;
        key = String.fromCharCode(key);

        let regex = /[0-9]|\./;
        if (!regex.test(key)) {
            event.returnValue = false;
            if (event.preventDefault) event.preventDefault();
        }
    }

    const handleFilterChange = useCallback(
        (filterName, value) => {
            if (filterName !== undefined && value !== undefined) {
                filters.current[filterName] = value;
            }
            ProjectFilteringService.getProjectsByEngineerIDAndFilter(
                props.authenticatedId,
                filters.current,
                props.page
            ).then((data) => {
                props.setProjectsParent(data.data);
                props.setMaxPage(data.maxPage);
                if (data.maxPage === 1) {
                    props.setPage(1);
                }
            });
        },
        [props.page]
    );

    function clearFilters() {
        let filterNames = Object.keys(filters.current);
        for (let i = 0; i < filterNames.length; i++) {
            filters.current[filterNames[i]] = "";
        }
        props.setProjectDisplayedToAllEngineerProjects();
        props.setMaxPage(props.originalMaxPage);
    }

    useEffect(() => {
        if (
            firstRender.current === false &&
            props.projectsDisplayed.length !== 0
        ) {
            handleFilterChange();
        }
    }, [props.page, handleFilterChange]);

    useEffect(() => {
        if (
            firstRender.current === true &&
            props.projectsDisplayed.length !== 0
        ) {
            firstRender.current = false;
            getUniqueStatusFromProjects(props.projectsDisplayed);
        }
    }, [props.projectsDisplayed]);

    return (
        <VStack>
            <HStack m="10px">
                <InputGroup size="sm" w="50%" bg={"brand.background"}>
                    <InputLeftElement
                        pointerEvents="none"
                        children={<Search2Icon color="gray.300" />}
                    />
                    <Input
                        name="project_number"
                        value={filters.current.number || ""}
                        placeholder="Number"
                        onKeyPress={handleKeyPress}
                        onChange={(e) =>
                            handleFilterChange("number", e.target.value)
                        }
                    />
                </InputGroup>
                <InputGroup size="sm" w="55%" bg={"brand.background"}>
                    <InputLeftElement
                        pointerEvents="none"
                        children={<Search2Icon color="gray.300" />}
                    />
                    <Input
                        name="project_name"
                        onChange={(e) =>
                            handleFilterChange("name", e.target.value)
                        }
                        placeholder="Name"
                        value={filters.current.name || ""}
                    />
                </InputGroup>
                {props.projectBreakpoint !== "sm" ? (
                    <>
                        <InputGroup size="sm" w="55%" bg={"brand.background"}>
                            <InputLeftElement
                                pointerEvents="none"
                                children={<Search2Icon color="gray.300" />}
                            />
                            <Input
                                name="project_client"
                                value={filters.current.client || ""}
                                onChange={(e) =>
                                    handleFilterChange("client", e.target.value)
                                }
                                placeholder="Client"
                            />
                        </InputGroup>
                        <InputGroup size="sm" w={"210%"}>
                            <Text color={"brand.background"}>
                                Date Required From &nbsp;
                            </Text>
                            <DatePicker
                                name="from_date"
                                placeholderText="choose a date"
                                selected={filters.current.from_date || ""}
                                onSelect={(e) =>
                                    handleFilterChange("from_date", new Date(e))
                                }
                                dateFormat={"dd/MM/yyyy"}
                            />
                            <Text color={"brand.background"}>
                                &nbsp;to &nbsp;
                            </Text>
                            <DatePicker
                                name="to_date"
                                placeholderText="choose a date"
                                selected={filters.current.to_date || ""}
                                onSelect={(e) =>
                                    handleFilterChange("to_date", new Date(e))
                                }
                                dateFormat={"dd/MM/yyyy"}
                            />
                        </InputGroup>
                    </>
                ) : (
                    <></>
                )}
                <Select
                    w="70%"
                    size="sm"
                    placeholder="Select a status"
                    name="project_status"
                    onChange={(e) =>
                        handleFilterChange("status.value", e.target.value)
                    }
                    value={filters.current["status.value"] || ""}
                    bg={"brand.background"}
                >
                    {createSelectionOptions(statusOptions)}
                </Select>
                <Button
                    size="sm"
                    w="20%"
                    colorScheme="red"
                    onClick={clearFilters}
                >
                    Clear All
                </Button>
            </HStack>
        </VStack>
    );
};

export default ProjectFilter;
