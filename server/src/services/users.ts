import { ICourse } from "../models/Course";
import { IUser } from "../models/User";

export const getCoursesFromUser = (user: IUser): ICourse[] => {
  const courses: ICourse[] = [];
  for (const semester of user.semesters) {
    for (const course of semester.courses) {
      courses.push(course);
    }
  }
  return courses;
};
