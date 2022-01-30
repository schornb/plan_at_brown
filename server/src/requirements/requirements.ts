import { IDegree } from "src/models/Degree";
import { Requirement } from "src/models/Degree";

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
          requirements: [
            {
              type: "course",
              courseCode: "CSCI0190",
            },
          ],
        },
        {
          type: "all",
          requirements: [
            {
              type: "course",
              courseCode: "CSCI0170",
            },
            {
              type: "course",
              courseCode: "CSCI0180",
            },
          ],
        },
        {
          type: "all",
          requirements: [
            {
              type: "course",
              courseCode: "CSCI0150",
            },
            {
              type: "course",
              courseCode: "CSCI0160",
            },
          ],
        },
      ],
    },
  ],
};

export const degree_math_cs: IDegree = {
  name: "B.S. Mathematics-Computer Science",
  requirements: math_cs_requirements,
  department: "CSCI",
};
