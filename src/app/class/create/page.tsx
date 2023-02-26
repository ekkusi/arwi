import PageWrapper from "@/app/(server-components)/PageWrapper";
import CreateClassForm from "./CreateClassForm";

export default async function CreateClassPage() {
  return (
    <PageWrapper display="flex" flexDirection="column">
      <CreateClassForm
        p="4"
        flex="1"
        height="100%"
        borderRadius="lg"
        border="2px"
        boxShadow="md"
      />
    </PageWrapper>
  );
}
