import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "@apollo/client";
import { Environment, LearningObjectiveMinimal } from "arwi-backend/src/types/subject";
import { HomeStackParams } from "../types";
import LoadingIndicator from "../../../components/LoadingIndicator";
import { graphql } from "../../../gql";
import CollectionGeneralInfoForm from "./_general_info_form";
import { formatDate } from "../../../helpers/dateHelpers";
import { getErrorMessage } from "../../../helpers/errorUtils";
import Layout from "../../../components/Layout";

const EditGeneralDetails_GetCollection_Query = graphql(`
  query EditGeneralDetails_GetCollection($collectionId: ID!) {
    getCollection(id: $collectionId) {
      id
      date
      description
      environment {
        label {
          fi
        }
        code
        color
      }
      module {
        id
        info {
          educationLevel
          learningObjectiveGroupKey
        }
        group {
          id
          subject {
            code
          }
        }
      }
      learningObjectives {
        code
        label {
          fi
        }
        type
      }
    }
  }
`);

const EditGeneralDetails_UpdateCollection_Mutation = graphql(`
  mutation EditGeneralDetails_UpdateCollection($id: ID!, $input: UpdateCollectionInput!) {
    updateCollection(collectionId: $id, data: $input) {
      id
      date
      description
      environment {
        label {
          fi
        }
        code
      }
      module {
        id
        info {
          educationLevel
          learningObjectiveGroupKey
        }
        group {
          id
          subject {
            code
          }
        }
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
`);

export default function EditCollectionGeneralInfoView({ navigation, route }: NativeStackScreenProps<HomeStackParams, "collection-edit">) {
  const { collectionId, onSaved } = route.params;

  const [updateCollection] = useMutation(EditGeneralDetails_UpdateCollection_Mutation);
  const [submitting, setSubmitting] = useState(false);

  const { t } = useTranslation();

  const handleSubmit = async (date: Date, environment: Environment, learningObjectiveCodes: LearningObjectiveMinimal[], description: string) => {
    setSubmitting(true);
    try {
      await updateCollection({
        variables: {
          id: collectionId,
          input: {
            date: formatDate(date, "yyyy-MM-dd"),
            environmentCode: environment.code,
            learningObjectiveCodes: learningObjectiveCodes.map((obj) => obj.code),
            description,
          },
        },
      });
      navigation.getParent()?.navigate("index");
    } catch (e) {
      const msg = getErrorMessage(e);
      console.error(msg);
    }
    const newEnvironmentLabel = environment.label;
    if (newEnvironmentLabel) onSaved?.(newEnvironmentLabel, formatDate(date));
    setSubmitting(false);
    navigation.goBack();
  };

  const { data, loading } = useQuery(EditGeneralDetails_GetCollection_Query, {
    variables: {
      collectionId,
    },
  });

  if (loading || !data) return <LoadingIndicator />;

  const collection = data.getCollection;

  return (
    <Layout keyboardVerticalOffset={100}>
      <CollectionGeneralInfoForm
        handleSubmit={handleSubmit}
        subjectCode={collection.module.group.subject.code}
        moduleInfo={collection.module.info}
        buttonTitle={t("save", "Tallenna")}
        buttonLoading={submitting}
        defaultDate={new Date(collection.date)}
        defaultDescription={collection.description || undefined}
        defaultEnvironment={collection.environment}
        defaultLearningObjectives={collection.learningObjectives}
      />
    </Layout>
  );
}
