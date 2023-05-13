import { FragmentType, getFragmentData, graphql } from "@/gql";
import { ClassYearCode } from "@/gql/graphql";
import graphqlClient from "@/graphql-client";
import { Checkbox, Flex, FormLabel, Icon, Text } from "@chakra-ui/react";
import { useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import ConfirmationModal, { ConfirmationModalProps } from "../general/ConfirmationModal";
import Popover from "../general/Popover";
import { isSingleOption } from "../general/Select";
import ClassYearSelect from "./ClassYearSelect";

const ChangeClassYearModal_ChangeClassYear_Mutation = graphql(`
  mutation ChangeClassYearModal_ChangeClassYear($groupId: ID!, $newYearCode: ClassYearCode!, $transferEvaluations: Boolean!) {
    changeGroupYear(groupId: $groupId, newYearCode: $newYearCode, transferEvaluations: $transferEvaluations) {
      id
    }
  }
`);

const ChangeClassYearModal_Group_Fragment = graphql(`
  fragment ChangeClassYearModal_Group on Group {
    id
    currentClassYear {
      info {
        code
      }
    }
  }
`);

type ChangeClassYearModalProps = Omit<ConfirmationModalProps, "onAccept" | "children"> & {
  onChanged?: () => void;
  group: FragmentType<typeof ChangeClassYearModal_Group_Fragment>;
};

export default function ChangeClassYearModal({ group: groupFragment, onChanged, ...rest }: ChangeClassYearModalProps) {
  const group = getFragmentData(ChangeClassYearModal_Group_Fragment, groupFragment);
  const [moveEvaluations, setMoveEvaluations] = useState(false);
  const [yearCode, setYearCode] = useState<ClassYearCode | null>(() => group.currentClassYear.info.code);

  const changeYear = async () => {
    if (!yearCode) throw new Error("Unexpected null yearCode"); // Should never happen
    await graphqlClient.request(ChangeClassYearModal_ChangeClassYear_Mutation, {
      groupId: group.id,
      newYearCode: yearCode,
      transferEvaluations: moveEvaluations,
    });
    onChanged?.();
    rest.onClose?.();
  };

  return (
    <ConfirmationModal
      headerLabel="Vuosiluokan vaihto"
      headerProps={{
        mb: "2",
      }}
      onAccept={changeYear}
      variant="regular"
      acceptLabel="Vaihda"
      awaitBeforeClose
      {...rest}
    >
      <FormLabel>Uusi vuosiluokka</FormLabel>
      <ClassYearSelect
        initialClassYearCode={group.currentClassYear.info.code}
        chakraStyles={{
          container: () => ({
            mb: 3,
          }),
        }}
        onChange={(value) => setYearCode(isSingleOption(value) ? value.code : null)}
      />
      <Flex alignItems="center" position="relative">
        <Checkbox
          onChange={(event) => {
            setMoveEvaluations(event.target.checked);
          }}
          mr="1"
        >
          <Text as="span">Siirrä arvioinnit uuteen vuosiluokkaan</Text>
        </Checkbox>
        <Popover variant="responsive" openButton={<Icon color="green" as={AiOutlineInfoCircle} aria-label="Lisäinfoa siirtämisestä" w={5} h={5} />}>
          <Text>
            Mikäli ruksit tämän ruudun,kaikki arvioinnit siirtyvät nykyisestä vuosiluokasta uuteen vuosiluokkaan. Ilman ruksimista arvioinnit säilyvät
            nykyisessä vuosiluokassa ja uusi vuosiluokka aloitetaan tyhjästä.
          </Text>
        </Popover>
      </Flex>
    </ConfirmationModal>
  );
}
