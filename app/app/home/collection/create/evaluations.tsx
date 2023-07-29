import { useMutation } from "@apollo/client";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import CButton from "../../../../components/primitives/CButton";
import CFlatList from "../../../../components/primitives/CFlatList";
import CView from "../../../../components/primitives/CView";
import UpdateEvaluationCard from "../../../../components/UpdateEvaluationCard";
import { graphql } from "../../../../gql";
import { formatDate } from "../../../../helpers/dateHelpers";
import { getErrorMessage } from "../../../../helpers/errorUtils";
import { COLORS } from "../../../../theme";
import { useCollectionCreationContext } from "./CollectionCreationProvider";
import { CollectionCreationStackParams } from "./types";
import CollectionCreationLayout from "./_layout";

const CollectionEvaluationsView_CreateCollection_Mutation = graphql(`
  mutation CollectionEvaluationsView_CreateCollection($createCollectionInput: CreateCollectionInput!, $classYearId: ID!) {
    createCollection(data: $createCollectionInput, classYearId: $classYearId) {
      id
      date
      evaluations {
        id
        wasPresent
        skillsRating
        behaviourRating
        notes
        isStellar
        student {
          id
        }
      }
      classYear {
        id
      }
    }
  }
`);

function CollectionEvaluationsContent({ navigation }: NativeStackScreenProps<CollectionCreationStackParams, "evaluations">) {
  const { t } = useTranslation();
  const [createCollection] = useMutation(CollectionEvaluationsView_CreateCollection_Mutation);
  const [cardHeight, setCardHeight] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const { generalData, evaluations, groupInfo, setEvaluations } = useCollectionCreationContext();

  const handleSubmit = async () => {
    setSubmitting(true);
    const { environmentCode } = generalData;
    if (!environmentCode) throw new Error("Environment code is missing, shouldn't happen at this point");

    try {
      await createCollection({
        variables: {
          classYearId: groupInfo.currentClassYear.id,
          createCollectionInput: {
            ...generalData,
            environmentCode,
            date: formatDate(generalData.date, "yyyy-MM-dd"),
            evaluations: evaluations.map((it) => ({
              wasPresent: it.wasPresent,
              skillsRating: it.skillsRating,
              behaviourRating: it.behaviourRating,
              notes: it.notes,
              isStellar: it.isStellar,
              studentId: it.student.id,
            })),
          },
        },
        update: (cache, { data }) => {
          if (!data) throw new Error("Unexpected error");
          const { createCollection: newCollection } = data;
          cache.modify({
            id: cache.identify(newCollection.classYear),
            fields: {
              evaluationCollections(existingCollections, { readField, toReference }) {
                const newCollectionRef = toReference(newCollection);
                if (existingCollections.some((ref: any) => readField("id", ref) === newCollection.id)) {
                  return existingCollections;
                }
                return [...existingCollections, newCollectionRef];
              },
            },
          });
          const newEvaluations = newCollection.evaluations;
          newEvaluations.forEach((it) => {
            cache.modify({
              id: cache.identify(it.student),
              fields: {
                currentClassEvaluations(existingEvaluations, { readField, toReference }) {
                  const newEvaluationRef = toReference(it);
                  if (existingEvaluations.some((ref: any) => readField("id", ref) === it.id)) {
                    return existingEvaluations;
                  }
                  return [...existingEvaluations, newEvaluationRef];
                },
              },
            });
          });
        },
      });
      navigation.getParent()?.navigate("index");
    } catch (e) {
      const msg = getErrorMessage(e);
      console.error(msg);
    }
    setSubmitting(false);
  };
  return (
    <CView style={{ flex: 1, padding: "md" }}>
      <CFlatList
        data={evaluations}
        renderItem={({ item, index }) => (
          <UpdateEvaluationCard
            key={item.student.id}
            onLayout={index === 0 ? (event) => setCardHeight(event.nativeEvent.layout.height) : undefined}
            evaluation={item}
            hasParticipationToggle={false}
            onChanged={(value) => {
              setEvaluations(evaluations.map((it) => (it.student.id === value.student.id ? value : it)));
            }}
            style={{ marginBottom: index === evaluations.length - 1 ? 80 : "lg" }}
          />
        )}
        snapToInterval={cardHeight}
        decelerationRate={0.8}
        snapToAlignment="center"
        style={{ flex: 1, padding: "lg" }}
      />
      <CView style={{ justifyContent: "flex-end", position: "absolute", bottom: 0, left: 0, right: 0, width: "100%" }}>
        <CView
          style={{
            width: "100%",
            padding: "lg",
            backgroundColor: "transparent",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <CButton onPress={() => navigation.goBack()}>
            <MaterialCommunityIcon name="arrow-left" size={25} color={COLORS.white} />
          </CButton>
          <CButton
            loading={submitting}
            style={{ marginRight: 0 }}
            title={t("save", "Tallenna")}
            onPress={() => handleSubmit()}
            leftIcon={<MaterialCommunityIcon name="check" size={25} color={COLORS.white} />}
          />
        </CView>
      </CView>
    </CView>
  );
}

export default function CollectionEvaluationsView(props: NativeStackScreenProps<CollectionCreationStackParams, "evaluations">) {
  return (
    <CollectionCreationLayout style={{ padding: 0 }}>
      <CollectionEvaluationsContent {...props} />
    </CollectionCreationLayout>
  );
}
