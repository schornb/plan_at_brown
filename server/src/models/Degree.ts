import mongoose from 'mongoose';

const DegreeSchema = new mongoose.Schema({
    name: String,
    requirements: {
        type: Object,
        required: true
    },
    department: String
});

export interface IDegree {
    name: string;
    requirements: Requirement;
    department: string;
}

export interface Requirement{
    type: string;
    requirements?: Requirement[];
    name?: string;
    assignedCourse?: string;
    satisfied?: boolean;
    customRequirementName?: string;
    customRequirementParameter?: string;
    courseCode?: string;
    exclusive?: boolean;
    satisfyingCourses?: string[];
}

export const Degree = mongoose.model('Degrees', DegreeSchema);