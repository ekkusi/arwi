import { MinimalEnvironment } from "arwi-backend/src/types";
import LineChartBase, { DataType, LineChartBaseProps } from "./LineChartBase";

export type EvaluationDataType = DataType & {
  environment: MinimalEnvironment;
};

const movingAverage = (data: EvaluationDataType[], bandWidth: number) => {
  const movingAverageData: EvaluationDataType[] = [];
  for (let i = 0; i < data.length; i += 1) {
    let currSumSkills = 0;
    let notNullSkillsCount = 0;
    let currSumBehaviour = 0;
    let notNullBehaviourCount = 0;
    const bandWidthLeft = i - bandWidth < 0 ? 0 : i - bandWidth;
    const bandWidthRight = i + bandWidth < data.length ? i + bandWidth : data.length - 1;
    for (let j = bandWidthLeft; j <= bandWidthRight; j += 1) {
      const currDataPoint = data[j];
      if (currDataPoint.skills) {
        currSumSkills += currDataPoint.skills;
        notNullSkillsCount += 1;
      }
      if (currDataPoint.behaviour) {
        currSumBehaviour += currDataPoint.behaviour;
        notNullBehaviourCount += 1;
      }
    }
    movingAverageData.push({
      date: data[i].date,
      environment: data[i].environment,
      skills: notNullSkillsCount && currSumSkills / notNullSkillsCount,
      behaviour: notNullBehaviourCount && currSumBehaviour / notNullBehaviourCount,
    });
  }
  return movingAverageData;
};

type MovingAverageLineChartProps = Omit<LineChartBaseProps, "data"> & {
  data: EvaluationDataType[];
};

export default function MovingAverageLineChart({ data, ...rest }: MovingAverageLineChartProps) {
  const movingAverageData = movingAverage(data, 2);

  return <LineChartBase data={movingAverageData} {...rest} />;
}
