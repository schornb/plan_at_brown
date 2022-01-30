import React, { useEffect } from "react";
import ClassCard from "./components/ClassCard";
import "./App.css";
import Header from "./components/Header";
import IUser from "./types/IUser";
import Semester from "./components/Semester";
import { ISemester } from "./types/ISemester";
import { Button } from "@mui/material";
import ISemesterIdentifier from "./types/ISemesterIdentifier";
import AddSemester from "./components/AddSemester";

function App() {
  const [user, setUser] = React.useState<IUser | undefined>();
  const [semesters, setSemester] = React.useState<ISemester[]>([]);

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
          getSemesters();
        } else {
          console.error("User auth failed");
        }
      } catch (err) {
        console.error(err);
      }
    }
    getUser();
  }, []);

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
      await setSemester(resJson.semesters);
      console.log(resJson.semesters);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleAddSemester(number: number | undefined, season: string | undefined) {
    if (number && season) {
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
        getSemesters();
      }
    }
  }

  return (
    <div className="App">
      <Header user={user} />
      {user ? <Semester user={user} /> : null}
      <AddSemester handleAddSemester={handleAddSemester} />
      {/* <Button onClick={handleAddSemester}>Add Semester</Button> */}
      <ClassCard></ClassCard>
    </div>
  );
}

export default App;
