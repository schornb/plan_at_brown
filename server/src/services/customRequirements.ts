import { ICourse } from "../models/Course";

const customRequirementsDictionary: Map<string, (course: ICourse, parameter?: string) => boolean> =
  new Map();

customRequirementsDictionary.set("level_greater", (course: ICourse, parameter?: string) => {
  if (!parameter) {
    throw new Error("Missing parameter for level_greater");
  }
  const split = parameter.split(",");
  const level = parseInt(split[1]);
  const department = split[0].toLowerCase();
  return (
    course.department.toLowerCase() === department && parseInt(course.code.split(" ")[1]) >= level
  );
});

export default customRequirementsDictionary;
