import { ApolloError } from "@apollo/client";
import { useTranslation } from "react-i18next";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import * as Sentry from "@sentry/react-native";
import { useToast } from "./ToastProvider";
import { HomeStackParams } from "@/app/home/types";
import { useThrowCatchableError } from "./error";

export const useHandleOpenAIError = () => {
  const { openToast } = useToast();
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp<HomeStackParams>>();
  const throwCatchableError = useThrowCatchableError();

  const handleError = (error: Error, unexpectedErrorMsg?: string) => {
    if (error instanceof ApolloError) {
      const graphqlError = error.graphQLErrors[0];
      const code = graphqlError?.extensions?.code;
      if (code === "USAGE_LIMIT_EXCEEDED" || code === "OPENAI_ERROR" || code === "VALIDATION_ERROR") {
        let msg;
        switch (code) {
          case "USAGE_LIMIT_EXCEEDED":
            msg = t(
              "openai-failed-usage-limit-exceeded",
              "Olet ylittänyt kuukausittaisen rajasi tekoälytoimintojen käytössä. Voit tarkastella käyttöä profiilissa."
            );
            break;
          case "OPENAI_ERROR":
            msg =
              unexpectedErrorMsg || t("openai-failed-message", "Jokin meni vikaan odottamattomasti tekoälytoiminnossa. Yritä myöhemmin uudelleen.");
            break;
          default:
            msg = error.message;
            break;
        }
        openToast(
          msg,
          {
            type: "error",
          },
          code === "USAGE_LIMIT_EXCEEDED"
            ? {
              action: () => navigation.navigate("profile"),
              label: t("inspect", "Tarkastele"),
            }
            : undefined
        );

        if (code === "OPENAI_ERROR") Sentry.captureException(error);
      }
    } else throwCatchableError(error);
  };

  return handleError;
};
