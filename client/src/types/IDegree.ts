export default interface IDegree {
  name: string;
  requirements: Requirement;
  department: string;
}

export interface Requirement {
  type: string;
  requirements?: Requirement[];
  name?: string;
  assignedCourse?: string;
  satisfied?: boolean;
  customRequirementName?: string;
  customRequirementParameter?: string;
  courseCode?: string;
  exclusive?: boolean;
  satisfyingCourses?: string[];
}
