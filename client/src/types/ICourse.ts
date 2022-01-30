export default interface ICourse {
  _id?: string;
  name: string;
  code: string;
  description: string;
  prerequisites: string[];
  corequisites: string[];
  department: string;
}
