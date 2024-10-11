import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    name: string;
    id: string;
    employeeId: string;
    email: string;
    role: string;
  }
  interface Session {
    user: User & {
      userId: string;
      employeeId: string;
      name: string;
      email: string;
      role: string;
    };
    token: {
      id: string;
      employeeId: string;
      name: string;
      email: string;
      role: string;
    };
  }
}
