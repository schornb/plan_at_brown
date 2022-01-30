import { Router } from "express";
import { getCoursesFromUser } from "../services/users";
import { Degree } from "../models/Degree";
import { IUser, User } from "../models/User";
import { assign_courses } from "../services/degreeRequirements";

const router = Router();

/* 
  Gets degrees and degree status for the current user from the database
*/
router.get("/", (req, res) => {
  const user = req.user as IUser;
  res.send(user.degrees);
});

/*
  Gets all degrees currently in the database (and their corresponding requirements)
*/
router.get("/all", async (_req, res) => {
  const degrees = await Degree.find();
  res.send(degrees);
});

interface IDegreeIdentifier {
  degreeId: string;
}

/*  
  Add a degree to the current user's list of degrees
*/
router.put("/", async (req, res) => {
  const user = req.user as IUser;
  const degreeIdentifier = req.body as IDegreeIdentifier;
  const degreeId = degreeIdentifier.degreeId;
  const degree = await Degree.findById(degreeId);
  const userDegree = {
    degree: degree,
    satisfactions: degree.requirements,
  };
  user.degrees.push(userDegree);
  await User.findByIdAndUpdate(user._id, user);
  res.send(user.degrees);
});

/*  
  Remove a degree from the current user's list of degrees
*/
router.delete("/", async (req, res) => {
  const user = req.user as IUser;
  const degreeIdentifier = req.body as IDegreeIdentifier;
  const degreeId = degreeIdentifier.degreeId;
  user.degrees = user.degrees.filter((degree) => degree.degree._id != degreeId);
  await User.findByIdAndUpdate(user._id, user);
  res.send(user.degrees);
});

/*  
  Add a degree to the current user's list of degrees
*/
router.put("/", async (req, res) => {
  const user = req.user as IUser;
  const degreeIdentifier = req.body as IDegreeIdentifier;
  const degreeId = degreeIdentifier.degreeId;
  const degree = await Degree.findById(degreeId);
  const userDegree = {
    degree: degree,
    satisfactions: degree.requirements,
  };
  user.degrees.push(userDegree);
  await User.findByIdAndUpdate(user._id, user);
  res.send(user.degrees);
});

/*  
  Assigns a users current classes to a given degree
*/
router.post("/assign", async (req, res) => {
  const user = req.user as IUser;
  const degreeIdentifier = req.body as IDegreeIdentifier;
  const courses = getCoursesFromUser(user);
  const degreeId = degreeIdentifier.degreeId;
  const degree = await Degree.findById(degreeId);
  if (!degree) {
    res.status(404).send("Degree not found");
  }
  const degreeSatisfactions = assign_courses(courses, degree.requirements);

  res.send(degreeSatisfactions);
});

export default router;
