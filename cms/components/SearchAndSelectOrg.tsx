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
  city_mpassid: string;
  name: string;
  mpassid: string;
};

const MOCK_OPTIONS = [
  { title: "Option 1", value: "option1" },
  { title: "Option 2", value: "option2" },
  { title: "Option 3", value: "option3" },
];

const organizationOptions = organizations.map((org) => ({
  label: org.name,
  value: org.id,
}));

export default function AgreementInfoSelect(props: ComponentProps<AgreementInfo>) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { value = {}, onChange } = props;

  const { type, city_mpassid } = value;

  const loadSchoolOptions = async () => {
    if (!city_mpassid) throw new Error("City mpassid is missing");
    // Fetch organizations with proper CORS options
    const response = await fetch(`https://virkailija.opintopolku.fi/organisaatio-service/api/${city_mpassid}/children?includeImage=false`, {
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
    console.log("City options", cityOptions);
  };

  const changeType = (newType: "city" | "school") => {
    onChange(PatchEvent.from(set({ ...value, type: newType })));
  };

  const changeCity = (newCity: SingleValue<Option>) => {
    const newValue = {
      ...value,
      city_mpassid: newCity?.value,
    };
    if (type === "city") {
      newValue.mpassid = newCity?.value;
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
          defaultValue={city_mpassid ? organizationOptions.find((it) => it.value === city_mpassid) : undefined}
        />
      </FormField>
      <FormField title="Koulu" hidden={type === "city" || !city_mpassid}>
        <button type="button" onClick={printCityOptions}>
          Hae koulut
        </button>
        {isLoading && <p>Loading...</p>}
      </FormField>
    </Box>
  );
}
