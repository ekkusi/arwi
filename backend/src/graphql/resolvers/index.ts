import { Resolvers } from "../../types";
import mutationResolvers from "./mutationResolvers";
import queryResolvers from "./queryResolvers";
import typeResolvers from "./typeResolvers";

const resolvers: Resolvers = {
  ...typeResolvers,
  Query: queryResolvers,
  Mutation: mutationResolvers,
};

export default resolvers;
