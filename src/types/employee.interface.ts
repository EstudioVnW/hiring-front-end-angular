export interface Employee {
  id: number;
  name: string;
  email: string;
  phone: string;
  department: string;
  role: string;
  dateJoined: string;
  [key: string]: any; 
}