import { useMutation, useQuery } from "@apollo/client";
import { ClassYearInfo, getClassYearInfos } from "arwi-backend/src/utils/subjectUtils";
import { useState } from "react";
import SelectFormField from "../../components/form/SelectFormField";
import LoadingIndicator from "../../components/LoadingIndicator";
import CView from "../../components/primitives/CView";
import SaveAndCancelButtons from "../../components/SaveAndCancelButtons";
import { graphql } from "../../gql";

const ChangeClassYear_GetGroup_Query = graphql(`
  query ChangeClassYear_GetGroup($id: ID!) {
    getGroup(id: $id) {
      id
      currentClassYear {
        id
        info {
          code
          label
        }
      }
    }
  }
`);

const ChangeClassYear_ChangeClassYear_Mutation = graphql(`
  mutation ChangeClassYear_ChangeClassYear($groupId: ID!, $newYearCode: ClassYearCode!, $transferEvaluations: Boolean!) {
    changeGroupYear(groupId: $groupId, newYearCode: $newYearCode, transferEvaluations: $transferEvaluations) {
      id
      currentClassYear {
        id
        info {
          code
          label
        }
        students {
          id
          name
          currentClassEvaluations {
            id
            wasPresent
          }
        }
        evaluationCollections {
          id
          date
          environment {
            label
            code
            color
          }
          learningObjectives {
            code
            label
            description
            type
          }
          ...CollectionsLineChart_EvaluationCollection
        }
      }
    }
  }
`);

type ChangeClassYearProps = {
  groupId: string;
  onCancel?: () => void;
  onSaved?: () => void;
};

export default function ChangeClassYear({ groupId, onCancel, onSaved }: ChangeClassYearProps) {
  const classYearCodes = getClassYearInfos();
  const [selectedClassYear, setSelectedClassYear] = useState<ClassYearInfo | undefined>();

  const { data } = useQuery(ChangeClassYear_GetGroup_Query, {
    variables: {
      id: groupId,
    },
  });

  const [changeClassYear, { loading }] = useMutation(ChangeClassYear_ChangeClassYear_Mutation);
  const isValid = selectedClassYear && selectedClassYear.code !== data?.getGroup.currentClassYear.info.code;

  const changeYear = async () => {
    if (!isValid) throw new Error("Unexpected error, selected class year not valid"); // Should never happen
    await changeClassYear({
      variables: {
        groupId,
        newYearCode: selectedClassYear.code,
        transferEvaluations: false,
      },
    });
    onSaved?.();
  };

  if (!data) return <LoadingIndicator />;

  return (
    <CView>
      <SelectFormField
        defaultValue={data.getGroup.currentClassYear.info}
        options={classYearCodes}
        onSelect={(item) => setSelectedClassYear(item)}
        getOptionValue={(item) => item.code}
        formatLabel={(item) => item.label}
      />
      <SaveAndCancelButtons onCancel={onCancel} onSave={changeYear} loading={loading} disabled={!isValid} style={{ marginVertical: "lg" }} />
    </CView>
  );
}
