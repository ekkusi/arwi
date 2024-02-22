import fetch from "node-fetch";

const ORGANIZATION_API_URL = "https://virkailija.opintopolku.fi/organisaatio-service/api";

export const fetchParentOids = async (oid: string) => {
  const response = await fetch(`${ORGANIZATION_API_URL}/${oid}/parentoids`);
  const json = await response.json();
  return json;
};
