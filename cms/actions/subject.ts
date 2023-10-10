import { DocumentActionComponent, DocumentActionsContext, useDocumentOperation } from "sanity";

const fetchSubjectQuery = `
  *[ _type == "subject" && _id == $id]{
    _id,
    code,
    environments[] {
      _key
    },
    highSchool[] {
      _key
    }
  }
`;

type CodeEntity = {
  code?: string;
  name: {
    fi: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
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

export const createAsyncSubjectPublishAction = (originalAction: DocumentActionComponent, context: DocumentActionsContext) => {
  const AsyncPublishAction: DocumentActionComponent = (props) => {
    const originalResult = originalAction(props);
    const { patch } = useDocumentOperation(props.id, props.type);
    return {
      ...originalResult,
      label: originalResult?.label || "Publish",
      onHandle: async () => {
        try {
          const { draft } = props;

          const subjectCode = draft?.code;
          const environments: CodeEntity[] = (draft?.environments as CodeEntity[]) || [];
          const highSchoolModules: CodeEntity[] = (draft?.highSchoolModules as CodeEntity[]) || [];
          const vocationalModules: CodeEntity[] = (draft?.vocationalSchoolModules as CodeEntity[]) || [];

          if (!subjectCode) throw new Error("No code found");

          createCodeStrings(environments, `${subjectCode}_ENV`);
          createCodeStrings(highSchoolModules, `${subjectCode}_HS_MODULE`);
          createCodeStrings(vocationalModules, `${subjectCode}_VOC_MODULE`);

          const environmentPatches = environments.map(async (environment, index) => {
            const key = `environments[${index}].code`;
            await patch.execute([{ setIfMissing: { [key]: environment.code } }]);
          });

          const highSchoolPatches = highSchoolModules.map(async (module, index) => {
            const key = `highSchoolModules[${index}].code`;
            await patch.execute([{ setIfMissing: { [key]: module.code } }]);
          });

          const vocationalPatches = vocationalModules.map(async (module, index) => {
            const key = `vocationalSchoolModules[${index}].code`;
            await patch.execute([{ setIfMissing: { [key]: module.code } }]);
          });

          await Promise.all([...environmentPatches, ...highSchoolPatches, ...vocationalPatches]);

          // await client.patch("publish-counter").setIfMissing({ counter: 0 }).inc({ counter: 1 }).commit();
          // await client.fetch("*[_id == 'publish-counter'][0]{counter}").then((res) => console.log(res));
          originalResult?.onHandle?.();
        } catch (error) {
          console.log(error);
          alert("Voi möhkä, jotakin meni pieleen. Laittasitko Ekulle viestiä, kiitos:)");
        }
      },
    };
  };
  return AsyncPublishAction;
};
