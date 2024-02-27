import React, { useMemo } from "react";
import { set, PatchEvent, FormField } from "sanity";
import { Box, Inline, Text, Radio } from "@sanity/ui";
import Select, { SingleValue } from "react-select";
import { useQuery } from "urql";
import organizations from "../mpassid-organizations.json";
import { ComponentProps } from "../types/component";
import { graphql } from "../graphql";

interface Option {
  label: string;
  value: any;
}

type AgreementInfo = {
  type: "city" | "school";
  city_oid: string;
  name: string;
  oid: string;
};

const organizationOptions = organizations.map((org) => ({
  label: org.name,
  value: org.id,
}));

const GetOrganizationsQuery = graphql(`
  query GetOrganizations($parentOrganizationId: String!) {
    getMPassIDOrganizations(parentOid: $parentOrganizationId) {
      id
      name
    }
  }
`);

export default function AgreementInfoSelect(props: ComponentProps<AgreementInfo>) {
  const { value = {}, onChange } = props;

  const { type, city_oid, oid } = value;

  const [{ data, error, fetching }] = useQuery({
    query: GetOrganizationsQuery,
    pause: !city_oid,
    variables: { parentOrganizationId: city_oid! },
  });

  const organizationChildrenOptions = useMemo(() => {
    if (data) {
      return data.getMPassIDOrganizations.map((org) => ({ label: org.name, value: org.id }));
    }
    return [];
  }, [data]);

  const changeType = (newType: "city" | "school") => {
    const newValue = { ...value, type: newType };
    if (type && newType === "city") {
      // onChange(PatchEvent.from(set({ ...value, oid: undefined, name: undefined })));
      const selectedCity = organizationOptions.find((it) => it.value === city_oid);
      if (selectedCity) {
        newValue.oid = selectedCity.value;
        newValue.name = selectedCity.label;
      }
    }
    onChange(PatchEvent.from(set(newValue)));
  };

  const changeCity = (newCity: SingleValue<Option>) => {
    const newValue = {
      ...value,
      city_oid: newCity?.value,
    };
    if (type === "city") {
      newValue.oid = newCity?.value;
      newValue.name = newCity?.label;
    } else {
      newValue.oid = undefined;
      newValue.name = undefined;
    }
    onChange(PatchEvent.from(set(newValue)));
  };

  const selectedSchool = useMemo(
    () => (oid ? organizationChildrenOptions.find((it) => it.value === oid) || null : null),
    [oid, organizationChildrenOptions]
  );

  const changeSchool = (newSchool: SingleValue<Option>) => {
    onChange(PatchEvent.from(set({ ...value, oid: newSchool?.value, name: newSchool?.label })));
  };

  return (
    <Box>
      <FormField title="Tyyppi">
        <Inline space={2} style={{ marginBottom: "10px" }}>
          <Radio checked={type === "city"} name="city" onChange={() => changeType("city")} value="city" />
          <Text size={1} weight="medium">
            Kunta
          </Text>
        </Inline>
        <Inline space={2} style={{ marginBottom: "10px" }}>
          <Radio checked={type === "school"} name="school" onChange={() => changeType("school")} value="school" />
          <Text size={1} weight="medium">
            Koulu
          </Text>
        </Inline>
      </FormField>

      <FormField title="Kaupunki" hidden={!type}>
        <Select
          options={organizationOptions}
          onChange={changeCity}
          defaultValue={city_oid ? organizationOptions.find((it) => it.value === city_oid) : null}
        />
      </FormField>
      <FormField title="Koulu" hidden={type === "city" || !city_oid}>
        <Select
          isLoading={fetching}
          isDisabled={!data || fetching}
          options={organizationChildrenOptions}
          isClearable
          placeholder="Valitse koulu"
          onChange={changeSchool}
          value={selectedSchool}
        />
        {error && <p style={{ color: "red" }}>{error.message}</p>}
      </FormField>
    </Box>
  );
}
