import { Router } from "express";
import { IUser, User } from "../models/User";
import { Course, ICourse } from "../models/Course";
import { getCoursesFromUser } from "../services/users";
import { requireAuth } from "../middleware/auth";
import { query } from "express-validator";

const router = Router();

interface ICourseIdentifier {
  courseId: string;
  semesterId: string;
}

/* 
  Gets all of the courses, not by semester
*/
router.get("/", requireAuth, (req, res) => {
  const user = req.user as IUser;
  const courses: ICourse[] = getCoursesFromUser(user);
  res.send(courses);
});

/* 
  Gets all of the courses, not by semester
*/
router.get("/all", async (_req, res) => {
  const courses = await Course.find();
  res.send(courses);
});

/* 
  Adds a course to a given semester
*/
router.put("/", async (req, res) => {
  const user = req.user as IUser;
  const courseIdentifier = req.body as ICourseIdentifier;
  const courseId = courseIdentifier.courseId;
  const semesterNumber = courseIdentifier.semesterId;
  const course = await Course.findById(courseId);
  user.semesters.forEach((semester) => {
    if (semester._id == semesterNumber) {
      semester.courses.push(course);
    }
  });

  await User.findByIdAndUpdate(user._id, user);
  console.log(user.semesters[0].courses);
  res.send(user.semesters);
});

/**
 * Removes a course from a given semester
 */
router.delete("/", async (req, res) => {
  const user = req.user as IUser;
  const courseIdentifier = req.body as ICourseIdentifier;
  const courseId = courseIdentifier.courseId;
  const semesterNumber = courseIdentifier.semesterId;

  // filter out the course from the user's semesters
  user.semesters.forEach((semester) => {
    if (semester._id == semesterNumber) {
      semester.courses = semester.courses.filter((course) => course._id != courseId);
    }
  });

  await User.findByIdAndUpdate(user._id, user);
  res.send(user.semesters);
});
/*
  Searches for a course by name
*/
router.get("/search", query("q").isString(), async (req, res) => {
  if (!req.query) {
    res.status(400).send("No query provided");
    return;
  }

  // Search by name and code
  const courses = await Course.find({
    $or: [
      { name: { $regex: req.query.q, $options: "i" } },
      { code: { $regex: req.query.q, $options: "i" } },
    ],
  });
  res.send(courses);
});

export default router;
