import { Requirement } from 'src/models/Degree';
import { ICourse } from 'src/models/Course';

const course_codes_equal = (code1: string, code2: string) => {
    return code1 === code2;
}

export const reset_satisfied = (requirement: Requirement) => {
    if(requirement.requirements){
        requirement.requirements.forEach(req => {
            req.assignedCourse = undefined;
            reset_satisfied(req);
        });
    }
}

export const satisfied_by = (requirement: Requirement, course: ICourse): boolean => {
    switch(requirement.type.toLowerCase())
    {
        case "custom":
            return false; //TODO
        case "course":
            return course_codes_equal(course.code, requirement.courseCode!);
        default:
            throw new Error("Unknown requirement type: " + requirement.type);
    }
}

export const assign_course_options = (requirement: Requirement, courses: ICourse[]): Requirement => {
    requirement.satisfyingCourses = courses.filter(course => satisfied_by(requirement, course)).map(c => c.name);
    return requirement;
}

/*
 *  
*/
export const assign_courses = (courses: ICourse[], requirement: Requirement): Requirement => {

    // First, assign 
    switch(requirement.type.toLowerCase()){
        case "all":
        case "any":
            requirement.requirements!.forEach(req => req = assign_courses(courses, req));     
            break;
        default:
            requirement = assign_course_options(requirement, courses);
    }
    return requirement;
}

export const is_satisfied = (requirement: Requirement): boolean => {
    switch(requirement.type.toLowerCase()){
        case "all":
            return requirement.requirements!.every(req => is_satisfied(req));
        case "any":
            return requirement.requirements!.some(req => is_satisfied(req));
        case "custom":
            return false; //TODO
        case "course":
            return requirement.assignedCourse !== undefined;
        default:
            throw new Error("Unknown requirement type: " + requirement.type);
    }
}