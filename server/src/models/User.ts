import mongoose from "mongoose";
import { ICourse } from "./Course";
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
      courses: [
        {
          course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Courses",
          },
        },
      ],
      completed: Boolean,
    },
  ],
  degrees: [
    {
      degree: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Degrees",
      },
      satisfactions: Object, // JSON Object with value of Requirement
    },
  ],
});

export interface ISemester {
  courses: ICourse[];
  completed: boolean;
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
