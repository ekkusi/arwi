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
import { useModal } from "../../hooks-and-providers/ModalProvider";
import SaveAndCancelButtons from "../../components/SaveAndCancelButtons";
import { getErrorMessage } from "../../helpers/errorUtils";
import { CollectionTypeCategory } from "../../gql/graphql";

const CollectionHeaderRightButton_DeleteCollection_Mutation = graphql(`
  mutation CollectionHeaderRightButton_DeleteCollection($id: ID!) {
    deleteCollection(collectionId: $id) {
      id
      module {
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

function DeleteCollection({ collectionId, onDeleted, onCancel }: { collectionId: string; onDeleted: () => void; onCancel: () => void }) {
  const { t } = useTranslation();
  const [deleteCollection, { loading }] = useMutation(CollectionHeaderRightButton_DeleteCollection_Mutation, {
    variables: { id: collectionId },
    onCompleted: onDeleted,
    onError: (e) => {
      console.error(e);
      Alert.alert(t("general-error"), getErrorMessage(e));
    },
  });

  return (
    <>
      <CText style={{ marginBottom: "lg" }}>
        {t("delete-evaluation-confirmation-info", "Jos poistat arvioinnin, menetät kaikki arviointiin liittyvät tiedot.")}
      </CText>
      <SaveAndCancelButtons variant="delete" loading={loading} onSave={deleteCollection} onCancel={onCancel} />
    </>
  );
}

export default function CollectionHeaderRightButton({
  id,
  isClassParticipation,
  navigation,
}: {
  id: string;
  isClassParticipation: boolean;
  navigation: NativeStackNavigationProp<HomeStackParams, "collection">;
}) {
  const { t } = useTranslation();
  const { openModal, closeModal } = useModal();
  return (
    <Menu>
      <MenuTrigger>
        <MaterialCommunityIcon name="dots-vertical" size={25} color="white" />
      </MenuTrigger>
      <MenuOptions>
        <CView style={{ padding: 10, borderRadius: 10, gap: 4 }}>
          <MenuOption
            onSelect={() => {
              if (isClassParticipation) {
                navigation.navigate("collection-edit", {
                  collectionId: id,
                  onSaved: (newEnvironmentLabel, newDate) => {
                    navigation.setParams({ environmentLabel: newEnvironmentLabel, date: newDate });
                  },
                });
              } else {
                navigation.navigate("default-collection-edit", { collectionId: id });
              }
            }}
          >
            <CText>{t("edit-general-details", "Muokkaa yleistietoja")}</CText>
          </MenuOption>
          <MenuOption
            onSelect={() => {
              if (isClassParticipation) {
                navigation.navigate("edit-all-evaluations", { collectionId: id });
              } else {
                navigation.navigate("edit-all-default-evaluations", { collectionId: id });
              }
            }}
          >
            <CText>{t("edit-evaluations", "Muokkaa arviointeja")}</CText>
          </MenuOption>
          <MenuOption
            onSelect={() => {
              openModal({
                title: t("delete-evaluation-confirmation-title", "Oletko varma?"),
                children: (
                  <DeleteCollection
                    onCancel={closeModal}
                    onDeleted={() => {
                      navigation.goBack();
                      closeModal();
                    }}
                    collectionId={id}
                  />
                ),
              });
            }}
          >
            <CText>{t("delete-evaluation", "Poista arviointi")}</CText>
          </MenuOption>
        </CView>
      </MenuOptions>
    </Menu>
  );
}
