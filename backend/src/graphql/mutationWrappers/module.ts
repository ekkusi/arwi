import { Prisma } from "@prisma/client";
import { GetResult } from "@prisma/client/runtime/library";
import { modulesByGroupLoader } from "../dataLoaders/module";
import prisma from "../../prismaClient";

type CreateModuleReturnType<T extends Prisma.ModuleCreateArgs> = GetResult<Prisma.$ModulePayload, T, "create">;

export async function createModule<T extends Prisma.ModuleCreateArgs>(args: T): Promise<CreateModuleReturnType<T>> {
  const createdModule = (await prisma.module.create(args)) as CreateModuleReturnType<T>;

  // Clear the DataLoader cache for this module
  await modulesByGroupLoader.clear(createdModule.groupId);

  return createdModule;
}
