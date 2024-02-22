import PageWrapper from "@/components/general/PageWrapper";
import { LocalizedPage } from "@/types/page";
import Section from "@/components/general/Section";
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
    <PageWrapper py="5">
      <Section mt={{ base: "8", xl: "20" }}>
        <PrivacyPolicyContent />
      </Section>
    </PageWrapper>
  );
}
