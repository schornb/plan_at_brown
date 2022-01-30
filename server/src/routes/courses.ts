import { Router } from "express";
import { IUser, User } from "../models/User";
import { Course, ICourse } from "../models/Course";
import { getCoursesFromUser } from "../services/users";

const router = Router();

interface ICourseIdentifier {
  courseId: string;
  semesterNumber: number;
}

/* 
  Gets all of the courses, not by semester
*/
router.get("/", (req, res) => {
  const user = req.user as IUser;
  const courses: ICourse[] = getCoursesFromUser(user);
  res.send(courses);
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
