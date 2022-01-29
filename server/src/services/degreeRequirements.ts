export interface Requirement{
    type: string;
    requirements?: Requirement[];
    name?: string;
    assignedCourse?: Course;
    satisfied?: boolean;
    customRequirementName?: string;
    customRequirementParameter?: string;
    courseCode?: string;
    exclusive?: boolean;
    satisfyingCourses?: Course[];
}

export interface Course {
    code: string;
}

export interface Degree{
    name: string;
    requirements: Requirement;
}

const course_codes_equal = (code1: string, code2: string) => {
    return code1 === code2;
}

export const reset_satisfied = (requirements: Requirement) => {
    if(requirements.requirements){
        requirements.requirements.forEach(req => {
            req.assignedCourse = undefined;
            reset_satisfied(req);
        });
    }
}

export const satisfied_by = (requirement: Requirement, course: Course): boolean => {
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

export const assign_course_options = (requirement: Requirement, courses: Course[]): Requirement => {
    requirement.satisfyingCourses = courses.filter(course => satisfied_by(requirement, course));
    return requirement;
}

/*
 *  
*/
export const assign_courses = (courses: Course[], requirement: Requirement): Requirement => {

    // First, assign 
    switch(requirement.type.toLowerCase()){
        case "all":
        case "any":
            requirement.requirements!.forEach(req => assign_courses(courses, req));     
            break;
        default:
            assign_course_options(requirement, courses);
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