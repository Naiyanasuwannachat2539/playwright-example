import { User } from "../interfaces/user";

export const userData: User = {
  username: "bancha",
  password: "123456",
};
export const inactiveUsers: User[] = [
  { username: "jomyut", 
    password: "123456", 
    error_message: "ล็อกอินถูกระงับ"
  },
  {
    username: "ice",
    password: "123456",
    error_message:"ล็อกอินหรือรหัสผ่านไม่ถูกต้อง"
  },
];

