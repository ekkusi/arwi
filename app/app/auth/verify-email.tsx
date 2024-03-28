import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLazyQuery, useMutation } from "@apollo/client";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useMatomo } from "matomo-tracker-react-native";
import CView from "@/components/primitives/CView";
import LandingComponent from "./LandingComponent";
import { graphql } from "@/graphql";
import CText from "@/components/primitives/CText";
import { AuthStackParams } from "./types";
import { AuthProvider_UserInfo_Fragment, useAuth } from "@/hooks-and-providers/AuthProvider";
import CButton from "@/components/primitives/CButton";
import { useThrowCatchableError } from "@/hooks-and-providers/error";
import { MATOMO_ACTIONS, MATOMO_EVENT_CATEGORIES } from "@/config";
import { useToast } from "@/hooks-and-providers/ToastProvider";

const VerifyEmail_GetCurrentUser_Query = graphql(
  `
    query VerifyEmail_GetCurrentUser {
      getCurrentUser {
        id
        isVerified
        ...AuthProvider_UserInfo
      }
    }
  `,
  [AuthProvider_UserInfo_Fragment]
);

const VerifyEmail_SendRegisterVerificationEmail_Mutation = graphql(`
  mutation VerifyEmail_SendRegisterVerificationEmail {
    sendRegisterVerificationEmail
  }
`);

export default function VerifyEmail({ route }: NativeStackScreenProps<AuthStackParams, "verify-email">) {
  const { email } = route.params;

  const { trackEvent } = useMatomo();
  const { setUser } = useAuth();
  const { openToast } = useToast();
  const { t } = useTranslation();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [hasRepeatedEmailSend, setHasRepeatedEmailSend] = useState(false);
  const throwCatchableError = useThrowCatchableError();

  const [getUser, { loading: getUserLoading }] = useLazyQuery(VerifyEmail_GetCurrentUser_Query, { fetchPolicy: "no-cache" });
  const [_sendRegisterVerificationEmail] = useMutation(VerifyEmail_SendRegisterVerificationEmail_Mutation, {
    onError: () => {
      openToast(
        t(
          "something-went-wrong-with-verification-email",
          "Jokin meni vikaan vahvistusviestin lähetyksessä. Jos tämä toistuu, pyydämme ottamaan yhteyttä järjestelmänvalvontaan info@arwi.fi."
        ),
        "error"
      );
    },
  });

  const sendRegisterVerificationEmail = useCallback(
    (isManualRepeat = false) => {
      _sendRegisterVerificationEmail();
      if (isManualRepeat) setHasRepeatedEmailSend(true);
    },
    [_sendRegisterVerificationEmail]
  );

  const tryLogin = async () => {
    setErrorMsg(null);
    try {
      const { data } = await getUser();
      if (!data) throw new Error("Unexpected error");

      const { getCurrentUser: userData } = data;
      const userInfo = {
        uid: userData.id,
      };

      trackEvent({
        category: MATOMO_EVENT_CATEGORIES.AUTH,
        action: MATOMO_ACTIONS.AUTH.VERIFY_EMAIL,
        userInfo,
      });
      if (userData.isVerified) {
        setUser(userData);
      } else {
        setErrorMsg(
          t(
            "are-you-sure-of-verification",
            "Sähköpostisi ei edelleenkään ole vahvistettu. Oletko varma, että vahvistus tapahtui onnistuneesti? Jos ongelma jatkuu, ota yhteyttä asiakaspalveluumme info@arwi.fi."
          )
        );
      }
    } catch (error) {
      throwCatchableError(error);
    }
  };

  useEffect(() => {
    sendRegisterVerificationEmail();
  }, [sendRegisterVerificationEmail]);

  return (
    <LandingComponent title={t("verify-your-email", "Vahvista sähköpostisi")}>
      <CView style={{ flex: 1, width: "100%", gap: "md", paddingHorizontal: "md" }}>
        <CText>
          {t("verification-email-sent", "Vahvistamisähköposti on lähetetty osoitteeseen")}{" "}
          <CText style={{ fontStyle: "italic", fontWeight: "500" }}>{email}.</CText> {t("check-it-in-a-bit", "Tarkista se hetken kuluttua.")}
        </CText>
        <CText style={{ marginBottom: "lg" }}>
          {t(
            "verify-email-description",
            "Vahvista sähköpostisi klikkaamalla viestistä löytyvää linkkiä. Voit tämän jälkeen jatkaa sovellukseen alta."
          )}
        </CText>
        <CButton title={t("login", "Kirjaudu sisään")} onPress={tryLogin} loading={getUserLoading} />
        {errorMsg && <CText style={{ color: "yellow", fontWeight: "500" }}>{errorMsg}</CText>}
        {!hasRepeatedEmailSend ? (
          <CView style={{ flexDirection: "row", flexWrap: "wrap", marginTop: "md" }}>
            <CText>{t("is-verification-email-not-received", "Etkö saanut vahvistusviestiä?")}</CText>
            <CButton variant="empty" title={t("resend", "Lähetä uudelleen")} onPress={() => sendRegisterVerificationEmail(true)} />
          </CView>
        ) : (
          <CText style={{ marginTop: "md" }}>
            {t(
              "verification-email-resent-message",
              "Uusi vahvistusviesti lähetetty. Muista tarkistaa roskaposti. Jos viesti ei edelleenkään löydy, ota yhteyttä asiakaspalveluumme info@arwi.fi."
            )}
          </CText>
        )}
      </CView>
    </LandingComponent>
  );
}
