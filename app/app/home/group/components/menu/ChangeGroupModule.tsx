import { useMutation, useQuery } from "@apollo/client";
import { ModuleInfo } from "arwi-backend/src/types";
import { getModuleInfos, isPrimaryEducationLevel } from "arwi-backend/src/utils/subjectUtils";
import { useState } from "react";
import SelectFormField from "../../../../../components/form/SelectFormField";
import LoadingIndicator from "../../../../../components/LoadingIndicator";
import CText from "../../../../../components/primitives/CText";
import CView from "../../../../../components/primitives/CView";
import SaveAndCancelButtons from "../../../../../components/SaveAndCancelButtons";
import { graphql } from "@/graphql";

const ChangeModule_GetGroup_Query = graphql(`
  query ChangeModule_GetGroup($id: ID!) {
    getGroup(id: $id) {
      id
      subject {
        code
      }
      currentModule {
        id
        info {
          educationLevel
          learningObjectiveGroupKey
          label {
            fi
          }
        }
      }
    }
  }
`);

const ChangeModule_ChangeModule_Mutation = graphql(`
  mutation ChangeModule_ChangeModule($data: ChangeGroupModuleInput!, $groupId: ID!) {
    changeGroupModule(data: $data, groupId: $groupId) {
      id
      currentModule {
        id
      }
    }
  }
`);

type ChangeModuleProps = {
  groupId: string;
  onCancel?: () => void;
  onSaved?: () => void;
};

export default function ChangeModule({ groupId, onCancel, onSaved }: ChangeModuleProps) {
  const [selectedModule, setSelectedModule] = useState<ModuleInfo | undefined>();
  const [error, setError] = useState<string | undefined>();

  const { data } = useQuery(ChangeModule_GetGroup_Query, {
    variables: {
      id: groupId,
    },
  });

  const moduleInfo = data?.getGroup.currentModule.info;
  const [changeModule, { loading }] = useMutation(ChangeModule_ChangeModule_Mutation);
  const getOptionValue = (item: ModuleInfo) => `${item.educationLevel}-${item.learningObjectiveGroupKey}`;
  const isValid = selectedModule && moduleInfo && getOptionValue(selectedModule) !== getOptionValue(moduleInfo);

  const changeYear = async () => {
    if (!isValid) throw new Error("Unexpected error, selected class year not valid"); // Should never happen
    setError(undefined);
    try {
      await changeModule({
        variables: {
          data: {
            newEducationLevel: selectedModule.educationLevel,
            newLearningObjectiveGroupKey: selectedModule.learningObjectiveGroupKey,
          },
          groupId,
        },
      });
    } catch (e) {
      setError(e.message);
    }
    onSaved?.();
  };

  if (!data) return <LoadingIndicator />;

  const currentModuleLevel = moduleInfo!.educationLevel;
  const isCurrentModulePrimaryLevel = isPrimaryEducationLevel(currentModuleLevel);

  const modules = getModuleInfos(data.getGroup.subject.code);
  const educationLevelModules = modules.filter((m) =>
    isCurrentModulePrimaryLevel ? isPrimaryEducationLevel(m.educationLevel) : m.educationLevel === currentModuleLevel
  );

  return (
    <CView>
      <SelectFormField
        defaultValue={moduleInfo}
        options={educationLevelModules}
        onSelect={(item) => setSelectedModule(item)}
        getOptionValue={(item) => `${item.educationLevel}-${item.learningObjectiveGroupKey}`}
        formatLabel={(item) => item.label.fi}
      />
      <CText>{error}</CText>
      <SaveAndCancelButtons onCancel={onCancel} onSave={changeYear} loading={loading} disabled={!isValid} style={{ marginVertical: "lg" }} />
    </CView>
  );
}
