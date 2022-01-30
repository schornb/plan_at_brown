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

  return (
    <div className="App">
      <Header user={user} />
      <ClassCard></ClassCard>
    </div>
  );
}

export default App;
