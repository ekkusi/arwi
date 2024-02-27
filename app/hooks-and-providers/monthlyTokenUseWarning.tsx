import { WarningInfo } from "arwi-backend/src/types";
import { useMutation } from "@apollo/client";
import { useTranslation } from "react-i18next";
import { useToast } from "./ToastProvider";
import { graphql } from "@/graphql";

const MonthlyTokenUseWarning_SetTokenUseWarningSeen_Mutation = graphql(`
  mutation MonthlyTokenUseWarning_SetTokenUseWarningSeen($warning: TokenUseWarning!) {
    setTokenUseWarningSeen(warning: $warning)
  }
`);

export const useToggleTokenUseWarning = () => {
  const [setTokenUseWarningSeen] = useMutation(MonthlyTokenUseWarning_SetTokenUseWarningSeen_Mutation);
  const { openToast } = useToast();
  const { t } = useTranslation();

  const toggleTokenUseWarning = (warningInfo: WarningInfo) => {
    setTokenUseWarningSeen({ variables: { warning: warningInfo.warning } });
    const tokenUseWarningThresholdPercentage = warningInfo.threshhold * 100;
    openToast(
      t(
        "monthly-token-use-warning",
        "Olet käyttänyt {{tokenUseWarningThresholdPercentage}}% kuukauden sallituista AI-tokeneista. Voit tarkastella kulutusta tarkemmin profiilista.",
        {
          tokenUseWarningThresholdPercentage,
        }
      ),
      { type: "warning", closeTimeout: 10000 }
    );
  };

  return toggleTokenUseWarning;
};
