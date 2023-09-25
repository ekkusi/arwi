import { useMutation, useQuery } from "@apollo/client";
import { ModuleInfo } from "arwi-backend/src/types";
import { getModuleInfos } from "arwi-backend/src/utils/subjectUtils";
import { useState } from "react";
import SelectFormField from "../../components/form/SelectFormField";
import LoadingIndicator from "../../components/LoadingIndicator";
import CText from "../../components/primitives/CText";
import CView from "../../components/primitives/CView";
import SaveAndCancelButtons from "../../components/SaveAndCancelButtons";
import { graphql } from "../../gql";

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
  mutation ChangeModule_ChangeModule($data: ChangeGroupModuleInput!, $groupId: String!) {
    changeGroupModule(data: $data, groupId: $groupId) {
      id
      currentModule {
        id
        info {
          educationLevel
          learningObjectiveGroupKey
          label {
            fi
          }
        }
        students {
          id
          name
          currentModuleEvaluations {
            id
            wasPresent
          }
        }
        evaluationCollections {
          id
          date
          environment {
            label {
              fi
            }
            code
            color
          }
          learningObjectives {
            code
            label {
              fi
            }
            description {
              fi
            }
            type
          }
          ...CollectionsLineChart_EvaluationCollection
        }
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

  const [changeModule, { loading }] = useMutation(ChangeModule_ChangeModule_Mutation);
  const getOptionValue = (item: ModuleInfo) => `${item.educationLevel}-${item.learningObjectiveGroupKey}`;
  const isValid = selectedModule && data && getOptionValue(selectedModule) !== getOptionValue(data?.getGroup.currentModule.info);

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

  const modules = getModuleInfos(data.getGroup.subject.code);

  return (
    <CView>
      <CText>Moduulin vaihto ei ole implementoitu tällä hetkellä</CText>
      <SelectFormField
        defaultValue={data.getGroup.currentModule.info}
        options={modules}
        onSelect={(item) => setSelectedModule(item)}
        getOptionValue={(item) => `${item.educationLevel}-${item.learningObjectiveGroupKey}`}
        formatLabel={(item) => item.label.fi}
      />
      <CText>{error}</CText>
      <SaveAndCancelButtons onCancel={onCancel} onSave={changeYear} loading={loading} disabled={!isValid} style={{ marginVertical: "lg" }} />
    </CView>
  );
}
