import Mongoose from "mongoose";

export const CourseSchema = new Mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  crn: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  prerequisites: {
    type: [String],
    required: false,
  },
  corequisites: {
    type: [String],
    required: false,
  },
  department: {
    type: String,
    required: true,
  },
  semesters: [String],
});

export interface ICourse {
  name: string;
  code: string;
  crn: string;
  description?: string;
  prerequisites?: string[];
  corequisites?: string[];
  department: string;
  semesters: string[];
}

export const Course = Mongoose.model("Courses", CourseSchema);
