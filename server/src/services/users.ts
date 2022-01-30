import { IDegree } from "src/models/Degree";
import { ICourse } from "../models/Course";
import { IUser } from "../models/User";
import { assign_courses, getNumberAssigned } from "../services/degreeRequirements";

const NUMBER_RECOMMENDED_DEGREES = 3;

export const getCoursesFromUser = (user: IUser): ICourse[] => {
  const courses: ICourse[] = [];
  for (const semester of user.semesters) {
    for (const course of semester.courses) {
      courses.push(course);
    }
  }
  return courses;
};

export const getRecommendedDegrees = (courses: ICourse[], degrees: IDegree[]): IDegree[] => {
  const recommendedDegrees: { degree: IDegree; count: number }[] = [];
  degrees.forEach((degree) => {
    const assigned = assign_courses(courses, degree.requirements);
    const number = getNumberAssigned(assigned);
    recommendedDegrees.push({ degree, count: number });
  });

  return recommendedDegrees
    .sort((a) => a.count)
    .map((a) => a.degree)
    .slice(0, NUMBER_RECOMMENDED_DEGREES);
};
