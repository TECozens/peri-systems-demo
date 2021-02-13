import React, { useEffect, useState } from "react";
import { Box, Heading } from "@chakra-ui/react";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import { Text } from "@chakra-ui/layout";
import axios from "axios";

const TechnicalLeadDashboard = () => {
  let user = "AUser";
  let userId = "601a9f4e3e3205f70dda2f7c";
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProjects();
  }, []);

  function getProjects() {
    axios
      .get("http://localhost:5000/getProjectsByTechnicalLeadId/" + userId)
      .then(function (response) {
        setProjects(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function displayProjects() {
    return projects.map((data) => (
      <Tr>
        <Td>{data.name}</Td>
        <Td>{data.number}</Td>
        <Td>------</Td>
        <Td>{data.status[data.status.length - 1].value}</Td>
      </Tr>
    ));
  }

  return (
    <div>
      <Box m="10px">
        <Heading>Welcome back {user}!</Heading>
      </Box>
      <Box m="10px">
        <Table
          variant="simple"
          size="md"
          borderWidth="2px"
          borderColor="#463E39"
          borderRadius="mg"
          bg="brand.background"
        >
          <Thead bg="brand.tertiary">
            <Tr color="#463E39">
              <Th>
                <Text fontSize="lg">Name </Text>
              </Th>
              <Th>
                <Text fontSize="lg">Number </Text>
              </Th>
              <Th>
                <Text fontSize="lg">Technical Deliverables</Text>
              </Th>
              <Th>
                <Text fontSize="lg">Status</Text>
              </Th>
            </Tr>
          </Thead>
          <Tbody>{displayProjects()}</Tbody>
        </Table>
      </Box>
    </div>
  );
};

export default TechnicalLeadDashboard;
