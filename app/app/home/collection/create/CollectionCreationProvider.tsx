import { useQuery } from "@apollo/client";
import { createContext, useContext, useEffect, useState } from "react";
import { Evaluation } from "../../../../components/UpdateEvaluationCard";
import { graphql } from "../../../../gql";
import { CollectionCreationProvider_GetGroupQuery } from "../../../../gql/graphql";

const CollectionCreationProvider_GetGroup_Query = graphql(`
  query CollectionCreationProvider_GetGroup($groupId: ID!) {
    getGroup(id: $groupId) {
      id
      currentClassYear {
        id
        students {
          id
          name
          currentClassEvaluations {
            id
            notes
          }
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

type CollectionCreationContextParams = {
  generalData: CollectionData;
  loading: boolean;
  evaluations?: EvaluationData[];
  groupInfo?: CollectionCreationProvider_GetGroupQuery["getGroup"];
  setGeneralData: (data: CollectionData) => void;
  setEvaluations: (evaluations: EvaluationData[]) => void;
};

const initialData: CollectionData = { description: "", date: new Date(), learningObjectiveCodes: [], environmentCode: undefined };

const CollectionCreationContext = createContext<CollectionCreationContextParams | null>(null);

const { Provider } = CollectionCreationContext;

export const useCollectionCreationContext = (): Required<Omit<CollectionCreationContextParams, "loading">> => {
  const context = useContext(CollectionCreationContext);
  if (!context) {
    throw new Error("useCollectionCreationContext context not found or not loaded. Make sure view is wrapped with CollectionCreationLayout.");
  }
  const { groupInfo, evaluations } = context;
  if (!groupInfo || !evaluations)
    throw new Error(
      "CollectionCreationContext is missing data. Make sure you have conditional rendering for children using this with loading from original context as condition"
    );
  return {
    ...context,
    groupInfo,
    evaluations,
  };
};

type CollectionCreationProviderProps = React.PropsWithChildren<{ groupId: string }>;

function CollectionCreationProvider({ children, groupId }: CollectionCreationProviderProps) {
  const [generalData, setGeneralData] = useState<CollectionData>(initialData);
  const [evaluations, setEvaluations] = useState<EvaluationData[]>();

  const { data: queryData } = useQuery(CollectionCreationProvider_GetGroup_Query, {
    variables: {
      groupId,
    },
  });

  useEffect(() => {
    if (queryData?.getGroup) {
      const { getGroup } = queryData;
      const sortedEvaluations = getGroup.currentClassYear.students
        .map((student) => ({ student, wasPresent: true }))
        .sort((a, b) => a.student.name.localeCompare(b.student.name));
      setEvaluations(sortedEvaluations);
    }
  }, [queryData]);

  return (
    <Provider
      value={{
        generalData,
        evaluations,
        setEvaluations,
        groupInfo: queryData?.getGroup,
        setGeneralData,
        loading: !queryData || !evaluations,
      }}
    >
      {children}
    </Provider>
  );
}

export { CollectionCreationContext, CollectionCreationProvider };
