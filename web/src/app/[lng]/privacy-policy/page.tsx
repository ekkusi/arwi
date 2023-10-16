import PageWrapper from "@/components/general/PageWrapper";
import { LocalizedPage } from "@/types/page";
import PrivacyPolicyContentFi from "./FinnishContent";
import PrivacyPolicyContentEn from "./EnglishContent";
import PrivacyPolicyContentSe from "./SwedishContent";

export default async function PrivacyPolicyPage({ params }: LocalizedPage) {
  const { lng } = params;
  let PrivacyPolicyContent = PrivacyPolicyContentFi;
  if (lng === "en") {
    PrivacyPolicyContent = PrivacyPolicyContentEn;
  }
  if (lng === "se") {
    PrivacyPolicyContent = PrivacyPolicyContentSe;
  }

  return (
    <PageWrapper py="5" maxWidth={{ base: "100%", md: "750px", xl: "1000px" }} mx="auto">
      <PrivacyPolicyContent />
    </PageWrapper>
  );
}
