import React, { useEffect } from "react";
import Header from "./components/Header";
import IUser from "./types/IUser";
import Semester from "./components/Semester";
import { ISemester } from "./types/ISemester";
import ISemesterIdentifier from "./types/ISemesterIdentifier";
import AddSemester from "./components/AddSemester";
import { ICourseIdentifier } from "./types/ICourseIdentifier";
import ICourse from "./types/ICourse";
import IRequirement from "./types/IRequirement";
import RequirementComponent from "./components/RequirementComponent";
import Footer from "./components/Footer";

import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import IDegree from "./types/IDegree";
import IDegreeIdentifier from "./types/IDegreeIdentifier";

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

function App() {
  const [user, setUser] = React.useState<IUser | undefined>();
  const [semesters, setSemesters] = React.useState<ISemester[]>([]);
  const [userDegrees, setUserDegrees] = React.useState<IDegree[]>();
  const [selectedDegree, setSelectedDegree] = React.useState<IDegree | undefined>();

  const [degrees, setDegrees] = React.useState<IDegree[]>([]);
  const [degreeAssignment, setDegreeAssignment] = React.useState<IRequirement>();

  // modal logic
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  useEffect(() => {
    async function getUser() {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/auth`, {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": "true",
          },
        });
        if (res.status === 200) {
          const resJson = await res.json();
          setUser(resJson.user);
          setUserDegrees(resJson.user.degrees);
          getSemesters();
          getAllDegrees();
        } else {
          console.error("User auth failed");
        }
      } catch (err) {
        console.error(err);
      }
    }
    getUser();
  }, []);

  async function getAllDegrees() {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/concentrations/all`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "true",
        },
      });

      const resJson = await res.json();
      setDegrees(resJson);
    } catch (err) {
      console.error(err);
    }
  }

  async function getSemesters() {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/semesters`, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "true",
        },
      });
      let resJson = await res.json();
      handleSettingSemesters(resJson);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleAddSemester(number: number | undefined, season: string | undefined) {
    if (!number || !season) {
      console.error("Invalid semester: missing number or season");
      return;
    }
    const semester: ISemesterIdentifier = {
      number,
      season,
    };
    const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/semesters`, {
      method: "PUT",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(semester),
    });
    if (res.status === 200) {
      const resJson = await res.json();
      handleSettingSemesters(resJson);
    }
  }

  async function handleDeleteSemester(number: number, season: string) {
    const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/semesters`, {
      method: "DELETE",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ number, season }),
    });
    if (res.status === 200) {
      const resJson = (await res.json()) as ISemester[];
      handleSettingSemesters(resJson);
    }
  }

  async function handleSettingSemesters(semesters: ISemester[]) {
    semesters.sort((a, b) => a.number - b.number);
    // after sorting by number, sort by season

    setSemesters(semesters);
  }

  async function handleAddCourse(semester: ISemester, course: ICourseIdentifier) {
    const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/courses`, {
      method: "PUT",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(course),
    });
    if (res.status === 200) {
      const resJson = await res.json();
      handleSettingSemesters(resJson);
    }
  }

  async function handleDeleteCourse(semester: ISemester, course: ICourse) {
    const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/courses`, {
      method: "DELETE",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ semesterId: semester._id, courseId: course._id }),
    });
    if (res.status === 200) {
      const resJson = await res.json();
      handleSettingSemesters(resJson);
    }
  }

  async function handleAssignRequirements(){
    const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/concentrations/assign`, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ degreeId: degrees[0]._id }),
    });
    if (res.status === 200) {
      const resJson = await res.json();
      console.log(resJson);
      setDegreeAssignment(resJson);
    }
  }

  async function handleSubmitDegree() {
    handleClose();
    if (selectedDegree) {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/concentrations`, {
        method: "PUT",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ degreeId: selectedDegree._id }),
      });
      if (res.status === 200) {
        const resJson = await res.json();
        setUserDegrees(resJson);
      }
    }
  }

  async function handleDeleteDegree(degree: IDegree) {
    const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/concentrations`, {
      method: "DELETE",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ degreeId: degree.degree._id }),
    });
    if (res.status === 200) {
      const resJson = await res.json();
      setUserDegrees(resJson);
    }
  }


  return (
    <div className="App">
      <Header user={user} />
      {user && userDegrees && userDegrees?.length > 0 && (
        <>
          {userDegrees.map((degree) => (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography>
                {degree.degree.name} {degree.degree.department}
              </Typography>
              <Button onClick={() => handleDeleteDegree(degree)}>Delete</Button>
            </Box>
          ))}
          <Button onClick={handleOpen}>Add Degree</Button>
          <Button onClick={handleAssignRequirements}>Assign Degree Requirements</Button>
          {degreeAssignment && (
            <RequirementComponent requirement={degreeAssignment} /> 
          )}
        </>
      )}
      {user && userDegrees && userDegrees.length == 0 && (
        <Button onClick={handleOpen}>Select Degree</Button>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <FormControl fullWidth sx={{ m: 1, minWidth: 120 }}>
            <Box mb={2} sx={{ display: "flex" }}>
              <InputLabel id="demo-simple-select-label">Degree</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedDegree?.name ? selectedDegree.name : "Degree"}
                placeholder="Select a season"
                label="Degree"
                // onChange={handleChange}
              >
                {degrees &&
                  degrees.map((degree) => (
                    <MenuItem
                      key={degree._id}
                      value={degree.name}
                      onClick={() => setSelectedDegree(degree)}
                    >
                      {degree.name} {degree.department}
                    </MenuItem>
                  ))}
              </Select>
              <Button onClick={handleSubmitDegree}>Save Degree</Button>
            </Box>
          </FormControl>
        </Box>
      </Modal>

      {semesters &&
        semesters.map((semester) => (
          <Semester
            key={semester._id}
            semester={semester}
            handleDeleteSemester={handleDeleteSemester}
            handleAddCourse={handleAddCourse}
            handleDeleteCourse={handleDeleteCourse}
          />
        ))}
      <AddSemester handleAddSemester={handleAddSemester} />
      <Footer />
    </div>
  );
}

export default App;
