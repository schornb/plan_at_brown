import { Requirement } from "../models/Degree";
import { ICourse } from "../models/Course";
import customRequirementsDictionary from "./customRequirements";

const stripString = (str: string) => str.replace(" ", "").toUpperCase();

const course_codes_equal = (code1: string, code2: string) => {
  return stripString(code1) === stripString(code2);
};

export const reset_satisfied = (requirement: Requirement) => {
  if (requirement.requirements) {
    requirement.requirements.forEach((req) => {
      req.assignedCourse = undefined;
      reset_satisfied(req);
    });
  }
};

const custom_course_satisfied = (course: ICourse, requirement: Requirement): boolean => {
  if (!(requirement.customRequirementName! in customRequirementsDictionary)) {
    throw new Error("Custom requirement not found: " + requirement.customRequirementName);
  }
  return customRequirementsDictionary.get(requirement.customRequirementName!)!(
    course,
    requirement.customRequirementParameter
  );
};

export const satisfied_by = (requirement: Requirement, course: ICourse): boolean => {
  console.log(requirement);
  switch (requirement.type.toLowerCase()) {
    case "custom":
      return custom_course_satisfied(course, requirement); //TODO
    case "course":
      return course_codes_equal(course.code, requirement.courseCode!);
    default:
      throw new Error("Unknown requirement type: " + requirement.type);
  }
};

export const assign_course_options = (
  requirement: Requirement,
  courses: ICourse[]
): Requirement => {
  requirement.satisfyingCourses = courses
    .filter((course) => satisfied_by(requirement, course))
    .map((c) => c.code);
  return requirement;
};

/*
 * Assigns all of the possible satisfying courses to every edge course requirement
 */
export const assign_courses = (courses: ICourse[], requirement: Requirement): Requirement => {
  // First, assign
  switch (requirement.type.toLowerCase()) {
    case "all":
    case "any":
      requirement.requirements!.forEach((req) => (req = assign_courses(courses, req)));
      break;
    default:
      requirement = assign_course_options(requirement, courses);
  }
  return requirement;
};

export const assign_best_guess_courses = (
  courses: ICourse[],
  requirement: Requirement
): Requirement => {
  // First, assign all of the possible courses to every course
  const requirementsWithOptions = assign_courses(courses, requirement);
  // Create a set of courses
  const coursesSet = new Set(courses.map((c) => c.code));
  // Then, assign the best guess to every course, starting with courses with strictly 1 and then 2 satisfying requirements and are exclusive
  const assign_first_if_limited = (
    req: Requirement,
    usedCourses: Set<ICourse>,
    courses: ICourse[],
    limit: number
  ) => {
    if (req.type == "course" || req.type == "custom") {
      if (req.satisfyingCourses!.length <= limit) {
        for (let i = 0; i < req.satisfyingCourses!.length; i++) {
          if (coursesSet.has(req.satisfyingCourses![i])) {
            req.assignedCourse = req.satisfyingCourses![i];
            usedCourses.add(courses.find((c) => c.code === req.assignedCourse!)!);
            break;
          }
        }
      }
    } else {
      req.requirements!.forEach((req) => assign_first_if_limited(req, usedCourses, courses, limit));
    }
  };

  assign_first_if_limited(requirementsWithOptions, new Set(), courses, 1);
  assign_first_if_limited(requirementsWithOptions, new Set(), courses, 2);
  assign_first_if_limited(requirementsWithOptions, new Set(), courses, 999);

  return requirementsWithOptions;
};

export const is_satisfied = (requirement: Requirement): boolean => {
  switch (requirement.type.toLowerCase()) {
    case "all":
      return requirement.requirements!.every((req) => is_satisfied(req));
    case "any":
      return requirement.requirements!.some((req) => is_satisfied(req));
    case "custom":
      return false; //TODO
    case "course":
      return requirement.assignedCourse !== undefined;
    default:
      throw new Error("Unknown requirement type: " + requirement.type);
  }
};

export const getNumberAssigned = (requirement: Requirement): number => {
  switch (requirement.type.toLowerCase()) {
    case "all":
      return requirement.requirements!.reduce((acc, req) => acc + getNumberAssigned(req), 0);
    case "any":
      return requirement.requirements!.reduce((acc, req) => acc + getNumberAssigned(req), 0);
    case "custom":
      return 0; //TODO
    case "course":
      return requirement.assignedCourse ? 1 : 0;
    default:
      throw new Error("Unknown requirement type: " + requirement.type);
  }
};
