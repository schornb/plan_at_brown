import { Router } from "express";
import { IUser, User, ISemester } from "../models/User";

const router = Router();

const SEASONS = ["fall", "winter", "spring", "summer"];

interface ISemesterIdentifier {
  number: number;
  season: string;
}

/* 
  Gets all of the courses by semester, in the form ISemester[]
*/
router.get("/", (req, res) => {
  const user = req.user as IUser;
  res.send(user.semesters);
});

/*
  Adds a semester to the user's semesters
*/
router.put("/", async (req, res) => {
  const user = req.user as IUser;
  const semester = req.body as ISemesterIdentifier;

  if (!SEASONS.includes(semester.season.toLowerCase())) {
    res.status(400).send("Invalid season");
    return;
  }

  // Check if semester already exists
  const semesterExists = user.semesters.some(
    (s) => s.number === semester.number && s.season === semester.season
  );
  if (semesterExists) {
    res.status(400).send("Semester already exists");
    return;
  }

  const newSemester: ISemester = {
    courses: [],
    completed: false,
    number: semester.number,
    season: semester.season,
  };
  user.semesters.push(newSemester);
  await User.findByIdAndUpdate(user._id, user);
  res.send(user.semesters);
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
  res.send(user.semesters);
});

export default router;
