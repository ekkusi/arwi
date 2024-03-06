import fetch from "node-fetch";

const ORGANIZATION_API_URL = "https://virkailija.opintopolku.fi/organisaatio-service/api";

export const fetchParentOids = async (oid: string) => {
  const response = await fetch(`${ORGANIZATION_API_URL}/${oid}/parentoids`);
  const json = await response.json();
  return json;
};

export type MPassIDOrganizationInfo = {
  id: string;
  name: string;
};

export const fetchOrganizationChildren = async (oid: string): Promise<MPassIDOrganizationInfo[]> => {
  const response = await fetch(`${ORGANIZATION_API_URL}/${oid}/children?includeImage=false`);
  const json = await response.json();
  if (!Array.isArray(json)) throw new Error("Invalid response from organization API, is not an array");

  return json
    .filter((item) => {
      if (item.piilotettu == null) throw new Error("Invalid response from organization API, organization missing piilotettu field");
      return !item.piilotettu;
    })
    .map((item) => {
      if (!item.oid || !item.nimi.fi) throw new Error("Invalid response from organization API, organization missing oid or nimi.fi field");
      return {
        id: item.oid,
        name: item.nimi.fi,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
};
