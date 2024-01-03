import { useQuery } from "@apollo/client";
import { createContext, Dispatch, SetStateAction, useCallback, useContext, useEffect, useState } from "react";
import { CollectionTypeCategory, CollectionTypeMinimal } from "arwi-backend/src/types";
import { Evaluation } from "../../../../components/ClassParticipationEvaluationCard";
import { graphql } from "../../../../gql";
import { CollectionCreationProvider_GetGroupQuery } from "../../../../gql/graphql";
import { useThrowCatchableError } from "../../../../hooks-and-providers/error";

const CollectionCreationProvider_GetGroup_Query = graphql(`
  query CollectionCreationProvider_GetGroup($groupId: ID!) {
    getGroup(id: $groupId) {
      id
      currentModule {
        id
        students {
          id
          name
          currentModuleEvaluations {
            id
            notes
          }
        }
      }
      collectionTypes {
        id
        name
        category
      }
      ...CollectionGeneralInfoView_Group
    }
  }
`);

export type CollectionData = {
  description: string;
  date: Date;
  environmentCode: string | undefined;
  learningObjectiveCodes: string[];
};

export type EvaluationData = Omit<Evaluation, "student"> & {
  student: { id: string; name: string } & Evaluation["student"];
};

const initialData: Omit<CollectionData, "collectionType"> = {
  description: "",
  date: new Date(),
  environmentCode: undefined,
  learningObjectiveCodes: [],
};

type EvaluationStructure = Record<string, EvaluationData>;

type CollectionCreationContextParams = {
  generalData: CollectionData;
  loading: boolean;
  collectionType?: CollectionTypeMinimal;
  evaluations?: EvaluationData[];
  evaluationIds?: string[];
  evaluationData?: EvaluationStructure;
  groupInfo?: CollectionCreationProvider_GetGroupQuery["getGroup"];
  setGeneralData: (data: CollectionData) => void;
  setEvaluations: Dispatch<SetStateAction<EvaluationData[] | undefined>>;
  updateEvaluation: (evaluation: EvaluationData) => void;
};

const CollectionCreationContext = createContext<CollectionCreationContextParams | null>(null);

const { Provider } = CollectionCreationContext;

export const useCollectionCreationContext = (): Required<Omit<CollectionCreationContextParams, "loading">> => {
  const context = useContext(CollectionCreationContext);
  if (!context) {
    throw new Error("useCollectionCreationContext context not found or not loaded. Make sure view is wrapped with CollectionCreationLayout.");
  }
  const { groupInfo, evaluations, evaluationIds, evaluationData, collectionType } = context;
  if (!groupInfo || !evaluations || !evaluationIds || !evaluationData || !collectionType)
    throw new Error(
      "CollectionCreationContext is missing data. Make sure you have conditional rendering for children using this with loading from original context as condition"
    );
  return {
    ...context,
    groupInfo,
    evaluations,
    evaluationIds,
    evaluationData,
    collectionType,
  };
};

type CollectionCreationProviderProps = React.PropsWithChildren<{ groupId: string; collectionType: CollectionTypeCategory }>;

function CollectionCreationProvider({ children, groupId, collectionType: collectionTypeCategory }: CollectionCreationProviderProps) {
  const throwCatchableError = useThrowCatchableError();
  const [generalData, setGeneralData] = useState<CollectionData>(initialData);
  const [evaluations, setEvaluations] = useState<EvaluationData[]>();
  const [evaluationIds, setEvaluationIds] = useState<string[]>();
  const [evaluationData, setEvaluationData] = useState<EvaluationStructure>();
  const [collectionType, setCollectionType] = useState<CollectionTypeMinimal>();

  const { data: queryData } = useQuery(CollectionCreationProvider_GetGroup_Query, {
    variables: {
      groupId,
    },
  });

  const updateEvaluation = useCallback((evaluation: EvaluationData) => {
    setEvaluationData((prev) => ({ ...prev, [evaluation.student.id]: evaluation }));
  }, []);

  useEffect(() => {
    if (queryData?.getGroup) {
      const { getGroup } = queryData;
      const sortedEvaluations = getGroup.currentModule.students
        .map((student) => ({ student, wasPresent: true }))
        .sort((a, b) => a.student.name.localeCompare(b.student.name));

      const evaluationDataTemp: EvaluationStructure = {};
      const evaluationIdsTemp: string[] = sortedEvaluations.map((it) => it.student.id);
      sortedEvaluations.forEach((it) => {
        evaluationDataTemp[it.student.id] = {
          student: it.student,
          wasPresent: it.wasPresent,
        };
      });
      const matchingCollectionType = queryData?.getGroup?.collectionTypes.find((it) => it.category === collectionTypeCategory);
      if (!matchingCollectionType)
        throwCatchableError(new Error("Invalid collection type passed to collection creation, type not found in group's collection types"));

      setEvaluations(sortedEvaluations);
      setEvaluationIds(evaluationIdsTemp);
      setEvaluationData(evaluationDataTemp);
      setCollectionType(matchingCollectionType);
    }
  }, [collectionTypeCategory, queryData, throwCatchableError]);

  return (
    <Provider
      value={{
        generalData,
        evaluations,
        setEvaluations,
        evaluationIds,
        evaluationData,
        collectionType,
        groupInfo: queryData?.getGroup,
        updateEvaluation,
        setGeneralData,
        loading: !queryData || !evaluations || !evaluationIds || !evaluationData || !collectionType,
      }}
    >
      {children}
    </Provider>
  );
}

export { CollectionCreationContext, CollectionCreationProvider };
