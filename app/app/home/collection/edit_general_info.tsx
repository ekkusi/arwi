import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "@apollo/client";
import { isClassParticipationCollection } from "arwi-backend/src/types/typeGuards";
import { HomeStackParams } from "../types";
import LoadingIndicator from "../../../components/LoadingIndicator";
import { graphql } from "@/graphql";
import CollectionGeneralInfoForm, { GeneralInfoData } from "./_general_info_form";
import { formatDate } from "../../../helpers/dateHelpers";
import { getErrorMessage } from "../../../helpers/errorUtils";
import Layout from "../../../components/Layout";
import CText from "../../../components/primitives/CText";
import {
  ClassParticipationCollectionUpdate_GeneralInfoFull_Fragment,
  ClassParticipationCollectionUpdate_GeneralInfoMinimal_Fragment,
} from "@/helpers/graphql/fragments";

const EditGeneralDetails_GetCollection_Query = graphql(`
  query EditGeneralDetails_GetCollection($collectionId: ID!) {
    getCollection(id: $collectionId) {
      id
      date
      description
      type {
        id
        name
        category
      }
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
          type
        }
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
          currentModule {
            collectionTypes {
              id
              name
              category
            }
          }
        }
      }
    }
  }
`);

const EditGeneralDetails_UpdateCollection_Mutation = graphql(
  `
    mutation EditGeneralDetails_UpdateCollection($id: ID!, $input: UpdateClassParticipationCollectionInput!) {
      updateClassParticipationCollection(collectionId: $id, data: $input) {
        ...ClassParticipationCollectionUpdate_GeneralInfoFull
        evaluations {
          id
          collection {
            ...ClassParticipationCollectionUpdate_GeneralInfoMinimal
          }
        }
        module {
          group {
            id
            currentModule {
              id
              evaluationCollections {
                ...ClassParticipationCollectionUpdate_GeneralInfoMinimal
              }
            }
          }
        }
      }
    }
  `,
  [ClassParticipationCollectionUpdate_GeneralInfoMinimal_Fragment, ClassParticipationCollectionUpdate_GeneralInfoFull_Fragment]
);

export default function EditCollectionGeneralInfoView({ navigation, route }: NativeStackScreenProps<HomeStackParams, "collection-edit">) {
  const { collectionId, onSaved } = route.params;

  const [updateCollection] = useMutation(EditGeneralDetails_UpdateCollection_Mutation);
  const [submitting, setSubmitting] = useState(false);

  const { t } = useTranslation();

  const handleSubmit = async ({ date, environment, learningObjectives, description }: GeneralInfoData) => {
    setSubmitting(true);
    try {
      await updateCollection({
        variables: {
          id: collectionId,
          input: {
            date: formatDate(date, "yyyy-MM-dd"),
            environmentCode: environment.code,
            learningObjectiveCodes: learningObjectives.map((item) => item.code),
            description,
          },
        },
      });
      navigation.getParent()?.navigate("home");
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
      {isClassParticipationCollection<WithTypename<typeof collection, "ClassParticipationCollection">>(collection) ? (
        <CollectionGeneralInfoForm
          handleSubmit={handleSubmit}
          subjectCode={collection.module.group.subject.code}
          moduleInfo={collection.module.info}
          buttonTitle={t("save", "Tallenna")}
          buttonLoading={submitting}
          initialData={{
            date: new Date(collection.date),
            environment: collection.environment,
            learningObjectives: collection.learningObjectives,
            description: collection.description || undefined,
          }}
        />
      ) : (
        <CText>
          {t("you-should-not-end-up-here", "Sinun ei kuuluisi päätyä tälle näkymälle. Jos viitsit, niin ilmoita asiasta kehittäjille info@arwi.fi.")}
        </CText>
      )}
    </Layout>
  );
}
