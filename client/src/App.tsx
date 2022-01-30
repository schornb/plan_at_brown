import React, { useEffect } from "react";
import Header from "./components/Header";
import IUser from "./types/IUser";
import Semester from "./components/Semester";
import { ISemester } from "./types/ISemester";
import ISemesterIdentifier from "./types/ISemesterIdentifier";
import AddSemester from "./components/AddSemester";
import { ICourseIdentifier } from "./types/ICourseIdentifier";
import ICourse from "./types/ICourse";

function App() {
  const [user, setUser] = React.useState<IUser | undefined>();
  const [semesters, setSemesters] = React.useState<ISemester[]>([]);

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

  return (
    <div className="App">
      <Header user={user} />
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
    </div>
  );
}

export default App;
