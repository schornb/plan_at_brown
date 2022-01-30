import { Box, Button } from "@mui/material";
import ICourse from "../types/ICourse";
import { ICourseIdentifier } from "../types/ICourseIdentifier";
import { ISemester } from "../types/ISemester";
import AddCourse from "./AddCourse";
import ClassCard from "./ClassCard";

interface SemesterProps {
  semester: ISemester;
  handleDeleteSemester: (number: number, season: string) => Promise<void>;
  handleAddCourse: (semester: ISemester, course: ICourseIdentifier) => Promise<void>;
  handleDeleteCourse: (semester: ISemester, course: ICourse) => Promise<void>;
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
        {semester.courses.map((course) => (
          <ClassCard
            key={course._id}
            semester={semester}
            course={course}
            handleDeleteCourse={props.handleDeleteCourse}
          />
        ))}
        <AddCourse semester={semester} handleAddCourse={props.handleAddCourse} />
      </Box>
    </Box>
  );
}
