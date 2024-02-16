import React, { useState } from "react";
import { set, PatchEvent, FormField } from "sanity";
import { Box, Inline, Text, Radio } from "@sanity/ui";
import Select, { SingleValue } from "react-select";
import organizations from "../mpassid-organizations.json";
import { ComponentProps } from "../types/component";

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

export default function AgreementInfoSelect(props: ComponentProps<AgreementInfo>) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { value = {}, onChange } = props;

  const { type, city_oid } = value;

  const loadSchoolOptions = async () => {
    if (!city_oid) throw new Error("City oid is missing");
    // Fetch organizations with proper CORS options
    const response = await fetch(`https://virkailija.opintopolku.fi/organisaatio-service/api/${city_oid}/children?includeImage=false`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
    const data = await response.json();
    const transformedOptions = data.map((item: any) => ({
      title: item?.nimi?.fi,
      value: item.oid, // Adjust according to your data structure
    }));
    return transformedOptions;
  };

  const printCityOptions = async () => {
    setIsLoading(true);
    const cityOptions = await loadSchoolOptions();
    setIsLoading(false);
  };

  const changeType = (newType: "city" | "school") => {
    onChange(PatchEvent.from(set({ ...value, type: newType })));
  };

  const changeCity = (newCity: SingleValue<Option>) => {
    const newValue = {
      ...value,
      city_oid: newCity?.value,
    };
    if (type === "city") {
      newValue.oid = newCity?.value;
      newValue.name = newCity?.label;
    }
    onChange(PatchEvent.from(set(newValue)));
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
      </FormField>

      <FormField title="Kaupunki" hidden={!type}>
        <Select
          options={organizationOptions}
          onChange={changeCity}
          defaultValue={city_oid ? organizationOptions.find((it) => it.value === city_oid) : undefined}
        />
      </FormField>
      <FormField title="Koulu" hidden={type === "city" || !city_oid}>
        <button type="button" onClick={printCityOptions}>
          Hae koulut
        </button>
        {isLoading && <p>Loading...</p>}
      </FormField>
    </Box>
  );
}
