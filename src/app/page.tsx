import { NextLink, Text } from "@/components/chakra";
import { getSessionOrRedirect } from "@/utils/session/server";
import PageWrapper from "./(server-components)/PageWrapper";

export default async function Home() {
  const { user } = await getSessionOrRedirect();

  return (
    <PageWrapper display="flex" flexDirection="column" hasNavigation={false}>
      <Text as="h1">ARWI</Text>
      <Text>Tervetuloa käyttelemään</Text>
      <NextLink href={`/${user.id}`}>{"Omalle sivulle \u2B95"}</NextLink>
    </PageWrapper>
  );
}
