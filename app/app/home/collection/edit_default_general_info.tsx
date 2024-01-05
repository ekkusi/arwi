import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "@apollo/client";
import { isDefaultCollection } from "arwi-backend/src/types/typeGuards";
import { HomeStackParams } from "../types";
import LoadingIndicator from "../../../components/LoadingIndicator";
import { graphql } from "../../../gql";
import CollectionGeneralInfoForm, { GeneralInfoData } from "./_general_info_form";
import { formatDate } from "../../../helpers/dateHelpers";
import { getErrorMessage } from "../../../helpers/errorUtils";
import Layout from "../../../components/Layout";
import CText from "../../../components/primitives/CText";

const EditDefaultGeneralDetails_GetCollection_Query = graphql(`
  query EditDefaultGeneralDetails_GetCollection($collectionId: ID!) {
    getCollection(id: $collectionId) {
      id
      date
      description
      type {
        id
        name
        category
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
          collectionTypes {
            id
            name
            category
          }
        }
      }
    }
  }
`);

const EditDefaultGeneralDetails_UpdateCollection_Mutation = graphql(`
  mutation EditDefaultGeneralDetails_UpdateCollection($id: ID!, $input: UpdateDefaultCollectionInput!) {
    updateDefaultCollection(collectionId: $id, data: $input) {
      id
      date
      description
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
    }
  }
`);

export default function EditDefaultCollectionGeneralInfoView({
  navigation,
  route,
}: NativeStackScreenProps<HomeStackParams, "default-collection-edit">) {
  const { collectionId } = route.params;

  const [updateCollection] = useMutation(EditDefaultGeneralDetails_UpdateCollection_Mutation);
  const [submitting, setSubmitting] = useState(false);

  const { t } = useTranslation();

  const handleSubmit = async ({ date, description }: GeneralInfoData) => {
    setSubmitting(true);
    try {
      await updateCollection({
        variables: {
          id: collectionId,
          input: {
            date: formatDate(date, "yyyy-MM-dd"),
            description,
          },
        },
      });
    } catch (e) {
      const msg = getErrorMessage(e);
      console.error(msg);
    }
    setSubmitting(false);
    navigation.goBack();
  };

  const { data, loading } = useQuery(EditDefaultGeneralDetails_GetCollection_Query, {
    variables: {
      collectionId,
    },
  });

  if (loading || !data) return <LoadingIndicator />;

  const collection = data.getCollection;

  return (
    <Layout keyboardVerticalOffset={100}>
      {isDefaultCollection<WithTypename<typeof collection, "DefaultCollection">>(collection) ? (
        <CollectionGeneralInfoForm
          handleSubmit={handleSubmit}
          subjectCode={collection.module.group.subject.code}
          moduleInfo={collection.module.info}
          buttonTitle={t("save", "Tallenna")}
          buttonLoading={submitting}
          initialData={{
            date: new Date(collection.date),
            description: collection.description || undefined,
          }}
        />
      ) : (
        <CText>{t("this-view-not-implemented", "Tämä näkymä ei ole vielä implementoitu")}</CText>
      )}
    </Layout>
  );
}
