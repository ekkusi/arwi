import { CollectionStatistics_Collection_Fragment } from "@/components/charts/CollectionStatistics";
import { graphql } from "@/graphql";

export const GroupOverviewPage_GetGroup_Query = graphql(
  `
    query GroupOverviewPage_GetGroup($groupId: ID!) {
      getGroup(id: $groupId) {
        id
        name
        archived
        subject {
          label {
            fi
          }
          code
        }
        currentModule {
          id
          info {
            educationLevel
            learningObjectiveGroupKey
            label {
              fi
            }
          }
          students {
            id
            name
            currentModuleEvaluations {
              id
              wasPresent
            }
          }
          evaluationCollections {
            id
            date
            type {
              id
              category
            }
            __typename
            ... on ClassParticipationCollection {
              environment {
                label {
                  fi
                }
                code
                color
              }
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
              ...CollectionStatistics_EvaluationCollection
            }
          }
        }
        currentModule {
          id
          collectionTypes {
            id
            category
            name
            weight
            defaultTypeCollection {
              id
            }
          }
        }
      }
    }
  `,
  [CollectionStatistics_Collection_Fragment]
);
