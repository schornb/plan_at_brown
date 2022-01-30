import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IRequirement from "../types/IRequirement";

interface IRequirementProps {
  requirement: IRequirement;
}

export default function RequirementComponent(props: IRequirementProps) {
  const { type, requirements, name, courseCode, assignedCourse } = props.requirement;

  const display = () => {
    switch (type.toLowerCase()) {
      case "all":
        return (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
              {" "}
              {name} (All)
            </Typography>
            <div style={{ padding: 5, paddingLeft: 15 }}>
              {requirements!.map((requirement) => (
                <RequirementComponent requirement={requirement} />
              ))}
            </div>
          </Box>
        );
      case "any":
        return (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
              {" "}
              {name} (Any){" "}
            </Typography>
            <div style={{ padding: 5, paddingLeft: 15 }}>
              {requirements!.map((requirement) => (
                <RequirementComponent requirement={requirement} />
              ))}
            </div>  
          </Box>
        );
      case "course":
        return (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
              {" "}
              {courseCode} (Course){" "} {assignedCourse && "Assigned: " + assignedCourse}
            </Typography>
          </Box>
        );
      default:
        return <div>Error!</div>;
    }
  };

  return <Box sx={{ display: "flex", flexDirection: "column" }}>{display()}</Box>;
}
