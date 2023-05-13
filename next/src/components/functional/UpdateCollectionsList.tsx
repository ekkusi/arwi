import DeleteButton from "@/components/server-components/primitives/DeleteButton";
import { Box, Flex, Text, FlexProps, IconButton } from "@chakra-ui/react";
import ConfirmationModal from "@/components/general/ConfirmationModal";
import { FragmentType, graphql, getFragmentData } from "@/gql";
import { UpdateCollectionsList_CollectionFragment as CollectionFragment } from "@/gql/graphql";
import graphqlClient from "@/graphql-client";
import { formatDate } from "@/utils/dateUtils";
import { useState } from "react";
import Link from "next/link";
import { FiEdit } from "react-icons/fi";

const UpdateCollectionsList_CollectionFragment = graphql(`
  fragment UpdateCollectionsList_Collection on EvaluationCollection {
    id
    date
    environment {
      label
    }
  }
`);

const UpdateCollectionList_DeleteCollectionMutation = graphql(`
  mutation UpdateCollectionList_DeleteCollection($id: ID!) {
    deleteCollection(collectionId: $id)
  }
`);

type UpdateCollectionsListProps = FlexProps & {
  collections: FragmentType<typeof UpdateCollectionsList_CollectionFragment>[];
  onChanged?(collections: CollectionFragment[]): void;
};

export default function UpdateCollectionsList({ onChanged, collections: collectionFragments, ...rest }: UpdateCollectionsListProps) {
  const initialCollections = getFragmentData(UpdateCollectionsList_CollectionFragment, collectionFragments);
  const [collectionInDelete, setCollectionInDelete] = useState<CollectionFragment | undefined>();
  const [collections, setCollections] = useState<CollectionFragment[]>(() =>
    [...initialCollections].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  );

  const deleteSelectedCollection = async () => {
    if (!collectionInDelete) return;
    // Copy old array -> remove by index from copy -> set copy as new state
    const collectionId = collectionInDelete.id;
    const index = collections.findIndex((it) => it.id === collectionInDelete.id);
    const newCollections = [...collections];
    newCollections.splice(index, 1);
    setCollections(newCollections);
    if (onChanged) onChanged(newCollections);
    setCollectionInDelete(undefined); // Close modal already before running backend delete
    await graphqlClient.request(UpdateCollectionList_DeleteCollectionMutation, {
      id: collectionId,
    });
  };

  return (
    <Box {...rest}>
      {collections.map((it) => (
        <Flex key={it.id} alignItems="center" justifyContent="space-between" mb="2">
          <Box>
            <Text as="span" textStyle="italic" mr="1">
              {formatDate(new Date(it.date), "dd.MM.yyyy")}:
            </Text>
            <Text as="span">{it.environment.label}</Text>
          </Box>
          <Flex mr="2">
            {/* TODO: Show this when the actual editing page is ready */}
            <IconButton
              variant="link"
              colorScheme="green"
              as={Link}
              icon={<FiEdit />}
              aria-label="Arvioinnin muokkaukseen"
              href={`/collection/${it.id}/edit`}
              mr="2"
            />
            <DeleteButton onClick={() => setCollectionInDelete(it)} aria-label="Poista arviointi" />
          </Flex>
        </Flex>
      ))}
      <ConfirmationModal isOpen={!!collectionInDelete} onClose={() => setCollectionInDelete(undefined)} onAccept={() => deleteSelectedCollection()}>
        <Text>
          Oletko varma, että haluat poistaa arvioinnin{" "}
          <Text as="span" fontStyle="italic">
            {collectionInDelete && `${formatDate(new Date(collectionInDelete.date))} ${collectionInDelete.environment.label}`}
          </Text>
          ? Kaikkien oppilaiden arviointitiedot kyseiseltä arviointikerralta poistuvat samalla.
        </Text>
      </ConfirmationModal>
    </Box>
  );
}
