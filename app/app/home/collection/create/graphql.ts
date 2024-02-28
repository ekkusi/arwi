import { graphql } from "@/graphql";

export const CollectionGeneralInfoView_Group_Fragment = graphql(`
  fragment CollectionGeneralInfoView_Group on Group {
    subject {
      code
    }
    currentModule {
      id
      info {
        educationLevel
        learningObjectiveGroupKey
      }
    }
  }
`);

export const CollectionCreationProvider_GetGroup_Query = graphql(
  `
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
  `,
  [CollectionGeneralInfoView_Group_Fragment]
);
