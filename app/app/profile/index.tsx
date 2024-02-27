import { useMutation, useQuery } from "@apollo/client";
import { useTranslation } from "react-i18next";
import * as SecureStore from "expo-secure-store";
import { useMatomo } from "matomo-tracker-react-native";
import { useState } from "react";
import { Platform } from "react-native";
import CButton from "../../components/primitives/CButton";
import { graphql } from "@/graphql";
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
import { getErrorMessage } from "../../helpers/errorUtils";
import { MATOMO_EVENT_CATEGORIES } from "../../config";
import { useMetadata } from "../../hooks-and-providers/MetadataProvider";
import { formatDate, getFirstDayOfNextMonth } from "../../helpers/dateHelpers";
import LoadingIndicator from "../../components/LoadingIndicator";
import InfoButton from "../../components/InfoButton";
import { useModal } from "../../hooks-and-providers/ModalProvider";

const ProfileView_GetCurrentUserUsageData_Query = graphql(`
  query ProfileView_GetCurrentUserUsageData {
    getCurrentUserUsageData {
      id
      monthlyTokensUsed
    }
  }
`);

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
  const { trackEvent } = useMatomo();
  const { openToast } = useToast();
  const { openModal } = useModal();
  const { grantCode } = useMPassIDAuth(REDIRECT_URI);
  const { monthlyTokenUseLimit, feedbackGenerationTokenCost, textFixTokenCost } = useMetadata();

  const [isLocalLoginModalOpen, setIsLocalLoginModalOpen] = useState(false);
  const [localLoginError, setLocalLoginError] = useState<string | undefined>();
  const [mPassIDLoginError, setMPassIDLoginError] = useState<string | undefined>();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { data: usageData } = useQuery(ProfileView_GetCurrentUserUsageData_Query);

  const [logoutMutation, { loading, client }] = useMutation(ProfileView_Logout_Mutation);
  const [connectMPassID, { loading: connectMPassIDLoading }] = useMutation(ProfileView_ConnectMPassID_Mutation);
  const [connectLocalCredentials, { loading: connectLocalLoading }] = useMutation(ProfileView_ConnectLocalCredentials_Mutation);

  const { t, i18n } = useTranslation();

  const firstDayOfNextMonth = formatDate(getFirstDayOfNextMonth());

  const handleLogout = async () => {
    await logoutMutation();
    await client.clearStore();
    trackEvent({
      category: MATOMO_EVENT_CATEGORIES.AUTH,
      action: "Logout",
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
        trackEvent({
          category: MATOMO_EVENT_CATEGORIES.ACCOUNT_MODIFICATION,
          action: "Sync MPassID to local credentials",
          userInfo: {
            uid: user.id,
          },
        });
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
      trackEvent({
        category: MATOMO_EVENT_CATEGORIES.ACCOUNT_MODIFICATION,
        action: "Sync local credentials to MPassID",
        userInfo: {
          uid: user.id,
        },
      });
      openToast(
        t("local-credentials-connect-succesful", "Tunnukset yhdistetty onnistuneesti. Voit jatkossa kirjautua sisään sähköpostilla ja salasanalla.")
      );
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      setLocalLoginError(t("local-credentials-connect-failed", "Tunnusten yhdistäminen epäonnistui: ") + errorMessage);
    }
  };

  return (
    <CView style={{ flex: 1, alignItems: "center", padding: "lg" }}>
      <CText style={{ fontSize: "lg", fontWeight: "500", width: "100%" }}>{t("language", "Kieli")}</CText>
      <SingleSelect
        defaultValue={languages.find((lang) => lang.value === i18n.language)}
        options={languages}
        formatLabel={(item) => item.name}
        onSelect={(item) => changeLanguage(item.value)}
        getOptionValue={(item) => item.value}
      />
      <CView style={{ width: "100%" }}>
        <CView style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: "3xl" }}>
          <CText style={{ fontSize: "lg", fontWeight: "500" }}>{t("monthly-ai-token-use", "Kuukauden AI-tokenien käyttö")}</CText>
          <InfoButton
            onPress={() =>
              openModal({
                title: t("monthly-ai-tokens-info.title", "Kuukausittaiset AI-tokenit"),
                children: (
                  <CView>
                    <CText style={{ marginBottom: "md" }}>
                      {t(
                        "monthly-ai-tokens-info.first-description",
                        "Jokainen Arwin käyttäjä saa käyttöönsä {{monthlyTokenUseLimit}} AI-tokenia kuukausittain. Nämä tokenit kuluvat sovelluksen tekoälyominaisuuksien käytössä. Tokeneita kuluu seuraavasti:",
                        { monthlyTokenUseLimit }
                      )}
                    </CText>
                    <CText>{`\u2022 ${t("monthly-ai-tokens-info.final-feedback-generation", "Loppuarvioinnin generointi")}: ${t(
                      "monthly-ai-tokens-info.tokens",
                      "{{count}} tokenia",
                      { count: feedbackGenerationTokenCost }
                    )}`}</CText>
                    <CText>{`\u2022 ${t("monthly-ai-tokens-info.oral-feedback-fix", "Sanallisen palautteen korjaus")}: ${t(
                      "monthly-ai-tokens-info.tokens",
                      "{{count}} tokenia",
                      { count: textFixTokenCost }
                    )}`}</CText>
                    <CText style={{ fontWeight: "500", marginVertical: "md" }}>{t("monthly-ai-tokens-info.why-limits", "Miksi rajoitukset?")}</CText>
                    <CText style={{ marginBottom: "md" }}>
                      {t(
                        "monthly-ai-tokens-info.why-description-first",
                        "Rajoituksen tarkoitus on estää sovelluksemme resurssien tahallinen ylikulutus. Normaalissa käytössä kuukausittaisen rajan ei kuitenkaan pitäisi ylittyä kuukaudessa."
                      )}
                    </CText>
                    <CText>
                      {t(
                        "monthly-ai-tokens-info.why-description-second",
                        "Mikäli tokenisi pääsevät siltikin loppumaan kesken kuukauden, voit pyytää lisää lähettämällä sähköpostia osoitteeseen info@arwi.fi. Kerro viestissä käyttäjätunnuksesi ja syy lisätokenien tarpeeseen."
                      )}
                    </CText>
                  </CView>
                ),
              })
            }
          />
        </CView>
        <CText style={{ fontSize: "sm" }}>
          {t("next-renew", "Seuraava nollaus")}: {firstDayOfNextMonth}
        </CText>
        {usageData ? (
          <CText style={{ textAlign: "center", marginTop: "lg" }}>
            {usageData.getCurrentUserUsageData.monthlyTokensUsed || 0} / {monthlyTokenUseLimit}
          </CText>
        ) : (
          <LoadingIndicator type="inline" />
        )}
      </CView>

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
            <TextFormField
              title={t("password", "Salasana")}
              placeholder={t("password", "Salasana")}
              style={{ width: "100%" }}
              titleStyle={{ fontSize: "md", marginBottom: "-sm", fontWeight: "500" }}
              onChange={handlePasswordChange}
              isSecret
            />
            {localLoginError && <CText style={{ color: "error", fontWeight: "600", fontSize: "md" }}>{localLoginError}</CText>}
            <CButton
              title={t("login", "Kirjaudu sisään")}
              style={{ marginTop: "lg" }}
              loading={connectLocalLoading}
              onPress={handleSyncLocalCredentials}
            />
          </CView>
        </CModal>
        {!user.isMPassIDConnected && (
          <>
            <CButton
              style={{ marginTop: "4xl" }}
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
      </>
      <CView style={{ flex: 1, width: "100%", justifyContent: "flex-end", marginBottom: Platform.OS === "ios" ? "xl" : "md" }}>
        <CButton title={t("logout", "Kirjaudu ulos")} style={{ width: "100%" }} disabled={loading} onPress={handleLogout} />
      </CView>
    </CView>
  );
}
