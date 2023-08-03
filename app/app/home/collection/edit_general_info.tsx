import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "@apollo/client";
import { Alert } from "react-native";
import { HomeStackParams } from "../types";
import LoadingIndicator from "../../../components/LoadingIndicator";
import { graphql } from "../../../gql";
import CollectionCreationLayout from "./create/_layout";
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
        label
        code
      }
      classYear {
        id
        info {
          code
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
        label
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
        label
        code
      }
      classYear {
        id
        info {
          code
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
        label
      }
    }
  }
`);

export default function EditCollectionGeneralInfoView({ navigation, route }: NativeStackScreenProps<HomeStackParams, "collection-edit">) {
  const { collectionId } = route.params;

  const [updateCollection] = useMutation(EditGeneralDetails_UpdateCollection_Mutation);
  const [submitting, setSubmitting] = useState(false);

  const { t } = useTranslation();

  const handleSubmit = async (date: Date, environmentCode: string, learningObjectiveCodes: string[], description: string) => {
    setSubmitting(true);
    try {
      await updateCollection({
        variables: {
          id: collectionId,
          input: {
            date: formatDate(date, "yyyy-MM-dd"),
            environmentCode,
            learningObjectiveCodes,
            description,
          },
        },
      });
      navigation.getParent()?.navigate("index");
    } catch (e) {
      const msg = getErrorMessage(e);
      console.error(msg);
    }
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
  const subjectCode = collection.classYear.group.subject.code;
  const classYearCode = collection.classYear.info.code;

  return (
    <Layout keyboardVerticalOffset={100}>
      <CollectionGeneralInfoForm
        handleSubmit={handleSubmit}
        subjectCode={subjectCode}
        classYearCode={classYearCode}
        buttonTitle={t("save", "Tallenna")}
        buttonLoading={submitting}
        defaultDate={new Date(collection.date)}
        defaultDescription={collection.description || undefined}
        defaultEnvironment={collection.environment.code}
        defaultLearningObjectives={collection.learningObjectives.map((obj) => obj.code)}
      />
    </Layout>
  );
}
