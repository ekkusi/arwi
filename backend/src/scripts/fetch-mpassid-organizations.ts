import fetch from "node-fetch";
import fs from "fs";
import path from "path";

const orgIds: string[] = [];

type Organization = {
  id: string;
  name: string;
  yTunnus: string;
};

const orgApiUrl = "https://virkailija.opintopolku.fi/organisaatio-service/api";

async function fetchOrganization(id: string): Promise<Organization> {
  const result = await fetch(`${orgApiUrl}/${id}`);
  const json = await result.json();
  if (!json.nimi?.fi) throw new Error(`Organization name not found for id: ${id}`);
  if (!json.ytunnus) throw new Error(`Organization yTunnus not found for id: ${id}`);
  return {
    id,
    name: json.nimi.fi,
    yTunnus: json.ytunnus,
  };
}
// Init async function and execute it
(async () => {
  const organizations = await Promise.all(orgIds.map(fetchOrganization));
  console.log("Organizations fetched:", organizations.length);

  // Write the result to a json file file in ../mpassid-organizations.json
  fs.writeFile(path.join(__dirname, "../mpassid-organizations.json"), JSON.stringify(organizations, null, 2), () =>
    console.log("Organization fetch done!")
  );
})();
