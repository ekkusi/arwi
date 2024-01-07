import { Module } from "@prisma/client";
import prisma from "../../prismaClient";
import CustomDataLoader from "./CustomDataLoader";
import NotFoundError from "../../errors/NotFoundError";

export type ClearModuleLoadersArgs = Pick<Module, "id" | "groupId">;

export const clearModuleLoaders = (args: ClearModuleLoadersArgs) => {
  moduleLoader.clear(args.id);
  modulesByGroupLoader.clear(args.groupId);
};

export const clearModuleLoadersByGroup = async (groupId: string) => {
  const modules = await modulesByGroupLoader.load(groupId);

  for (const module of modules) {
    moduleLoader.clear(module.id);
  }
  modulesByGroupLoader.clear(groupId);
};

export const clearModuleLoadersById = async (id: string) => {
  const module = await moduleLoader.load(id);
  if (module) {
    clearModuleLoaders(module);
  }
};

export const modulesByGroupLoader = new CustomDataLoader<string, Module[]>(async (groupIds) => {
  const modules = await prisma.module.findMany({
    where: {
      groupId: {
        in: [...groupIds],
      },
    },
  });

  const modulesMap: Record<string, Module[]> = {};

  for (const module of modules) {
    if (!modulesMap[module.groupId]) {
      modulesMap[module.groupId] = [];
    }
    modulesMap[module.groupId].push(module);
  }

  return groupIds.map((id) => modulesMap[id] || []);
});

export const moduleLoader = new CustomDataLoader<string, Module>(async (ids) => {
  const modules = await prisma.module.findMany({
    where: {
      id: {
        in: [...ids],
      },
    },
  });

  const moduleMap: Record<string, Module> = {};

  for (const module of modules) {
    moduleMap[module.id] = module;
  }

  return ids.map((id) => moduleMap[id] || new NotFoundError());
});

export default {
  moduleLoader,
  modulesByGroupLoader,
};
