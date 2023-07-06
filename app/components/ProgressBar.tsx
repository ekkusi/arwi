import CText from "./primitives/CText";
import CView, { CViewProps } from "./primitives/CView";

type ProgressBarProps = CViewProps & {
  color: string;
  progress: number;
};

export default function ProgressBar({ color, progress, style, ...rest }: ProgressBarProps) {
  let widthPercent = progress * 100;
  if (widthPercent < 0) widthPercent = 0;
  else if (widthPercent > 100) widthPercent = 100;
  return (
    <CView style={{ height: 5, width: "100%", ...style }} {...rest}>
      <CView style={{ width: `${widthPercent.toString()}%`, height: "100%", left: 0, backgroundColor: color }} />
      <CText style={{ fontSize: "lg" }}>Ladataan...</CText>
    </CView>
  );
}
