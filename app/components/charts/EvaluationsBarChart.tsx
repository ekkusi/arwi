import { useMemo, useState } from "react";
import { t } from "i18next";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { FragmentOf, readFragment, graphql, ResultOf } from "@/graphql";

import { hexToRgbA } from "../../helpers/color";
import CView, { CViewProps } from "../primitives/CView";
import StyledBarChart, { StyledBarChartDataType } from "./StyledBarChart";
import CText from "../primitives/CText";
import CModal from "../CModal";
import CButton from "../primitives/CButton";
import i18n from "../../i18n";
import { COLORS } from "../../theme";
import { getEnvironmentTranslation } from "../../helpers/translation";

export const EvaluationsBarChart_Evaluation_Fragment = graphql(`
  fragment EvaluationsBarChart_Evaluation on ClassParticipationEvaluation {
    id
    skillsRating
    behaviourRating
    wasPresent
    collection {
      environment {
        label {
          fi
        }
        code
        color
      }
    }
  }
`);

type FilterValue = "all" | "skills" | "behaviour";

type Filter = {
  text: string;
  value: FilterValue;
};

type TempDataValue = {
  value: number;
  count: number;
};

type TempDataType = {
  label: string;
  color: string;
  skills: TempDataValue;
  behaviour: TempDataValue;
};

type EvaluationsBarChartDataType = StyledBarChartDataType & {
  type: "skills" | "behaviour";
};

const mapData = (evaluations: ResultOf<typeof EvaluationsBarChart_Evaluation_Fragment>[]) => {
  const data: EvaluationsBarChartDataType[] = [];
  const tempData: { [key: string]: TempDataType } = {};
  evaluations.forEach((evaluation) => {
    const envCode = evaluation.collection.environment.code;
    if (!tempData[envCode]) {
      tempData[envCode] = {
        color: evaluation.collection.environment.color,
        label: evaluation.collection.environment.label.fi,
        skills: {
          value: 0,
          count: 0,
        },
        behaviour: {
          value: 0,
          count: 0,
        },
      };
    }
    const matchingEnvironment = tempData[envCode];

    if (evaluation.skillsRating) {
      matchingEnvironment.skills.value += evaluation.skillsRating;
      matchingEnvironment.skills.count += 1;
    }
    if (evaluation.behaviourRating) {
      matchingEnvironment.behaviour.value += evaluation.behaviourRating;
      matchingEnvironment.behaviour.count += 1;
    }
  });
  Object.keys(tempData).forEach((key) => {
    data.push({
      x: `${tempData[key].label}1`,
      color: tempData[key].color,
      y: tempData[key].skills.count > 0 ? Math.round((tempData[key].skills.value / tempData[key].skills.count) * 100) / 100 : 0,
      type: "skills",
    });
    data.push({
      x: `${tempData[key].label}2`,
      color: hexToRgbA(tempData[key].color, 0.8),
      y: tempData[key].behaviour.count > 0 ? Math.round((tempData[key].behaviour.value / tempData[key].behaviour.count) * 100) / 100 : 0,
      type: "behaviour",
    });
  });

  return data;
};

type EvaluationsBarChartProps = CViewProps & {
  evaluations: readonly FragmentOf<typeof EvaluationsBarChart_Evaluation_Fragment>[];
  subjectCode: string;
};

const getFilteredData = (data: EvaluationsBarChartDataType[], filter: string) => {
  switch (filter) {
    case "skills":
      return data.filter((obj) => obj.type === "skills");
    case "behaviour":
      return data.filter((obj) => obj.type === "behaviour");
    default:
      return data;
  }
};

export default function EvaluationsBarChart({ evaluations: evaluationFragments, subjectCode, ...rest }: EvaluationsBarChartProps) {
  const evaluations = readFragment(EvaluationsBarChart_Evaluation_Fragment, evaluationFragments);
  const filteredEvaluations = useMemo(() => evaluations.filter((it) => it.wasPresent), [evaluations]);
  const [filter, setFilter] = useState<FilterValue>("all");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const FILTERS: Filter[] = [
    { text: i18n.t("all", "Kaikki"), value: "all" },
    { text: i18n.t("skills", "Taidot"), value: "skills" },
    { text: i18n.t("behaviour", "Työskentely"), value: "behaviour" },
  ];

  const data = useMemo(() => mapData(filteredEvaluations), [filteredEvaluations]);
  const filteredData = getFilteredData(data, filter);
  const filteredDataWithoutZeroEntries = filteredData.filter((obj) => obj.y !== 0);

  return (
    <CView style={{ width: "100%" }}>
      <CModal closeButton={false} onClose={() => setIsFiltersOpen(false)} placement="bottom" isOpen={isFiltersOpen}>
        <CText style={{ fontSize: "md", fontWeight: "300", marginBottom: "lg", marginTop: "md" }}>
          {t("skills-and-behaviour", "Taidot ja työskentely")}
        </CText>
        <CView
          style={{
            flexDirection: "row",
            gap: 1,
            width: "100%",
            padding: "md",
          }}
        >
          {FILTERS.map((item) => (
            <CButton
              key={item.value}
              title={item.text}
              variant="outline"
              colorScheme={filter === item.value ? "darkgray" : "lightgray"}
              style={{ margin: 3, paddingHorizontal: "xl", gap: "sm" }}
              onPress={() => {
                setIsFiltersOpen(false);
                setFilter(item.value);
              }}
              textStyle={{
                fontSize: "xs",
                fontWeight: "400",
                color: filter === item.value ? "darkgray" : "gray",
              }}
            />
          ))}
        </CView>
      </CModal>
      <CView style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <CText style={{ flex: 1, fontSize: "md", fontWeight: "300" }}>
          {t("evaluation-means-by-environments", "Arvointien keskiarvot {{by_environments_string}}", {
            by_environments_string: getEnvironmentTranslation(t, "by-environments", subjectCode).toLocaleLowerCase(),
          })}
        </CText>
        <CButton
          size="small"
          variant="outline"
          title={t(filter, "")}
          colorScheme="darkgray"
          style={{ width: "auto" }}
          leftIcon={<MaterialCommunityIcon name="filter-variant" size={25} color={COLORS.darkgray} />}
          onPress={() => setIsFiltersOpen(true)}
        />
      </CView>
      <StyledBarChart data={filteredDataWithoutZeroEntries} style={{ height: 200 }} gradeAxis {...rest} />

      <CView style={{ gap: 2, flexDirection: "row", justifyContent: "flex-start", flexWrap: "wrap", width: "100%" }}>
        {filter === "all" && (
          <CView style={{ width: "100%", flexDirection: "row" }}>
            <CText style={{ flex: 1, fontSize: "xs", fontWeight: "500" }}>{t("skills", "Taidot")}</CText>
            <CText style={{ flex: 1, fontSize: "xs", fontWeight: "500" }}>{t("behaviour", "Työskentely")}</CText>
          </CView>
        )}
        {filteredData.map((obj, idx) => (
          <CView key={idx} style={{ justifyContent: "space-between", flexDirection: "row", width: "40%", marginRight: 30 }}>
            <CView style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center", gap: 3 }}>
              <CView style={{ width: 10, height: 10, backgroundColor: obj.color }} />
              <CText style={{ fontSize: "xs" }}>{obj.x.slice(0, -1)}</CText>
            </CView>
            <CText style={{ fontSize: "sm", fontWeight: "600" }}>{obj.y === 0 ? "-" : obj.y}</CText>
          </CView>
        ))}
      </CView>
    </CView>
  );
}
