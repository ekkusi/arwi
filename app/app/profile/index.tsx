import { useMutation } from "@apollo/client";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTranslation } from "react-i18next";
import * as SecureStore from "expo-secure-store";
import { useMatomo } from "matomo-tracker-react-native";
import { useState } from "react";
import CButton from "../../components/primitives/CButton";
import { graphql } from "../../gql";
import { useAuth, useAuthenticatedUser } from "../../hooks-and-providers/AuthProvider";
import CView from "../../components/primitives/CView";
import CText from "../../components/primitives/CText";
import { languages, STORAGE_LANG_KEY } from "../../i18n";
import CImage from "../../components/primitives/CImage";
import { SingleSelect } from "../../components/form/Select";
import { useMPassIDAuth } from "../../hooks-and-providers/mPassID";
import { useToast } from "../../hooks-and-providers/ToastProvider";
import CModal from "../../components/CModal";
import TextFormField from "../../components/form/TextFormField";
import CTouchableOpacity from "../../components/primitives/CTouchableOpacity";
import { COLORS } from "../../theme";
import { getErrorMessage } from "../../helpers/errorUtils";

const ProfileView_Logout_Mutation = graphql(`
  mutation ProfileView_Logout {
    logout
  }
`);

const ProfileView_ConnectMPassID_Mutation = graphql(`
  mutation ProfileView_ConnectMPassID($code: String!) {
    connectMPassID(code: $code) {
      userData {
        id
        email
        consentsAnalytics
        languagePreference
        isMPassIDConnected
      }
    }
  }
`);

const ProfileView_ConnectLocalCredentials_Mutation = graphql(`
  mutation ProfileView_ConnectLocalCredentials($email: String!, $password: String!) {
    connectLocalCredentials(email: $email, password: $password) {
      userData {
        id
        email
        consentsAnalytics
        languagePreference
        isMPassIDConnected
        groups {
          id
        }
      }
    }
  }
`);

const REDIRECT_URI = "arwi-app://profile";

export default function ProfileView() {
  const { logout, setUser } = useAuth();
  const user = useAuthenticatedUser();
  const { trackAction } = useMatomo();
  const { openToast } = useToast();
  const { grantCode } = useMPassIDAuth(REDIRECT_URI);

  const [isLocalLoginModalOpen, setIsLocalLoginModalOpen] = useState(false);
  const [localLoginError, setLocalLoginError] = useState<string | undefined>();
  const [mPassIDLoginError, setMPassIDLoginError] = useState<string | undefined>();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const [logoutMutation, { loading, client }] = useMutation(ProfileView_Logout_Mutation);
  const [connectMPassID, { loading: connectMPassIDLoading }] = useMutation(ProfileView_ConnectMPassID_Mutation);
  const [connectLocalCredentials, { loading: connectLocalLoading }] = useMutation(ProfileView_ConnectLocalCredentials_Mutation);

  const { t, i18n } = useTranslation();

  const handleLogout = async () => {
    await logoutMutation();
    await client.clearStore();
    trackAction({
      name: "Logout",
      userInfo: {
        uid: user.id,
      },
    });
    logout();
  };

  const handlePasswordChange = (text: string) => {
    if (localLoginError) setLocalLoginError(undefined);
    setPassword(text);
  };

  const handleEmailChange = (text: string) => {
    if (localLoginError) setLocalLoginError(undefined);
    setEmail(text);
  };

  const changeLanguage = async (language: string) => {
    i18n.changeLanguage(language);
    await SecureStore.setItemAsync(STORAGE_LANG_KEY, language);
  };

  const handleSyncMPassID = async () => {
    setMPassIDLoginError(undefined);
    try {
      const code = await grantCode();
      if (code) {
        const { data } = await connectMPassID({ variables: { code } });
        if (!data?.connectMPassID) throw new Error("Unexpected error, no user data");
        setUser(data.connectMPassID.userData);
        openToast(t("mpassid-connect-succesful", "MPassID yhdistetty onnistuneesti. Voit jatkossa kirjautua sisään MPassID:llä."));
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      setMPassIDLoginError(t("mpassid-connect-failed", "MPassID:n yhdistäminen epäonnistui: ") + errorMessage);
    }
  };

  const handleSyncLocalCredentials = async () => {
    try {
      const { data } = await connectLocalCredentials({ variables: { email, password } });
      if (!data?.connectLocalCredentials) throw new Error("Local credentials connection failed");
      setUser(data.connectLocalCredentials.userData);
      setIsLocalLoginModalOpen(false);
      openToast(
        t("local-credentials-connect-succesful", "Tunnukset yhdistetty onnistuneesti. Voit jatkossa kirjautua sisään sähköpostilla ja salasanalla.")
      );
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      setLocalLoginError(t("local-credentials-connect-failed", "Tunnusten yhdistäminen epäonnistui: ") + errorMessage);
    }
  };

  return (
    <>
      <CModal
        isOpen={isLocalLoginModalOpen}
        onClose={() => setIsLocalLoginModalOpen(false)}
        title={t("connect-local-credentials", "Liitä tunnukset MPassID:seen")}
      >
        <CView style={{ justifyContent: "center", width: "100%", gap: "lg", marginBottom: "2xl" }}>
          <CText style={{ marginBottom: "md" }}>{t("login-to-connect", "Kirjaudu sisään liittääksesi tunnuksesi MPassID:seen")}</CText>
          <TextFormField
            title={t("email", "Sähköposti")}
            placeholder="arwioija@gmail.com"
            style={{ width: "100%" }}
            titleStyle={{ fontSize: "md", marginBottom: "-sm", fontWeight: "500" }}
            onChange={handleEmailChange}
          />
          <CView>
            <TextFormField
              title={t("password", "Salasana")}
              placeholder={t("password", "Salasana")}
              style={{ width: "100%" }}
              secureTextEntry={secureTextEntry}
              titleStyle={{ fontSize: "md", marginBottom: "-sm", fontWeight: "500" }}
              onChange={handlePasswordChange}
            />
            <CTouchableOpacity
              onPress={() => setSecureTextEntry(!secureTextEntry)}
              style={{ position: "absolute", right: 0, bottom: 0, justifyContent: "center", alignItems: "center", height: 54, width: 54 }}
            >
              <MaterialCommunityIcon name={secureTextEntry ? "eye" : "eye-off"} size={25} color={COLORS.darkgray} />
            </CTouchableOpacity>
          </CView>
          {localLoginError && <CText style={{ color: "error", fontWeight: "600", fontSize: "md" }}>{localLoginError}</CText>}
          <CButton
            title={t("login", "Kirjaudu sisään")}
            style={{ marginTop: "lg" }}
            loading={connectLocalLoading}
            onPress={handleSyncLocalCredentials}
          />
        </CView>
      </CModal>

      <CView style={{ flex: 1, alignItems: "center", padding: "lg" }}>
        <CText style={{ fontSize: "lg", fontWeight: "500", width: "100%" }}>{t("profile-view.language", "Kieli")}</CText>
        <SingleSelect
          defaultValue={languages.find((lang) => lang.value === i18n.language)}
          options={languages}
          formatLabel={(item) => item.name}
          onSelect={(item) => changeLanguage(item.value)}
          getOptionValue={(item) => item.value}
        />

        {!user.isMPassIDConnected && (
          <>
            <CButton
              style={{ marginTop: "3xl" }}
              leftIcon={<CImage variant="fixed" source={require("../../assets/mpassid-minimal-white.png")} width={25} height={25} />}
              title={t("connect-mpassid", "Liitä MPassID-tili")}
              loading={connectMPassIDLoading}
              onPress={handleSyncMPassID}
            />
            {mPassIDLoginError && <CText style={{ color: "error", fontWeight: "600", marginTop: "md", maxWidth: "100%" }}>{mPassIDLoginError}</CText>}
          </>
        )}
        {!user.email && (
          <CButton
            style={{ marginTop: "3xl" }}
            title={t("connect-local-credentials", "Liitä tunnukset MPassID:seen")}
            onPress={() => setIsLocalLoginModalOpen(true)}
          />
        )}
        <CView style={{ flex: 1, width: "100%", justifyContent: "flex-end" }}>
          <CButton title={t("logout", "Kirjaudu ulos")} style={{ width: "100%" }} disabled={loading} onPress={handleLogout} />
        </CView>
      </CView>
    </>
  );
}
