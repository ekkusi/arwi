import { useMutation } from "@apollo/client";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";
import ChangeNameView from "../../components/ChangeNameView";
import { graphql } from "../../gql";
import { getErrorMessage } from "../../helpers/errorUtils";

const AddNewStudent_CreateStudent_Mutation = graphql(`
  mutation AddNewStudent_CreateStudent($id: ID!, $input: CreateStudentInput!) {
    createStudent(moduleId: $id, data: $input) {
      id
      name
      group {
        id
        name
        archived
        updatedAt
        subject {
          label {
            fi
          }
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
            __typename
            ... on ClassParticipationCollection {
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
            }
          }
        }
      }
    }
  }
`);

type AddNewStudentProps = {
  classYearId: string;
  onCancel?: () => void;
  onSaved?: () => void;
};

export default function AddNewStudent({ classYearId, onCancel, onSaved }: AddNewStudentProps) {
  const { t } = useTranslation();

  const [createStudent, { loading }] = useMutation(AddNewStudent_CreateStudent_Mutation);

  const save = async (newName: string) => {
    if (newName.length === 0) {
      Alert.alert(t("name-cannot-be-empty", "Nimi ei voi olla tyhjä"));
      return;
    }

    try {
      await createStudent({
        variables: {
          id: classYearId,
          input: {
            name: newName,
          },
        },
      });
      onSaved?.();
    } catch (e) {
      console.error(e);
      Alert.alert(t("general-error"), getErrorMessage(e));
    }
  };

  return <ChangeNameView name="" onSaved={save} onCancel={onCancel} loading={loading} />;
}
