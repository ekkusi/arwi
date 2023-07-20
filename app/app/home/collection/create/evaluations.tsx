import { useMutation } from "@apollo/client";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import CButton from "../../../../components/primitives/CButton";
import CText from "../../../../components/primitives/CText";
import CView from "../../../../components/primitives/CView";
import { graphql } from "../../../../gql";
import { formatDate } from "../../../../helpers/dateHelpers";
import { getErrorMessage } from "../../../../helpers/errorUtils";
import { useCollectionCreationContext } from "./CollectionCreationProvider";
import { CollectionCreationStackParams } from "./types";
import CollectionCreationLayout from "./_layout";

const CollectionEvaluationsView_CreateCollection_Mutation = graphql(`
  mutation CollectionEvaluationsView_CreateCollection($createCollectionInput: CreateCollectionInput!, $classYearId: ID!) {
    createCollection(data: $createCollectionInput, classYearId: $classYearId) {
      id
    }
  }
`);

function CollectionEvaluationsContent({ navigation }: NativeStackScreenProps<CollectionCreationStackParams, "evaluations">) {
  const { t } = useTranslation();
  const [createCollection] = useMutation(CollectionEvaluationsView_CreateCollection_Mutation);
  const [submitting, setSubmitting] = useState(false);
  const { generalData, evaluations, groupInfo } = useCollectionCreationContext();

  const handleSubmit = async () => {
    setSubmitting(true);
    const { environmentCode } = generalData;
    if (!environmentCode) throw new Error("Environment code is missing, shouldn't happen at this point");

    try {
      // TODO: Change to save to Provider instead and just move to next phase (add students or evaluation)
      const result = await createCollection({
        variables: {
          classYearId: groupInfo.currentClassYear.id,
          createCollectionInput: {
            ...generalData,
            environmentCode,
            date: formatDate(generalData.date, "yyyy-MM-dd"),
            evaluations: evaluations.map((it) => ({ ...it, studentId: it.student.id })),
          },
        },
        refetchQueries: [],
      });
      if (!result.data) throw new Error("Unexpected error");
      navigation.getParent()?.navigate("index");
    } catch (e) {
      const msg = getErrorMessage(e);
      console.error(msg);
    }
    setSubmitting(false);
  };
  return (
    <>
      <CText>Terve</CText>
      <CButton loading={submitting} title={t("save", "Tallenna")} onPress={handleSubmit} />
    </>
  );
}

export default function CollectionEvaluationsView(props: NativeStackScreenProps<CollectionCreationStackParams, "evaluations">) {
  return (
    <CollectionCreationLayout>
      <CollectionEvaluationsContent {...props} />
    </CollectionCreationLayout>
  );
}
