// import { graphql } from "@/gql";
// import { Teacher } from "@/gql/graphql";
// import graphqlClient from "@/graphql-client";
// import { hash } from "bcrypt";
// import { NextApiRequest, NextApiResponse } from "next";
// import { BRCRYT_SALT_ROUNDS } from "./auth/[...nextauth]";

// const Register_RegisterTeacherMutation = graphql(`
//   mutation Register_RegisterTeacher(
//     $name: String!
//     $email: Email!
//     $passwordHash: String!
//   ) {
//     teacherCreate(
//       input: { name: $name, email: $email, passwordHash: $passwordHash }
//     ) {
//       teacher {
//         id
//         email
//         name
//         passwordHash
//       }
//     }
//   }
// `);

// const Register_GetTeacherQuery = graphql(`
//   query Register_GetTeacher($email: Email!) {
//     teacher(by: { email: $email }) {
//       email
//       id
//       name
//     }
//   }
// `);

// // type RegisterResponse = Omit<Teacher, "passwordHash">;
// type PlainTeacher = Omit<
//   Teacher,
//   "passwordHash" | "updatedAt" | "createdAt" | "class"
// >;
// type RegisterResponse = { message: string } | PlainTeacher;

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<RegisterResponse>
// ) {
//   if (req.method !== "POST") {
//     res.setHeader("Allow", ["POST"]);
//     return res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
//   const data = JSON.parse(req.body) as {
//     email?: string;
//     password?: string;
//     name?: string;
//   };
//   if (!data.email || !data.name || !data.password) {
//     return res.status(400).json({
//       message: `Annetusta datasta puuttuu jokin seuraavista kentistä: email, name, password`,
//     });
//   }
//   const { teacher: matchingTeacher } = await graphqlClient.request(
//     Register_GetTeacherQuery,
//     {
//       email: data.email,
//     }
//   );

//   if (matchingTeacher) {
//     return res.status(400).json({
//       message: `Sähköposti ${data.email} on jo käytössä`,
//     });
//   }

//   const passwordHash = await hash(data.password, BRCRYT_SALT_ROUNDS);

//   const { teacherCreate } = await graphqlClient.request(
//     Register_RegisterTeacherMutation,
//     {
//       email: data.email,
//       name: data.name,
//       passwordHash,
//     }
//   );

//   if (!teacherCreate?.teacher) {
//     return res.status(500).json({
//       message: `Odottamaton virhe opettajan luonnissa.`,
//     });
//   }

//   const { passwordHash: notReturnedPasswords, ...returnData } =
//     teacherCreate.teacher;

//   return res.status(200).json(returnData);
// }

export default {};
