import ICourse from "./ICourse";

export interface ISemester {
  _id: string;
  courses: ICourse[];
  completed: boolean;
  number: number;
  season: string;
}
