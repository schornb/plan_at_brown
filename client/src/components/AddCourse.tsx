import { Button, Modal, Box, FormControl } from "@mui/material";
import * as React from "react";
import { ICourseIdentifier } from "../types/ICourseIdentifier";
import { ISemester } from "../types/ISemester";

interface AddCourseProps {
  semester: ISemester;
  handleAddCourse: (semester: ISemester, course: ICourseIdentifier) => Promise<void>;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AddCourse(props: AddCourseProps) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // temp
  const [courseId, setCourseId] = React.useState("");

  const handleSubmitForm = () => {
    props.handleAddCourse(props.semester, {
      courseId: courseId,
      semesterId: props.semester._id,
    });

    setOpen(false);
  };

  React.useEffect(() => {
    async function getCourses() {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/courses/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const courses = await response.json();
      setCourseId(courses[0]._id);
    }
    getCourses();
  }, []);

  return (
    <div>
      <Button onClick={handleOpen}>Add Course</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <FormControl fullWidth>
            <Box mb={2} sx={{ display: "flex" }}></Box>
            <Button onClick={handleSubmitForm}>Add</Button>
          </FormControl>
        </Box>
      </Modal>
    </div>
  );
}
