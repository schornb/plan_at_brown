import { Router } from "express";
import { Degree } from "../models/Degree";
import { IUser, User } from "../models/User";

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

export default router;
