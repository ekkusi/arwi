"use client";

import { Button, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "../../../i18n/client";
import ModalTemplate from "../../../components/primitives/ModalTemplate";
import { graphql } from "../../../gql";
import { getErrorMessage } from "../../../utils/errorUtils";
import { useAuth } from "../../../hooks-and-providers/AuthProvider";

export type DeleteUserModalAndButtonProps = {
  user: {
    id: string;
    email?: string;
  };
};

const DeleteUserAndModalButton_DeleteTeacher_Mutation = graphql(`
  mutation DeleteUserAndModalButton_DeleteTeacher($id: ID!) {
    deleteTeacher(teacherId: $id) {
      id
    }
  }
`);

export default function DeleteUserModalAndButton({ user }: DeleteUserModalAndButtonProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { t } = useTranslation();
  const [error, setError] = useState<string | null>(null);
  const [confirmationString, setConfirmationString] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const { setIsAuthenticated } = useAuth();

  const isEmailConfirmation = !!user.email;
  const confirmationStringTarget = isEmailConfirmation ? user.email : t("account-delete.confirmation-string", "POISTA_KAYTTAJA");

  const [deleteTeacher, { loading: deleteTeacherLoading }] = useMutation(DeleteUserAndModalButton_DeleteTeacher_Mutation);

  const handleDelete = async () => {
    if (confirmationStringTarget !== confirmationString) return;
    try {
      await deleteTeacher({ variables: { id: user.id } });
      setIsAuthenticated(false);
      setIsDeleteModalOpen(false);
      router.replace(`${pathname}?${new URLSearchParams({ delete_success: "true" })}`);
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  const isConfirmationValid = confirmationStringTarget === confirmationString;

  return (
    <>
      <Button onClick={() => setIsDeleteModalOpen(true)} variant="solid" colorScheme="red">
        {t("account-delete.delete-account", "Poista käyttäjä")}
      </Button>
      <ModalTemplate
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        headerLabel={t("account-delete.delete-confirmation", "Haluatko varmasti poistaa käyttäjäsi?")}
        modalFooter={
          <>
            <Button variant="ghost" colorScheme="gray" onClick={() => setIsDeleteModalOpen(false)} mr="3">
              {t("cancel", "Peruuta")}
            </Button>
            <Button variant="solid" colorScheme="red" onClick={handleDelete} isDisabled={!isConfirmationValid} isLoading={deleteTeacherLoading}>
              {t("account-delete.delete-account", "Poista käyttäjä")}
            </Button>
          </>
        }
      >
        <Text fontWeight="semibold">{t("note", "HUOM!")}</Text>
        <Text>
          {t(
            "account-delete.deletion-description",
            "Käyttäjäsi poistaminen on lopullinen. Tietojasi ei voida palauttaa tämän jälkeen. Poistamalla käyttäjäsi, kaikki siihen liittyvät Arwin sisällä luodut tiedot, kuten arvioinnit, poistuvat käyttäjäsi mukana."
          )}
        </Text>
        {isEmailConfirmation ? (
          <Text>
            {t("account-delete.if-you-still-want-to-delete", "Jos silti haluat poistaa käyttäjäsi, varmista poisto syöttämällä tunnuksesi alle:")}
          </Text>
        ) : (
          <Text>
            {t(
              "account-delete.if-you-still-want-to-delete-mpassid",
              "Jos silti haluat poistaa käyttäjäsi, varmista poisto syöttämällä alle {{confirmation_string}}:",
              { confirmation_string: confirmationStringTarget }
            )}
          </Text>
        )}
        <Input placeholder={confirmationStringTarget} value={confirmationString} onChange={(e) => setConfirmationString(e.target.value)} />
        {error && <Text color="red">{error}</Text>}
      </ModalTemplate>
    </>
  );
}
