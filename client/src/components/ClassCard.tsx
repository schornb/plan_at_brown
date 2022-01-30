import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ICourse from "../types/ICourse";

interface ClassCardProps {
  course: ICourse;
}

export default function ClassCard({ course }: ClassCardProps) {
  return (
    <Card sx={{ background: "linear-gradient(#26c3eb, #6dd5ed)" }}>
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
      </CardContent>
    </Card>
  );
}
