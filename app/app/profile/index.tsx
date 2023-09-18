import { useMutation } from "@apollo/client";
import { useTranslation } from "react-i18next";
import * as SecureStore from "expo-secure-store";
import CButton from "../../components/primitives/CButton";
import { graphql } from "../../gql";
import { useAuth } from "../../hooks-and-providers/AuthProvider";
import CView from "../../components/primitives/CView";
import CText from "../../components/primitives/CText";
import { languages, STORAGE_LANG_KEY } from "../../i18n";

const ProfileView_Logout_Mutation = graphql(`
  mutation ProfileView_Logout {
    logout
  }
`);

export default function ProfileView() {
  const { logout } = useAuth();
  const [logoutMutation, { loading, client }] = useMutation(ProfileView_Logout_Mutation);

  const { t, i18n } = useTranslation();

  const handleLogout = async () => {
    await logoutMutation();
    await client.clearStore();
    logout();
  };

  const changeLanguage = async (language: string) => {
    i18n.changeLanguage(language);
    await SecureStore.setItemAsync(STORAGE_LANG_KEY, language);
  };

  return (
    <CView style={{ flex: 1, alignItems: "center", padding: "lg" }}>
      <CText style={{ fontSize: "lg", marginBottom: "lg", fontWeight: "500" }}>{t("profile-view.language", "Kieli")}</CText>
      <CView style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {languages.map((language) => (
          <CButton
            variant={i18n.language === language.value ? "filled" : "outline"}
            title={language.name}
            key={language.value}
            style={{ marginHorizontal: "md", marginBottom: "sm" }}
            onPress={() => changeLanguage(language.value)}
          />
        ))}
      </CView>
      <CView style={{ flex: 1, width: "100%", justifyContent: "flex-end" }}>
        <CButton title={t("profile-view.logout", "Kirjaudu ulos")} style={{ width: "100%" }} disabled={loading} onPress={handleLogout} />
      </CView>
    </CView>
  );
}
