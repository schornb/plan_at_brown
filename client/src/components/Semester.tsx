import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { ISemester } from "../types/ISemester";
import IUser from "../types/IUser";

interface SemesterProps {
  user: IUser | undefined;
  //   semester: ISemester;
}

export default function Semester(props: SemesterProps) {
  const { user } = props;
  //   const { semester } = props;
  //   console.log(user);
  //   console.log(semester);

  return <Box></Box>;
}
