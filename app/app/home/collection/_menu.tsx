import { useMutation } from "@apollo/client";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import { MenuOption } from "react-native-popup-menu";
import { Alert } from "react-native";
import { graphql } from "@/graphql";
import { HomeStackParams } from "../types";
import CText from "../../../components/primitives/CText";
import { useModal } from "../../../hooks-and-providers/ModalProvider";
import SaveAndCancelButtons from "../../../components/SaveAndCancelButtons";
import { getErrorMessage } from "../../../helpers/errorUtils";
import ViewMenuBase from "@/components/ViewMenuBase";

const CollectionMenu_DeleteCollection_Mutation = graphql(`
  mutation CollectionMenu_DeleteCollection($id: ID!) {
    deleteCollection(collectionId: $id) {
      id
      module {
        id
        evaluationCollections {
          id
        }
      }
    }
  }
`);

function DeleteCollection({ collectionId, onDeleted, onCancel }: { collectionId: string; onDeleted: () => void; onCancel: () => void }) {
  const { t } = useTranslation();
  const [deleteCollection, { loading }] = useMutation(CollectionMenu_DeleteCollection_Mutation, {
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
        {t("delete-collection-confirmation-info", "Jos poistat arvioinnin, menetät kaikki arviointiin liittyvät tiedot.")}
      </CText>
      <SaveAndCancelButtons variant="delete" loading={loading} onSave={deleteCollection} onCancel={onCancel} />
    </>
  );
}

type CollectionMenuProps = NativeStackScreenProps<HomeStackParams, "collection">;

export default function CollectionMenu({ route, navigation }: CollectionMenuProps) {
  const { t } = useTranslation();
  const { openModal, closeModal } = useModal();
  const { id } = route.params;
  return (
    <ViewMenuBase>
      <MenuOption
        onSelect={() =>
          navigation.navigate("collection-edit", {
            collectionId: id,
            onSaved: (newEnvironmentLabel, newDate) => {
              navigation.setParams({ environmentLabel: newEnvironmentLabel, date: newDate });
            },
          })
        }
      >
        <CText>{t("edit-general-details", "Muokkaa yleistietoja")}</CText>
      </MenuOption>
      <MenuOption onSelect={() => navigation.navigate("edit-all-evaluations", { collectionId: id })}>
        <CText>{t("edit-evaluations", "Muokkaa arviointeja")}</CText>
      </MenuOption>
      <MenuOption
        onSelect={() => {
          openModal({
            title: t("delete-collection-confirmation-title", "Oletko varma?"),
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
        <CText>{t("delete-collection", "Poista arviointi")}</CText>
      </MenuOption>
    </ViewMenuBase>
  );
}
