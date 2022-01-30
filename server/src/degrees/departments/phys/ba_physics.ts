import { IDegree } from "src/models/Degree";
import { Requirement } from "src/models/Degree";

const requirements: Requirement = {
  name: "Physics",
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
              courseCode: "PHYS0070",
            },
            {
              type: "course",
              courseCode: "PHYS0160",
            },
          ],
        },
        {
          type: "all",
          requirements: [
            {
              type: "course",
              courseCode: "PHYS0050",
            },
            {
              type: "course",
              courseCode: "PHYS0060",
            },
          ],
        },
        {
          type: "all",
          requirements: [
            {
              type: "course",
              courseCode: "PHYS0030",
            },
            {
              type: "course",
              courseCode: "PHYS0040",
            },
          ],
        },
      ],
    },
    {
      type: "course",
      courseCode: "PHYS0470",
    },
    {
      type: "course",
      courseCode: "PHYS0500",
    },
    {
      type: "course",
      courseCode: "PHYS0560",
    },
    {
      type: "course",
      courseCode: "PHYS1410",
    },
    {
      type: "course",
      courseCode: "PHYS1530",
    },
  ],
};

const degree: IDegree = {
  name: "B.A. Physics",
  requirements: requirements,
  department: "PHYS",
};

export default degree;
