import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import IUser from "./types/IUser";
import Semester from "./components/Semester";
import { ISemester } from "./types/ISemester";
import { Button } from "@mui/material";
import ISemesterIdentifier from "./types/ISemesterIdentifier";

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
      setSemester(resJson.semesters);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleAddSemester() {
    const semester: ISemesterIdentifier = {
      number: 2021,
      season: "Spring",
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
    console.log(semesters);
  }

  return (
    <div className="App">
      <Header user={user} />
      {user ? <Semester user={user} /> : null}
      <Button onClick={handleAddSemester}>Add Semester</Button>
    </div>
  );
}

export default App;
