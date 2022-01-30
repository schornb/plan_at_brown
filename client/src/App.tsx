import React, { useEffect } from "react";
import ClassCard from "./components/ClassCard";
import "./App.css";
import Header from "./components/Header";
import IUser from "./types/IUser";

function App() {
  const [user, setUser] = React.useState<IUser | undefined>();
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
        } else {
          console.error("User auth failed");
        }
      } catch (err) {
        console.error(err);
      }
    }
    getUser();
  }, []);

  function getListOfCoursesForEachSemester() {
    if (!user) {
      return [[]];
    }
    let arr = [];
    for (const semester of user.semesters) {
      let courseList = [];
      for (const course of semester.courses) {
        courseList.push(course);
      }
      arr.push(courseList);
    }
    return arr;
  }
  const semesters = getListOfCoursesForEachSemester();

  return (
    <div className="App">
      <Header user={user} />
      {semesters.map((courseList) => courseList.map((course) => <ClassCard course={course} />))}
    </div>
  );
}

export default App;
