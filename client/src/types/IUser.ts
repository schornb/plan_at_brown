import IDegree, { Requirement } from "./IDegree";
import { ISemester } from "./ISemester";

export default interface IUser {
  _id: string;
  googleId: string;
  name: string;
  email: string;
  picture: string;
  givenName: string;
  familyName: string;
  semesters: ISemester[];
  degrees: { degree: IDegree; satisfactions: Requirement }[];
}
