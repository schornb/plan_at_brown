import { Router } from "express";
import { IUser } from "../models/User";
import { ICourse } from "../models/Course";
import { getCoursesFromUser } from "../services/users";
import { Degree } from "../models/Degree";
import { getRecommendedDegrees } from "../services/users";

const router = Router();

/* 
  Returns a list of concentrations for the current user based on the courses they have taken
*/
router.get("/concentrations", async (req, res) => {
  const user = req.user as IUser;
  const courses: ICourse[] = getCoursesFromUser(user);
  const concentrations = await Degree.find();
  const recommendedDegrees = getRecommendedDegrees(courses, concentrations);

  res.send(recommendedDegrees);
});

export default router;
