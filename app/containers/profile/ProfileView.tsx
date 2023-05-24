import { useMutation } from "@apollo/client";
import CButton from "../../components/primitives/CButton";
import { graphql } from "../../gql";
import { useAuth } from "../../hooks-and-providers/AuthProvider";
import CView from "../../components/primitives/CView";

const ProfileView_Logout_Mutation = graphql(`
  mutation ProfileView_Logout {
    logout
  }
`);

export default function ProfileView() {
  const { logout } = useAuth();
  const [logoutMutation, { loading, client }] = useMutation(ProfileView_Logout_Mutation);

  const handleLogout = async () => {
    await logoutMutation();
    await client.clearStore();
    logout();
  };

  return (
    <CView style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}>
      <CButton
        title="Kirjaudu ulos"
        colorScheme="secondary"
        variant="outline"
        style={{ width: "100%", marginBottom: 20 }}
        disabled={loading}
        onPress={handleLogout}
      />
    </CView>
  );
}
