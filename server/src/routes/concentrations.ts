import { Router } from "express";
import { Degree } from "../models/Degree";
import { IUser } from "src/models/User";

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

export default router;
