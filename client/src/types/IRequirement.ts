export default interface IRequirement {
  type: string;
  requirements?: IRequirement[];
  name?: string;
  assignedCourse?: string;
  satisfied?: boolean;
  customRequirementName?: string;
  customRequirementParameter?: string;
  courseCode?: string;
  exclusive?: boolean;
  satisfyingCourses?: string[];
}
