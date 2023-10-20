import { DocumentActionComponent, Slug, useDocumentOperation } from "sanity";

type CodeEntity = {
  code?: string;
  name: {
    fi: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
};

type ModuleEntity = CodeEntity & {
  environments?: CodeEntity[];
};

const createCodeString = (entity: CodeEntity, entitiesToCompare: CodeEntity[], codeStart: string, matchIndex: number = 0): string => {
  const nameParsed = entity.name.fi.toUpperCase().trim();
  let newCode = `${codeStart}_${nameParsed.slice(0, 3)}`;
  if (matchIndex > 0) {
    newCode += `_${matchIndex}`;
  }
  const match = entitiesToCompare.find((it) => it.code === newCode);
  if (match) {
    return createCodeString(entity, entitiesToCompare, codeStart, matchIndex + 1);
  }
  return newCode;
};

const createCodeStrings = (entities: CodeEntity[], codeStart: string) => {
  for (let i = 0; i < entities.length; i += 1) {
    const entity = entities[i];
    const comparedEnties = entities.slice(0, i);

    if (!entity.code) {
      entity.code = createCodeString(entity, comparedEnties, codeStart);
    }
  }
};

const patchModules = (modules: ModuleEntity[], moduleKey: string, patch: any) => {
  return modules.map((module, index) => {
    const key = `${moduleKey}[${index}].code`;
    const modulePatch = patch.execute([{ setIfMissing: { [key]: module.code } }]);
    let environmentPatches: Promise<any>[] = [];
    if (module.environments) {
      createCodeStrings(module.environments, `${module.code}_ENV`);
      environmentPatches = module.environments.map(async (environment, envIndex) => {
        const envKey = `${moduleKey}[${index}].environments[${envIndex}].code`;
        return patch.execute([{ setIfMissing: { [envKey]: environment.code } }]);
      });
    }

    return Promise.all([modulePatch, ...environmentPatches]);
  });
};

const patchEnvironments = (environments: CodeEntity[], key: string, patch: any) => {
  return environments.map(async (environment, index) => {
    const envKey = `${key}[${index}].code`;
    return patch.execute([{ setIfMissing: { [envKey]: environment.code } }]);
  });
};

export const createAsyncSubjectPublishAction = (originalAction: DocumentActionComponent) => {
  const AsyncPublishAction: DocumentActionComponent = (props) => {
    const originalResult = originalAction(props);
    const { patch } = useDocumentOperation(props.id, props.type);
    return {
      ...originalResult,
      label: originalResult?.label || "Publish",
      onHandle: async () => {
        try {
          const { draft } = props;

          const subjectCode = (draft?.code as Slug | null)?.current;
          const environments: CodeEntity[] = (draft?.environments as CodeEntity[]) || [];
          const oneToTwoEnvironments: CodeEntity[] = ((draft?.elementarySchool as any)?.environments_1_to_2 as CodeEntity[]) || [];
          const threeToSixEnvironments: CodeEntity[] = ((draft?.elementarySchool as any)?.environments_3_to_6 as CodeEntity[]) || [];
          const sevenToNineEnvironments: CodeEntity[] = ((draft?.elementarySchool as any)?.environments_7_to_9 as CodeEntity[]) || [];
          const highSchoolModules: ModuleEntity[] = (draft?.highSchoolModules as ModuleEntity[]) || [];
          const vocationalModules: ModuleEntity[] = (draft?.vocationalSchoolModules as ModuleEntity[]) || [];

          if (!subjectCode) throw new Error("No code found");

          createCodeStrings(environments, `${subjectCode}_ENV`);
          createCodeStrings(oneToTwoEnvironments, `${subjectCode}_1_TO_2_ENV`);
          createCodeStrings(threeToSixEnvironments, `${subjectCode}_3_TO_6_ENV`);
          createCodeStrings(sevenToNineEnvironments, `${subjectCode}_7_TO_9_ENV`);
          createCodeStrings(highSchoolModules, `${subjectCode}_HS_MODULE`);
          createCodeStrings(vocationalModules, `${subjectCode}_VOC_MODULE`);

          const allEnvironmentPatches = patchEnvironments(environments, "environments", patch);
          const oneToTwoEnvironmentPatches = patchEnvironments(oneToTwoEnvironments, "elementarySchool.environments_1_to_2", patch);
          const threeToSixEnvironmentPatches = patchEnvironments(threeToSixEnvironments, "elementarySchool.environments_3_to_6", patch);
          const sevenToNineEnvironmentPatches = patchEnvironments(sevenToNineEnvironments, "elementarySchool.environments_7_to_9", patch);

          const highSchoolPatches = patchModules(highSchoolModules, "highSchoolModules", patch);
          const vocationalPatches = patchModules(vocationalModules, "vocationalSchoolModules", patch);

          await Promise.all([
            ...allEnvironmentPatches,
            ...oneToTwoEnvironmentPatches,
            ...threeToSixEnvironmentPatches,
            ...sevenToNineEnvironmentPatches,
            ...highSchoolPatches,
            ...vocationalPatches,
          ]);

          // await client.patch("publish-counter").setIfMissing({ counter: 0 }).inc({ counter: 1 }).commit();
          // await client.fetch("*[_id == 'publish-counter'][0]{counter}").then((res) => console.log(res));
          originalResult?.onHandle?.();
        } catch (error) {
          console.error(error);
          // eslint-disable-next-line no-alert
          alert("Voi möhkä, jotakin meni pieleen. Laittasitko Ekulle viestiä, kiitos:)");
        }
      },
    };
  };
  return AsyncPublishAction;
};
