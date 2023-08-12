import { useMutation } from "@apollo/client";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import { Menu, MenuOption, MenuOptions, MenuTrigger } from "react-native-popup-menu";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { Alert } from "react-native";
import { graphql } from "../../gql";
import { HomeStackParams } from "./types";
import CView from "../../components/primitives/CView";
import CText from "../../components/primitives/CText";

const CollectionHeaderRightButton_DeleteCollection_Mutation = graphql(`
  mutation CollectionHeaderRightButton_DeleteCollection($id: ID!) {
    deleteCollection(collectionId: $id) {
      id
      classYear {
        id
        evaluationCollections {
          id
        }
        group {
          id
          name
        }
      }
    }
  }
`);

export default function CollectionHeaderRightButton({
  id,
  navigation,
}: {
  id: string;
  navigation: NativeStackNavigationProp<HomeStackParams, "collection">;
}) {
  const { t } = useTranslation();
  const [deleteCollection] = useMutation(CollectionHeaderRightButton_DeleteCollection_Mutation);
  return (
    <Menu>
      <MenuTrigger>
        <MaterialCommunityIcon name="dots-vertical" size={25} color="white" />
      </MenuTrigger>
      <MenuOptions>
        <CView style={{ padding: 10, borderRadius: 10, gap: 4 }}>
          <MenuOption
            onSelect={() => {
              navigation.navigate("collection-edit", { collectionId: id });
            }}
          >
            <CText>{t("edit-general-details", "Muokkaa yleistietoja")}</CText>
          </MenuOption>
          <MenuOption
            onSelect={() => {
              navigation.navigate("edit-all-evaluations", { collectionId: id });
            }}
          >
            <CText>{t("edit-evaluations", "Muokkaa arviointeja")}</CText>
          </MenuOption>
          <MenuOption
            onSelect={() => {
              Alert.alert(
                t("delete-evaluation-confirmation-title", "Oletko varma?"),
                t("delete-evaluation-confirmation-info", "Jos poistat arvioinnin, menetät kaikki arviointiin liittyvät tietot :("),
                [
                  {
                    text: t("no", "Ei"),
                    onPress: () => null,
                    style: "cancel",
                  },
                  {
                    text: t("yes", "Kyllä"),
                    onPress: async () => {
                      await deleteCollection({
                        variables: { id },
                        update: (cache, { data }) => {
                          if (!data) throw new Error("Unexpected error: No data returned from mutation");
                        },
                      });
                      navigation.goBack();
                    },
                  },
                ]
              );
            }}
          >
            <CText>{t("delete-evaluation", "Poista arviointi")}</CText>
          </MenuOption>
        </CView>
      </MenuOptions>
    </Menu>
  );
}
