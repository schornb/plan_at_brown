export default interface ICourse {
  name: string;
  code: string;
  description: string;
  prerequisites: string[];
  corequisites: string[];
  department: string;
}
