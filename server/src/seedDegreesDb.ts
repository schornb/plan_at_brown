// Danger! Don't seed the database with the same data twice. :)
process.exit(0);

import dotenv from "dotenv";

dotenv.config();

if (!process.env.MONGO_URI) {
  console.error("Environment variables are not properly setup!");
  process.exit(1);
}

// Setup GCP MongoDB
import "./config/mongo";

// Read courses from courses_complete.json
import degrees from "./degrees";
import { Degree } from "./models/Degree";

// Loop over courses and create new Course objects
const degreesToSave = degrees.map((degree) => {
  return new Degree({
    name: degree.name,
    department: degree.department,
    requirements: degree.requirements,
  });
});

console.log(degreesToSave);

// Remove all degrees from the database
Degree.deleteMany({}, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
});

// Save degrees to database
Degree.insertMany(degreesToSave)
  .then(() => {
    console.log("Courses successfully saved to database!");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
