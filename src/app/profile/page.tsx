import LogoutButton from "@/app/(auth)/LogoutButton";
import PageWrapper from "@/app/(server-components)/PageWrapper";
import { Flex, Text } from "@/components/chakra";
import { getSessionOrRedirect } from "@/utils/session/server";

export default async function ProfilePage() {
  const session = await getSessionOrRedirect();
  return (
    <PageWrapper display="flex" flexDirection="column">
      <Text as="h1">Profiili</Text>
      <Text>Sähköposti: {session.user.email}</Text>
      <Flex flex="1" flexDirection="column" justifyContent="flex-end">
        <LogoutButton mt="auto">Kirjaudu ulos</LogoutButton>
      </Flex>
    </PageWrapper>
  );
}
