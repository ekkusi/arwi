import PageWrapper from "@/components/server/PageWrapper";
import { Text } from "@/components/chakra";
import { LocalizedPage } from "@/types/page";
import { getTranslation } from "@/i18n";
import CenteredContainer from "@/components/server/primitives/CenteredContainer";

export default async function Home({ params }: LocalizedPage) {
  const { lng } = params;
  const { t } = await getTranslation(lng);
  return (
    <PageWrapper>
      <CenteredContainer pb="32">
        <Text fontFamily="brand" fontSize="8xl" color="green" marginTop="auto">
          arwi
        </Text>
      </CenteredContainer>
    </PageWrapper>
  );
}
