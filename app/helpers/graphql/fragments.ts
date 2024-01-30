import { graphql } from "../../gql";

export const ClassParticipationCollectionUpdate_GeneralInfoMinimal_Fragment = graphql(`
  fragment ClassParticipationCollectionUpdate_GeneralInfoMinimal on ClassParticipationCollection {
    id
    date
    description
    environment {
      label {
        fi
      }
      code
    }
  }
`);

export const ClassParticipationCollectionUpdate_GeneralInfoFull_Fragment = graphql(`
  fragment ClassParticipationCollectionUpdate_GeneralInfoFull on ClassParticipationCollection {
    ...ClassParticipationCollectionUpdate_GeneralInfoMinimal
    learningObjectives {
      code
      label {
        fi
      }
      description {
        fi
      }
      type
    }
  }
`);

export const DefaultCollectionUpdate_Info_Fragment = graphql(`
  fragment DefaultCollectionUpdate_Info on DefaultCollection {
    id
    date
    description
  }
`);

export const ClassParticipationEvaluationUpdate_Info_Fragment = graphql(`
  fragment ClassParticipationEvaluationUpdate_Info on ClassParticipationEvaluation {
    id
    wasPresent
    skillsRating
    behaviourRating
    notes
  }
`);

export const DefaultEvaluationUpdate_Info_Fragment = graphql(`
  fragment DefaultEvaluationUpdate_Info on DefaultEvaluation {
    id
    wasPresent
    rating
    notes
  }
`);

export const GroupCollectionTypesUpdate_TypeInfo_Fragment = graphql(`
  fragment GroupCollectionTypesUpdate_TypeInfo on CollectionType {
    id
    category
    weight
    name
  }
`);

export const GroupCollectionTypesUpdate_Fragment = graphql(`
  fragment GroupCollectionTypesUpdate on Group {
    id
    currentModule {
      id
      collectionTypes {
        ...GroupCollectionTypesUpdate_TypeInfo
      }
    }
  }
`);
