import { Box, Button, Card } from "@mui/material";
import React, { useEffect } from "react";
import { ICourseIdentifier } from "../types/ICourseIdentifier";
import { ISemester } from "../types/ISemester";
import IUser from "../types/IUser";
import AddCourse from "./AddCourse";
import ClassCard from "./ClassCard";

interface SemesterProps {
  semester: ISemester;
  handleDeleteSemester: (number: number, season: string) => Promise<void>;
  handleAddCourse: (semester: ISemester, course: ICourseIdentifier) => Promise<void>;
}

export default function Semester(props: SemesterProps) {
  const { semester } = props;

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
        <h2>{semester.season}</h2>
        <h2>{semester.number}</h2>
        <Button onClick={() => props.handleDeleteSemester(semester.number, semester.season)}>
          Delete
        </Button>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "flex-start" }}>
        <ClassCard />
        <ClassCard />
        <ClassCard />
        <AddCourse semester={semester} handleAddCourse={props.handleAddCourse} />
      </Box>
    </Box>
  );
}
