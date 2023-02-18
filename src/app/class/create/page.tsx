import PageWrapper from "@/app/(components)/PageWrapper";
import LogoutButton from "@/app/auth/register/LogoutButton";
import CreateClassForm from "./CreateClassForm";

export default async function CreateClassPage() {
  return (
    <PageWrapper display="flex" flexDirection="column">
      <LogoutButton>Logout</LogoutButton>
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
