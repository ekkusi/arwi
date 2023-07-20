import { useMutation, useQuery } from "@apollo/client";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import LoadingIndicator from "../../../components/LoadingIndicator";
import { graphql } from "../../../gql";
import { HomeStackParams } from "../types";
import { getErrorMessage } from "../../../helpers/errorUtils";
import UpdateCollectionForm, { UpdateCollectionFormData } from "../../../components/UpdateCollectionForm";

const CreateCollectionPage_GetGroup_Query = graphql(`
  query CreateCollectionPage_GetGroup($groupId: ID!) {
    getGroup(id: $groupId) {
      id
      currentClassYear {
        id
      }
      ...UpdateCollectionForm_Group
    }
  }
`);

const CreateCollectionPage_CreateCollection_Mutation = graphql(`
  mutation CreateCollectionPage_CreateCollection($createCollectionInput: CreateCollectionInput!, $classYearId: ID!) {
    createCollection(data: $createCollectionInput, classYearId: $classYearId) {
      id
    }
  }
`);

export default function CollectionCreationView({ navigation, route }: NativeStackScreenProps<HomeStackParams, "collection-create">) {
  const { groupId } = route.params;
  const { data, loading } = useQuery(CreateCollectionPage_GetGroup_Query, {
    variables: {
      groupId,
    },
  });

  const [createCollection] = useMutation(CreateCollectionPage_CreateCollection_Mutation);

  if (loading || !data) return <LoadingIndicator />;

  const handleSubmit = async (values: UpdateCollectionFormData) => {
    try {
      // TODO: Change to save to Provider instead and just move to next phase (add students or evaluation)
      const result = await createCollection({
        variables: {
          classYearId: data.getGroup.currentClassYear.id,
          createCollectionInput: values,
        },
        refetchQueries: [],
      });
      if (!result.data) throw new Error("Unexpected error");
      navigation.navigate("collection-edit", { id: result.data.createCollection.id });
    } catch (e) {
      const msg = getErrorMessage(e);
      console.error(msg);
    }
  };
  return <UpdateCollectionForm onSubmit={handleSubmit} group={data.getGroup} />;

  // return (
  //   <CView style={{ flex: 1, paddingHorizontal: 10, paddingTop: 20, gap: 20 }}>
  //     <SelectFormField
  //       error={environmentError}
  //       onSelect={(item) => {
  //         setSelectedEnvironmentCode(item.value);
  //         setEnvironmentError(undefined);
  //       }}
  //       title={t("environment", "Ympäristö")}
  //       options={environments.map((it) => ({ value: it.code, label: it.label }))}
  //     />
  //     <SelectFormField
  //       onSelect={(item) => setSelectedLearningObjectivesCode(item.value)}
  //       title={t("learningObjectives", "Oppimistavoitteet")}
  //       options={learningObjectives.map((obj) => ({ value: obj.code, label: obj.label }))}
  //     />
  //     <FormField title={t("date", "Päivämäärä")}>
  //       <CTouchableOpacity onPress={() => setIsDateOpen(true)}>
  //         <CView pointerEvents="none">
  //           <CTextInput value={formatDate(date)} editable={false} />
  //         </CView>
  //       </CTouchableOpacity>
  //     </FormField>
  //     {isDateOpen && (
  //       <DateTimePicker
  //         textColor={COLORS.primary}
  //         value={date}
  //         onChange={(_, newDate) => {
  //           setIsDateOpen(false);
  //           if (newDate) setDate(newDate);
  //         }}
  //       />
  //     )}
  //     {/* <StudentParticipationList initialParticipations={} /> */}
  //     <CButton
  //       disabled={!!environmentError}
  //       loading={submitting}
  //       title={t("CollectionCreationView.startEvaluation", "Aloita arviointi")}
  //       onPress={() => handleSubmit()}
  //     />
  //   </CView>
  // );
}
