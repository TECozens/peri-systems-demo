import React, { useCallback, useEffect, useRef, useState } from "react";
import {
    Button,
    Collapse,
    Fade,
    HStack,
    Input,
    InputGroup,
    InputLeftElement,
    Select,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { Box, Text, Stack, Heading } from "@chakra-ui/layout";
import { useDisclosure, SlideFade } from "@chakra-ui/react"
import DatePicker from "../Util/DatePicker/DatePicker";
import ProjectFilteringService from "../../services/project.filtering.service";

const ProjectFilter = (props) => {
    let filters = useRef({});
    const [statusOptions, setStatusOptions] = useState();
    let firstRender = useRef(true);
    let count = props.count;
    const { isOpen, onToggle } = useDisclosure()

    const getUniqueStatusFromProjects = projectList =>
        projectList ? setStatusOptions(
            projectList
                .map((project) => project.status.value)
                .filter(
                    (value, index, self) => self.indexOf(value) === index
                )
        ) : false

    const createSelectionOptions = listOfOptions =>
        listOfOptions ? listOfOptions.map(
            aStatus => (<option key={count++} value={aStatus}>{aStatus}</option>)
        ) : false


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

    useEffect(() => {
        console.log('filters.current :>> ', filters.current);
        console.log('filtersActive() :>> ', filtersActive());
    })

    const filtersActive = () =>
        !Object.values(filters.current).map(value =>
            value !== ''
        ).every(value => 
            value === false
        ) || (Object.values(filters.current) === []) ? true : false

    return (
        <>
            <HStack mb={4} >
                <Button w="120px" onClick={onToggle} colorScheme='yellow'>
                    {isOpen ? 'Hide Filters' : 'Show Filters'}
                </Button>
                <Fade in={filtersActive()} offsetX="-20px">
                    <Button colorScheme="red" onClick={clearFilters}>
                        Clear Filters
                    </Button>
                </Fade>
            </HStack>
            <Collapse in={isOpen} animateOpacity>
                <Box mb={4} background='white' p={4} borderRadius={8}>
                    <Stack>
                        <HStack>
                            <DatePicker
                                name="from_date"
                                placeholderText="Start Date"
                                selected={filters.current.from_date || ""}
                                onSelect={(e) =>
                                    handleFilterChange("from_date", new Date(e))
                                }
                                dateFormat={"dd/MM/yyyy"}
                            />
                            <DatePicker
                                name="to_date"
                                placeholderText="End Date"
                                selected={filters.current.to_date || ""}
                                onSelect={(e) =>
                                    handleFilterChange("to_date", new Date(e))
                                }
                                dateFormat={"dd/MM/yyyy"}
                            />
                        </HStack>
                        <InputGroup>
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
                        <InputGroup>
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

                        <InputGroup>
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
                        <Select
                            color='#A0AEC4'
                            placeholder="Select a status"
                            name="project_status"
                            onChange={(e) =>
                                handleFilterChange("status.value", e.target.value)
                            }
                            value={filters.current["status.value"] || ""}
                        >
                            {createSelectionOptions(statusOptions)}
                        </Select>
                    </Stack>
                </Box>
            </Collapse>
        </>
    );
};

export default ProjectFilter;
