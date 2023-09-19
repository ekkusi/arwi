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
  const client = context.getClient({ apiVersion: "2023-09-16" });
  const AsyncPublishAction: DocumentActionComponent = (props) => {
    const originalResult = originalAction(props);
    const { patch } = useDocumentOperation(props.id, props.type);
    const { id } = props;
    return {
      ...originalResult,
      label: originalResult?.label || "Publish",
      onHandle: async () => {
        const result = await client.fetch(fetchSubjectQuery, { id });
        // console.log(JSON.stringify(result, null, 2));
        // const result = JSON.parse(json);
        if (!result || !Array.isArray(result) || result.length <= 0) throw new Error("No result found");
        const doc = result[0];
        const { draft } = props;

        const subjectCode = draft?.code || doc.code;
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
      },
    };
  };
  return AsyncPublishAction;
};
