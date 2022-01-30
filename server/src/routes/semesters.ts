import { Router } from "express";
import { IUser, User, ISemester } from "../models/User";

const router = Router();

interface ISemesterIdentifier {
  number: number;
  season: string;
}

/* 
  Gets all of the courses by semester, in the form ISemester[]
*/
router.get("/", (req, res) => {
  const user = req.user as IUser;
  res.json(user.semesters);
});

/*
  Adds a semester to the user's semesters
*/
router.put("/", async (req, res) => {
  const user = req.user as IUser;
  const semester = req.body as ISemesterIdentifier;
  const newSemester: ISemester = {
    courses: [],
    completed: false,
    number: semester.number,
    season: semester.season,
  };
  user.semesters.push(newSemester);
  await User.findByIdAndUpdate(user._id, user);
  res.json(user.semesters);
});

/* 
  Deletes the semester with the given number and season
*/
router.delete("/", async (req, res) => {
  const user = req.user as IUser;
  const semester = req.body as ISemesterIdentifier;
  user.semesters = user.semesters.filter(
    (s) => !(s.number === semester.number && s.season === semester.season)
  );
  await User.findByIdAndUpdate(user._id, user);
  res.json(user.semesters);
});

export default router;
