import { QueryResolvers } from "../types";
import { CustomContext } from "../types/contextTypes";

const resolvers: QueryResolvers<CustomContext> = {
  getTeacher: async (_, { id }, { prisma }) => {
    const teacher = await prisma.teacher.findUnique({
      where: {
        id,
      },
    });
    if (!teacher) throw new Error(`No teacher found with id '${id}'`);
    return teacher;
  },
};

export default resolvers;
