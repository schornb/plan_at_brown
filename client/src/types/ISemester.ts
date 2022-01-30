import ICourse from "./ICourse";

export interface ISemester {
  courses: ICourse[];
  completed: boolean;
}
