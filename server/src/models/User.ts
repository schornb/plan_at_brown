import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
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
      satisfications: Object, // JSON Object with value of Requirement
    },
  ],
});

export interface Semester {
  courses: mongoose.Types.ObjectId[];
  completed: boolean;
}

export interface IUser extends Document {
  name: string;
  email: string;
  semesters: Semester;
}

export const User = mongoose.model("Users", UserSchema);
