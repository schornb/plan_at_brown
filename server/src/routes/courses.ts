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

  const courses = await Course.find({
    name: { $regex: req.query.q, $options: "i" },
  })
    .limit(10)
    .exec();
  res.send(courses);
});

export default router;
