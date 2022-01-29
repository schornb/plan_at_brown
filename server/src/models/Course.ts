import Mongoose from "mongoose";

const CourseSchema = new Mongoose.Schema({
    name: {
        type: String,
        required: true   
    },
    code: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    prerequisites: {
        type: [String],
        required: false
    },
    corequisites: {
        type: [String],
        required: false
    },
    department: {
        type: String,
        required: true
    }
});

export interface ICourse {
    name: string;
    code: string;
    description: string;
    prerequisites: string[];
    corequisites: string[];
    department: string;
}

export const Course = Mongoose.model('Courses', CourseSchema);