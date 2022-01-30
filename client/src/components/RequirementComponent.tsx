import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export interface Requirement {
  type: string;
  requirements?: Requirement[];
  name?: string;
  assignedCourse?: string;
  satisfied?: boolean;
  customRequirementName?: string;
  customRequirementParameter?: string;
  courseCode?: string;
  exclusive?: boolean;
  satisfyingCourses?: string[];
}

interface IRequirementProps {
    requirement: Requirement;
}

export default function RequirementComponent(props: IRequirementProps) {

  const { type, requirements, name } = props.requirement;

  const display = () => {
    switch (type.toLowerCase()) {
      case "all":
        return <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom> {name} (All)</Typography>
          {requirements!.map(requirement => <RequirementComponent requirement={requirement} />)}
        </Box>
      case "any":
        return <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom> {name} (Any) </Typography>
          {requirements!.map(requirement => <RequirementComponent requirement={requirement} />)}
        </Box>
        case "course":
            return <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom> {name} (Course) </Typography>
            </Box>
        default:
            return <div>Error!</div>
        }
    }

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {display()}
    </Box>
  );
}
