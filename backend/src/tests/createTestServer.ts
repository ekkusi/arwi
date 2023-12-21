import request from "supertest";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { DocumentNode, FormattedExecutionResult, print } from "graphql";
import { PrismaClient } from "@prisma/client";
import { v4 } from "uuid";
import { execSync } from "child_process";
import createApp from "../app";
import { CustomContext } from "../types/contextTypes";

export type TestGraphQLRequest = <TData = any, TVariables = any>(
  query: DocumentNode | TypedDocumentNode<TData, TVariables>,
  variables?: TVariables
) => Promise<FormattedExecutionResult<TData>>;

const createPrismaClient = async () => {
  // const generateDatabaseURL = (schema: string) => {
  //   const url = new URL(process.env.DATABASE_URL);
  //   url.searchParams.append("schema", schema);
  //   return url.toString();
  // };

  if (!process.env.DATABASE_URL) {
    throw new Error("please provide a database url");
  }
  const url = new URL(process.env.DATABASE_URL);
  const schemaId = `test-${v4()}`;

  url.searchParams.append("schema", schemaId);
  const urlStr = url.toString();
  process.env.DATABASE_URL = urlStr;
  const prisma = new PrismaClient({
    datasources: { db: { url: urlStr } },
    log: ["query", "info", "warn"],
  });

  await prisma.$transaction(async (newPrisma) => {
    await newPrisma.$executeRawUnsafe(`CREATE SCHEMA IF NOT EXISTS "${schemaId}";`);
    await newPrisma.$executeRawUnsafe(`SET search_path TO "${schemaId}";`);
    await newPrisma.$executeRawUnsafe(`DROP EXTENSION IF EXISTS "uuid-ossp";`);
    await newPrisma.$executeRawUnsafe(`CREATE EXTENSION "uuid-ossp" SCHEMA "${schemaId}";`);
  });

  const output = execSync(`echo $DATABASE_URL`, {
    env: {
      ...process.env,
      DATABASE_URL: urlStr,
    },
  });
  console.log("Database URL: ", output.toString());

  execSync(`npx prisma migrate dev`, {
    env: {
      ...process.env,
      DATABASE_URL: urlStr,
      DEBUG: "1",
    },
  });

  return { prisma, schemaId };
};

const createServer = async () => {
  // const { schemaId, prisma } = await createPrismaClient();
  const agent = request.agent(await createApp());

  // const cleanUpServer = async () => {
  //   await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE;`);
  //   await prisma.$disconnect();
  // };

  const graphqlRequest: TestGraphQLRequest = async <TData = any, TVariables = any>(
    query: DocumentNode | TypedDocumentNode<TData, TVariables>,
    variables?: TVariables
  ) => {
    const queryStr = print(query);

    const res = await agent.post("/graphql").send({ query: queryStr, variables });
    return res.body as FormattedExecutionResult<TData>;
  };

  return { graphqlRequest };
};

export default createServer;
