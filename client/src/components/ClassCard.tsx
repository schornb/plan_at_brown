import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ICourse from "../types/ICourse";
import { Button } from "@mui/material";
import { ISemester } from "../types/ISemester";

interface ClassCardProps {
  semester: ISemester;
  course: ICourse;
  handleDeleteCourse: (semester: ISemester, course: ICourse) => Promise<void>;
}

export default function ClassCard(props: ClassCardProps) {
  let { course } = props;
  return (
    <Card sx={{ background: "linear-gradient(#26c3eb, #6dd5ed)", m: 2 }}>
      <CardContent>
        <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
          {course.department}
        </Typography>
        <Typography color="#292e30" variant="h5" component="div">
          {course.code}
        </Typography>
        <Typography color="#292e30" variant="body2">
          {course.name}
        </Typography>
        <Button onClick={() => props.handleDeleteCourse(props.semester, course)}>Delete</Button>
      </CardContent>
    </Card>
  );
}
