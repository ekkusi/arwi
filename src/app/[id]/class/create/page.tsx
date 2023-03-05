import PageWrapper from "@/app/(server-components)/PageWrapper";
import CreateClassForm from "./CreateClassForm";

export default async function CreateClassPage() {
  return (
    <PageWrapper display="flex" flexDirection="column" hasNavigation={false}>
      <CreateClassForm flex="1" />
    </PageWrapper>
  );
}
