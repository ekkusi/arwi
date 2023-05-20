import { useMutation } from "@apollo/client";
import { View } from "react-native";
import CustomButton from "../../components/CustomButton";
import { graphql } from "../../gql";
import { useAuth } from "../../hooks-and-providers/AuthProvider";

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
    <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}>
      <CustomButton
        title="Kirjaudu ulos"
        generalStyle="secondary"
        outlineStyle
        buttonStyle={{ width: "100%", marginBottom: 20 }}
        disabled={loading}
        onPress={handleLogout}
      />
    </View>
  );
}
