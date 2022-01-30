import { Button, Modal, Box, FormControl, TextField } from "@mui/material";
import * as React from "react";
import ICourse from "../types/ICourse";
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
  const handleClose = () => setOpen(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchedCourses, setSearchedCourses] = React.useState<ICourse[]>([]);
  const handleOpen = () => {
    setOpen(true);
    setSearchTerm("");
    setSearchedCourses([]);
  };
  const handleUpdateSearchTerm = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(event.target.value);

  const handleSubmitForm = (courseId: string | undefined) => {
    if (!courseId) {
      return;
    }
    props.handleAddCourse(props.semester, {
      courseId: courseId,
      semesterId: props.semester._id,
    });

    setOpen(false);
  };

  const handleSearchSubmit = async () => {
    // get the update search results
    const res = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/courses/search?q=${searchTerm}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const courses = await res.json();
    setSearchedCourses(courses);
  };

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
            <TextField
              id="outlined-search"
              label="Search field"
              type="search"
              onChange={handleUpdateSearchTerm}
            />
            <Button onClick={handleSearchSubmit}>Search</Button>
            <Box
              mb={2}
              sx={{
                display: "flex",
                flexDirection: "column",
                overflowY: "scroll",
              }}
              height={200}
            >
              {searchedCourses.map((course) => (
                <Button
                  key={course._id + "-search"}
                  onClick={async () => {
                    // await setCourseId(course._id);
                    handleSubmitForm(course._id);
                    handleClose();
                  }}
                >
                  {course.name}
                </Button>
              ))}
            </Box>
          </FormControl>
        </Box>
      </Modal>
    </div>
  );
}
