import PageWrapper from "@/app/(server-components)/PageWrapper";
import CreateGroupForm from "./CreateGroupForm";

export default async function CreateGroupPage() {
  return (
    <PageWrapper display="flex" flexDirection="column">
      <CreateGroupForm flex="1" />
    </PageWrapper>
  );
}
