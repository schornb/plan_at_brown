import { Router } from "express";
import { IUser, User } from "../models/User";
import { Course } from "../models/Course";

const router = Router();

interface ICourseIdentifier {
  courseId: string;
  semesterNumber: number;
}

/* 
  Gets all of the courses by semester, in the form ISemester[]
*/
router.get("/", (req, res) => {
  const user = req.user as IUser;
  res.json(user.semesters);
});

/* 
  Adds a course to a given semester
*/
router.put("/", async (req, res) => {
  const user = req.user as IUser;
  const courseIdentifier = req.body as ICourseIdentifier;
  const courseId = courseIdentifier.courseId;
  const semesterNumber = courseIdentifier.semesterNumber;
  const course = await Course.findById(courseId);

  user.semesters.forEach((semester) => {
    if (semester.number === semesterNumber) {
      semester.courses.push(course);
    }
  });

  await User.findByIdAndUpdate(user._id, user);
  res.send(user.semesters);
});

export default router;
