import PageWrapper from "@/app/(components)/PageWrapper";
import CreateClassForm from "./CreateClassForm";

export default async function CreateClassPage() {
  return (
    <PageWrapper display="flex" justifyContent="column">
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
