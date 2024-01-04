import { useQuery } from "@apollo/client";
import { createContext, Dispatch, SetStateAction, useCallback, useContext, useEffect, useState } from "react";
import { CollectionTypeMinimal } from "arwi-backend/src/types";
import { DefaultEvaluation } from "../../../../../components/DefaultEvaluationCard";
import { graphql } from "../../../../../gql";
import { CollectionCreationProvider_GetGroupQuery } from "../../../../../gql/graphql";
import { useThrowCatchableError } from "../../../../../hooks-and-providers/error";

const DefaultCollectionCreationProvider_GetGroup_Query = graphql(`
  query DefaultCollectionCreationProvider_GetGroup($groupId: ID!) {
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

export type DefaultCollectionData = {
  description: string;
  date: Date;
};

export type DefaultEvaluationData = Omit<DefaultEvaluation, "student"> & {
  student: { id: string; name: string } & DefaultEvaluation["student"];
};

const initialData: Omit<DefaultCollectionData, "collectionType"> = {
  description: "",
  date: new Date(),
};

type DefaultEvaluationStructure = Record<string, DefaultEvaluationData>;

type DefaultCollectionCreationContextParams = {
  generalData: DefaultCollectionData;
  loading: boolean;
  collectionType?: CollectionTypeMinimal;
  evaluations?: DefaultEvaluationData[];
  evaluationIds?: string[];
  evaluationData?: DefaultEvaluationStructure;
  groupInfo?: CollectionCreationProvider_GetGroupQuery["getGroup"];
  setGeneralData: (data: DefaultCollectionData) => void;
  setEvaluations: Dispatch<SetStateAction<DefaultEvaluationData[] | undefined>>;
  updateEvaluation: (evaluation: DefaultEvaluationData) => void;
};

const DefaultCollectionCreationContext = createContext<DefaultCollectionCreationContextParams | null>(null);

const { Provider } = DefaultCollectionCreationContext;

export const useDefaultCollectionCreationContext = (): Required<Omit<DefaultCollectionCreationContextParams, "loading">> => {
  const context = useContext(DefaultCollectionCreationContext);
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

type DefaultCollectionCreationProviderProps = React.PropsWithChildren<{ groupId: string; collectionTypeId: string }>;

function DefaultCollectionCreationProvider({ children, groupId, collectionTypeId }: DefaultCollectionCreationProviderProps) {
  const throwCatchableError = useThrowCatchableError();
  const [generalData, setGeneralData] = useState<DefaultCollectionData>(initialData);
  const [evaluations, setEvaluations] = useState<DefaultEvaluationData[]>();
  const [evaluationIds, setEvaluationIds] = useState<string[]>();
  const [evaluationData, setEvaluationData] = useState<DefaultEvaluationStructure>();
  const [collectionType, setCollectionType] = useState<CollectionTypeMinimal>();

  const { data: queryData } = useQuery(DefaultCollectionCreationProvider_GetGroup_Query, {
    variables: {
      groupId,
    },
  });

  const updateEvaluation = useCallback((evaluation: DefaultEvaluationData) => {
    setEvaluationData((prev) => ({ ...prev, [evaluation.student.id]: evaluation }));
  }, []);

  useEffect(() => {
    if (queryData?.getGroup) {
      const { getGroup } = queryData;
      const sortedEvaluations = getGroup.currentModule.students
        .map((student) => ({ student, wasPresent: true }))
        .sort((a, b) => a.student.name.localeCompare(b.student.name));

      const evaluationDataTemp: DefaultEvaluationStructure = {};
      const evaluationIdsTemp: string[] = sortedEvaluations.map((it) => it.student.id);
      sortedEvaluations.forEach((it) => {
        evaluationDataTemp[it.student.id] = {
          student: it.student,
          wasPresent: it.wasPresent,
        };
      });
      const matchingCollectionType = queryData?.getGroup?.collectionTypes.find((it) => it.id === collectionTypeId);
      if (!matchingCollectionType)
        throwCatchableError(new Error("Invalid collection type passed to collection creation, type not found in group's collection types"));

      setEvaluations(sortedEvaluations);
      setEvaluationIds(evaluationIdsTemp);
      setEvaluationData(evaluationDataTemp);
      setCollectionType(matchingCollectionType);
    }
  }, [collectionTypeId, queryData, throwCatchableError]);

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

export { DefaultCollectionCreationContext, DefaultCollectionCreationProvider };
