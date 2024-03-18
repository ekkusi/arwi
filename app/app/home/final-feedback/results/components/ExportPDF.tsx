import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "@apollo/client";
import { Keyboard } from "react-native";
import CView from "@/components/primitives/CView";
import CText from "@/components/primitives/CText";
import CTextInput from "@/components/primitives/CTextInput";
import { useAuthenticatedUser } from "@/hooks-and-providers/AuthProvider";
import CButton from "@/components/primitives/CButton";
import { graphql } from "@/graphql";
import { useToast } from "@/hooks-and-providers/ToastProvider";

const ExportPDF_SendFeedbackEmail_Mutation = graphql(`
  mutation ExportPDF_SendFeedbackEmail($email: EmailAddress!, $groupId: ID!) {
    sendFeedbackEmail(email: $email, groupId: $groupId)
  }
`);

type ExportPDFProps = {
  groupId: string;
  onCompleted?: () => void;
};

export default function ExportPDF({ groupId, onCompleted }: ExportPDFProps) {
  const user = useAuthenticatedUser();
  const { t } = useTranslation();
  const { openToast } = useToast();
  const [email, setEmail] = useState(user.email || "");
  const [sendFeedbackEmail, { loading }] = useMutation(ExportPDF_SendFeedbackEmail_Mutation, {
    variables: { email, groupId },
  });

  const handleExportPDF = async () => {
    Keyboard.dismiss();
    try {
      const result = await sendFeedbackEmail();
      if (result.data?.sendFeedbackEmail === "EMAIL_VERIFICATION_REQUIRED") {
        openToast(
          t(
            "email-verification-required",
            "Kyseinen sähköposti ei vielä ole vahvistettu tilillesi. Vahvista se sähköpostiisi lähetetyn viestin kautta ja yritä uudelleen."
          ),
          { type: "warning" }
        );
      } else {
        openToast(t("pdf-exported", "PDF:n luonti aloitettu onnistuneesti. Tarkista sähköpostisi hetken kuluttua."));
      }
      onCompleted?.();
    } catch (error) {
      openToast(t("something-went-wrong-in-pdf-export", "Jokin meni vikaan odottamattomasti PDF:n viemisessä. Yritä myöhemmin uudelleen."), {
        type: "error",
      });
    }
  };

  return (
    <CView>
      <CText>{t("insert-email-for-feedback-export", "Syötä alle sähköposti, johon haluat lähettää PDF-koosteen loppuarvioinneista.")}</CText>
      <CTextInput placeholder={t("email", "Sähköposti")} inputMode="email" value={email} onChangeText={(value) => setEmail(value)} />
      <CView style={{ justifyContent: "center", marginTop: "2xl" }}>
        <CButton title={t("export-pdf", "Vie PDF")} onPress={handleExportPDF} loading={loading} disabled={email.length === 0} />
      </CView>
    </CView>
  );
}
