import React, { useEffect, useRef, useState } from "react";
import * as UI from "@chakra-ui/react";
import {
    Button,
    HStack,
    Input,
    InputGroup,
    InputLeftElement,
    Select,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { Text } from "@chakra-ui/layout";
import DatePicker from "react-datepicker";

const ProjectFilter = (props) => {
    let filters = useRef({});
    let statusOptions = useRef();
    const [projectsToDisplay, setProjectsToDisplay] = useState(
        props.projectsDisplayed
    );
    let count = props.count;

    function getUniqueStatusFromProjects(projectList) {
        statusOptions.current = projectList
            .map((project) => project.status[project.status.length - 1].value)
            .filter((value, index, self) => self.indexOf(value) === index);
    }

    function createSelectionOptions() {
        if (statusOptions.current !== undefined) {
            return statusOptions.current.map((aStatus) => (
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

    function handleFilterChange(filterName, value) {
        filters.current[filterName] = value;
    }

    useEffect(() => {
        getUniqueStatusFromProjects(props.projectsDisplayed);
        setProjectsToDisplay(props.projectsDisplayed);
    }, [props.projectsDisplayed]);

    return (
        <UI.Flex>
            <HStack m="10px">
                <InputGroup size="sm" w="50%" bg={"brand.background"}>
                    <InputLeftElement
                        pointerEvents="none"
                        children={<Search2Icon color="gray.300" />}
                    />
                    <Input
                        name="project_number"
                        value={filters.current.number}
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
                        placeholder="Project Name"
                        value={filters.current.name}
                    />
                </InputGroup>
                <InputGroup size="sm" w="55%" bg={"brand.background"}>
                    <InputLeftElement
                        pointerEvents="none"
                        children={<Search2Icon color="gray.300" />}
                    />
                    <Input
                        name="project_client"
                        value={filters.current.client}
                        onChange={(e) =>
                            handleFilterChange("client", e.target.value)
                        }
                        placeholder="Client"
                    />
                </InputGroup>

                <InputGroup size="sm" w={"210%"}>
                    <Text color={"brand.background"}>
                        {" "}
                        Date Required From &nbsp;
                    </Text>
                    <DatePicker
                        name="from_date"
                        placeholderText="choose a date"
                        selected={filters.current.from_date}
                        onSelect={(e) =>
                            handleFilterChange("from_date", new Date(e))
                        }
                        dateFormat={"dd/MM/yyyy"}
                    />
                    <Text color={"brand.background"}>&nbsp;to &nbsp;</Text>
                    <DatePicker
                        name="to_date"
                        placeholderText="choose a date"
                        selected={filters.current.to_date}
                        onSelect={(e) =>
                            handleFilterChange("to_date", new Date(e))
                        }
                        dateFormat={"dd/MM/yyyy"}
                    />
                </InputGroup>

                <Select
                    w="70%"
                    size="sm"
                    placeholder="Select a status"
                    name="project_status"
                    onChange={(e) =>
                        handleFilterChange("status", e.target.value)
                    }
                    value={filters.current.status}
                    bg={"brand.background"}
                >
                    {createSelectionOptions()}
                </Select>
                <Button
                    size="sm"
                    w="20%"
                    colorScheme="red"
                    // onClick={clearFilters}
                >
                    Clear All
                </Button>
            </HStack>
        </UI.Flex>
    );
};

export default ProjectFilter;
