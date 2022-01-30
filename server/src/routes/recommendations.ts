import { Router } from "express";
import { IUser, User } from "../models/User";
import { Course, ICourse } from "../models/Course";
import { getCoursesFromUser } from "../services/users";

const router = Router();

/* 
  Returns a list of concentrations for the current user based on the courses they have taken
*/
router.get("/concentrations", (req, res) => {
  const user = req.user as IUser;
  const courses: ICourse[] = getCoursesFromUser(user);
  res.send(courses);
});

export default router;
