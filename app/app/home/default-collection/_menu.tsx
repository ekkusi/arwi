import { useMutation } from "@apollo/client";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import { MenuOption } from "react-native-popup-menu";
import { Alert } from "react-native";
import { graphql } from "@/graphql";
import { HomeStackParams } from "../types";
import CText from "../../../components/primitives/CText";
import { useModal } from "../../../hooks-and-providers/ModalProvider";
import SaveAndCancelButtons from "../../../components/ui/SaveAndCancelButtons";
import { getErrorMessage } from "../../../helpers/errorUtils";
import ViewMenuBase from "@/components/common/ViewMenuBase";

const DefaultCollectionMenu_DeleteCollection_Mutation = graphql(`
  mutation DefaultCollectionMenu_DeleteCollection($id: ID!) {
    deleteCollection(collectionId: $id) {
      id
      module {
        id
        evaluationCollections {
          id
        }
        group {
          id
          currentModule {
            id
            collectionTypes {
              id
              defaultTypeCollection {
                id
              }
            }
          }
        }
      }
    }
  }
`);

function DeleteCollection({ collectionId, onDeleted, onCancel }: { collectionId: string; onDeleted: () => void; onCancel: () => void }) {
  const { t } = useTranslation();
  const [deleteCollection, { loading }] = useMutation(DefaultCollectionMenu_DeleteCollection_Mutation, {
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
        {t("delete-default-collection-confirmation-info", "Jos poistat arvioinnin, menetät kaikki arviointiin liittyvät tiedot.")}
      </CText>
      <SaveAndCancelButtons variant="delete" loading={loading} onSave={deleteCollection} onCancel={onCancel} />
    </>
  );
}

type DefaultCollectionMenuProps = NativeStackScreenProps<HomeStackParams, "default-evaluation-collection">;

export default function DefaultCollectionMenu({ route, navigation }: DefaultCollectionMenuProps) {
  const { t } = useTranslation();
  const { openModal, closeModal } = useModal();
  const id = route.params.collectionId;
  if (!id) return null;
  return (
    <ViewMenuBase>
      <MenuOption onSelect={() => navigation.navigate("default-collection-edit", { collectionId: id })}>
        <CText>{t("edit-general-details", "Muokkaa yleistietoja")}</CText>
      </MenuOption>
      <MenuOption onSelect={() => navigation.navigate("edit-all-default-evaluations", { collectionId: id })}>
        <CText>{t("edit-evaluations", "Muokkaa arviointeja")}</CText>
      </MenuOption>
      <MenuOption
        onSelect={() => {
          openModal({
            title: t("delete-default-collection-confirmation-title", "Oletko varma?"),
            children: (
              <DeleteCollection
                onCancel={closeModal}
                onDeleted={() => {
                  navigation.setParams({ collectionId: undefined });
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
