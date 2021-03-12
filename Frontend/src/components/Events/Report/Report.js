import React from "react";
import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: "row",
        backgroundColor: "#E4E4E4",
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
});

// Create Document Component
const Report = (props) => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text>Total Completed Projects</Text>
                    <Text>
                        {props.projects
                            ? props.projects.filter(
                                  (project) =>
                                      project.status.value ===
                                      "Project Complete"
                              ).length
                            : ""}
                    </Text>
                    <Text>Projects Completed On Time</Text>
                    <Text>
                        {props.projects
                            ? props.projects.filter(
                                  (project) =>
                                      project.status.value ===
                                          "Project Complete" &&
                                      new Date(project.status.time_set) <
                                          new Date(project.date_required)
                              ).length
                            : ""}
                    </Text>
                    <Text>Projects Not Completed On Time</Text>
                    <Text>
                        {props.projects
                            ? props.projects.filter(
                                  (project) =>
                                      project.status.value ===
                                          "Project Complete" &&
                                      new Date(project.status.time_set) >
                                          new Date(project.date_required)
                              ).length
                            : ""}
                    </Text>
                    <Text>Projects Due Next Week</Text>
                    <Text>
                        {props.projects
                            ? props.projects.filter((project) => {
                                  let dateR = new Date(project.date_required);
                                  let now = new Date();
                                  let dateW = new Date().setDate(
                                      now.getDate() + 7
                                  );

                                  return dateR < dateW && dateR > now;
                              }).length
                            : ""}
                    </Text>
                    <Text>Projects With Unassigned Engineers</Text>
                    <Text>
                        {props.projects
                            ? props.projects.filter(
                                  (project) =>
                                      project.engineers.design_checker_id ==
                                          null ||
                                      project.engineers.designer_id == null
                              ).length
                            : ""}
                    </Text>
                </View>
                <View style={styles.section}>
                    <Text>Section #2</Text>
                </View>
            </Page>
        </Document>
    );
};

export default Report;
