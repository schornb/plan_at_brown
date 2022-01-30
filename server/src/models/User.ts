import mongoose from "mongoose";
import { CourseSchema, ICourse } from "./Course";
import { IDegree, Requirement } from "./Degree";

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
  givenName: {
    type: String,
    required: true,
  },
  familyName: {
    type: String,
    required: true,
  },
  semesters: [
    {
      courses: [CourseSchema],
      completed: Boolean,
      number: Number,
      season: String,
    },
  ],
  degrees: [
    {
      degree: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Degrees",
      },
      satisfactions: Object, // JSON Object with value of Requirement
      degreeTotal: Number,
      degreeProgress: Number,
    },
  ],
});

export interface ISemester {
  _id?: string;
  courses: ICourse[];
  completed: boolean;
  number: number;
  season: string;
}

export interface IUser {
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

export const User = mongoose.model<IUser>("Users", UserSchema);
