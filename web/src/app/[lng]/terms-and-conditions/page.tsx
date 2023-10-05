import PageWrapper from "@/components/general/PageWrapper";
import { LocalizedPage } from "@/types/page";
import TermsAndConditionsContentFi from "./FinnishContent";
import TermsAndConditionsContentEn from "./EnglishContent";
import TermsAndConditionsContentSe from "./SwedishContent";

export default async function TermsAndConditionsPage({ params }: LocalizedPage) {
  const { lng } = params;
  let TermsAndConditionsContent = TermsAndConditionsContentFi;
  if (lng === "en") {
    TermsAndConditionsContent = TermsAndConditionsContentEn;
  }
  if (lng === "se") {
    TermsAndConditionsContent = TermsAndConditionsContentSe;
  }

  return (
    <PageWrapper py="5" maxWidth={{ base: "100%", md: "1000px" }} mx="auto">
      <TermsAndConditionsContent />
    </PageWrapper>
  );
}
