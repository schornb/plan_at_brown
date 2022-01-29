import { Degree, Requirement } from "../services/degreeRequirements";


const math_cs_requirements: Requirement = {
    name: "Math CS",
    type: "all",
    requirements: [
        {
            type: "any",
            name: "Intro Sequence",
            requirements: [
                {
                    type: "all",
                    requirements: [{
                        type: "course",
                        courseCode: "CSCI0190"
                    }]
                },
                {
                    type: "all",
                    requirements: [
                    { 
                        type: "course",
                        courseCode: "CSCI0170"
                    },
                    {
                        type: "course",
                        courseCode: "CSCI0180"  
                    }]
                },
                {
                    type: "all",
                    requirements: [
                        {
                            type: "course",
                            courseCode: "CSCI0150"
                        },
                        {
                            type: "course",
                            courseCode: "CSCI0160"
                        }
                    ]
                }
            ]
        }
    ]
};

export const degree_math_cs: Degree = {
    name: "B.S. Mathematics-Computer Science",
    requirements: math_cs_requirements
}