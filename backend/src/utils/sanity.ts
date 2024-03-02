import client from "@/sanityClient";

type Agreement = {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  info: {
    type: "city" | "school";
    name: string;
    city_oid: string;
    oid: string;
  };
};

export const getAgreements = async (): Promise<Agreement[]> => {
  const query = `*[_type == "mpassid_agreement"] | order(_createdAt desc)`;
  const agreements = await client.fetch(query);
  return agreements;
};

export const hasAgreement = async (oids: string[]): Promise<boolean> => {
  const query = `*[_type == "mpassid_agreement" && info.oid in $oids]`;
  const agreement = await client.fetch(query, { oids });
  return agreement.length > 0;
};
