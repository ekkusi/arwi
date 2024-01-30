import { useQuery } from "@apollo/client";
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
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
      currentModule {
        collectionTypes {
          id
          name
          category
        }
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

type CollectionCreationContextParams = {
  generalData: CollectionData;
  loading: boolean;
  collectionType?: CollectionTypeMinimal;
  evaluations?: EvaluationData[];
  groupInfo?: CollectionCreationProvider_GetGroupQuery["getGroup"];
  setGeneralData: (data: CollectionData) => void;
  setEvaluations: Dispatch<SetStateAction<EvaluationData[] | undefined>>;
};

const CollectionCreationContext = createContext<CollectionCreationContextParams | null>(null);

const { Provider } = CollectionCreationContext;

export const useCollectionCreationContext = (): Required<Omit<CollectionCreationContextParams, "loading">> => {
  const context = useContext(CollectionCreationContext);
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

type CollectionCreationProviderProps = React.PropsWithChildren<{ groupId: string }>;

function CollectionCreationProvider({ children, groupId }: CollectionCreationProviderProps) {
  const throwCatchableError = useThrowCatchableError();
  const [generalData, setGeneralData] = useState<CollectionData>(initialData);
  const [evaluations, setEvaluations] = useState<EvaluationData[]>();
  const [collectionType, setCollectionType] = useState<CollectionTypeMinimal>();

  const { data: queryData } = useQuery(CollectionCreationProvider_GetGroup_Query, {
    variables: {
      groupId,
    },
  });

  useEffect(() => {
    if (queryData?.getGroup) {
      const { getGroup } = queryData;
      const mappedEvaluations = getGroup.currentModule.students.map((student) => ({ student, wasPresent: true }));

      const matchingCollectionType = queryData?.getGroup?.currentModule.collectionTypes.find(
        (it) => it.category === CollectionTypeCategory.CLASS_PARTICIPATION
      );
      if (!matchingCollectionType)
        throwCatchableError(new Error("Invalid collection type passed to collection creation, type not found in group's collection types"));

      setEvaluations(mappedEvaluations);
      setCollectionType(matchingCollectionType);
    }
  }, [queryData, throwCatchableError]);

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

export { CollectionCreationContext, CollectionCreationProvider };
