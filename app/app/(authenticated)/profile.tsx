import { useMutation } from "@apollo/client";
import { useTranslation } from "react-i18next";
import { Stack } from "expo-router";
import CButton from "../../components/primitives/CButton";
import { graphql } from "../../gql";
import { useAuth } from "../../hooks-and-providers/AuthProvider";
import CView from "../../components/primitives/CView";
import CText from "../../components/primitives/CText";
import { languages } from "../../i18n";
import { defaultHeaderStyles } from "./_layout";

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

  return (
    <>
      <Stack.Screen
        options={{
          title: t("profile.title", "Profiili"),
          headerShown: true,
          ...defaultHeaderStyles,
        }}
      />
      <CView style={{ flex: 1, alignItems: "center", padding: "lg" }}>
        <CText style={{ fontSize: "lg", marginBottom: "lg", fontWeight: "500" }}>{t("profile-view.language", "Kieli")}</CText>
        <CView style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {languages.map((language) => (
            <CButton
              variant={i18n.language === language.value ? "filled" : "outline"}
              title={language.name}
              key={language.value}
              style={{ marginHorizontal: "md", marginBottom: "sm" }}
              onPress={() => i18n.changeLanguage(language.value)}
            />
          ))}
        </CView>
        <CView style={{ flex: 1, width: "100%", justifyContent: "flex-end" }}>
          <CButton title={t("profile-view.logout", "Kirjaudu ulos")} style={{ width: "100%" }} disabled={loading} onPress={handleLogout} />
        </CView>
      </CView>
    </>
  );
}
