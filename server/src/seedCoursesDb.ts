// Danger! Don't seed the database with the same data twice. :)
process.exit(0);

import dotenv from "dotenv";
import { Course } from "./models/Course";

dotenv.config();

if (!process.env.MONGO_URI) {
  console.error("Environment variables are not properly setup!");
  process.exit(1);
}

// Setup GCP MongoDB
import "./config/mongo";

// Read courses from courses_complete.json
import courses from "../../scraping/data/courses_complete.json";

// Loop over courses and create new Course objects
const coursesToSave = courses.map((course) => {
  return new Course({
    name: course.title,
    code: course.code,
    crn: course.crn,
    department: course.code.split(" ")[0],
    semesters: course.semesters,
  });
});

// Save courses to database
Course.insertMany(coursesToSave)
  .then(() => {
    console.log("Courses successfully saved to database!");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
