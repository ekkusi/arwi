import { useQuery } from "@apollo/client";
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
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

type DefaultCollectionCreationContextParams = {
  generalData: DefaultCollectionData;
  loading: boolean;
  collectionType?: CollectionTypeMinimal;
  evaluations?: DefaultEvaluationData[];
  groupInfo?: CollectionCreationProvider_GetGroupQuery["getGroup"];
  setGeneralData: (data: DefaultCollectionData) => void;
  setEvaluations: Dispatch<SetStateAction<DefaultEvaluationData[] | undefined>>;
};

const DefaultCollectionCreationContext = createContext<DefaultCollectionCreationContextParams | null>(null);

const { Provider } = DefaultCollectionCreationContext;

export const useDefaultCollectionCreationContext = (): Required<Omit<DefaultCollectionCreationContextParams, "loading">> => {
  const context = useContext(DefaultCollectionCreationContext);
  if (!context) {
    throw new Error("useCollectionCreationContext context not found or not loaded. Make sure view is wrapped with CollectionCreationLayout.");
  }
  const { groupInfo, evaluations, collectionType } = context;
  if (!groupInfo || !evaluations || !collectionType)
    throw new Error(
      "CollectionCreationContext is missing data. Make sure you have conditional rendering for children using this with loading from original context as condition"
    );
  return {
    ...context,
    groupInfo,
    evaluations,
    collectionType,
  };
};

type DefaultCollectionCreationProviderProps = React.PropsWithChildren<{ groupId: string; collectionTypeId: string }>;

function DefaultCollectionCreationProvider({ children, groupId, collectionTypeId }: DefaultCollectionCreationProviderProps) {
  const throwCatchableError = useThrowCatchableError();
  const [generalData, setGeneralData] = useState<DefaultCollectionData>(initialData);
  const [evaluations, setEvaluations] = useState<DefaultEvaluationData[]>();
  const [collectionType, setCollectionType] = useState<CollectionTypeMinimal>();

  const { data: queryData } = useQuery(DefaultCollectionCreationProvider_GetGroup_Query, {
    variables: {
      groupId,
    },
  });

  useEffect(() => {
    if (queryData?.getGroup) {
      const { getGroup } = queryData;
      const sortedEvaluations = getGroup.currentModule.students
        .map((student) => ({ student, wasPresent: true, rating: 7 }))
        .sort((a, b) => a.student.name.localeCompare(b.student.name));

      const matchingCollectionType = queryData?.getGroup?.collectionTypes.find((it) => it.id === collectionTypeId);
      if (!matchingCollectionType)
        throwCatchableError(new Error("Invalid collection type passed to collection creation, type not found in group's collection types"));

      setEvaluations(sortedEvaluations);
      setCollectionType(matchingCollectionType);
    }
  }, [collectionTypeId, queryData, throwCatchableError]);

  return (
    <Provider
      value={{
        generalData,
        evaluations,
        setEvaluations,
        collectionType,
        groupInfo: queryData?.getGroup,
        setGeneralData,
        loading: !queryData || !evaluations || !collectionType,
      }}
    >
      {children}
    </Provider>
  );
}

export { DefaultCollectionCreationContext, DefaultCollectionCreationProvider };
