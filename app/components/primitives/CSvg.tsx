// svg.types.ts
import Svg, { type SvgProps } from "react-native-svg";

export interface ISvgProps extends SvgProps {
  xmlns?: string;
  xmlnsXlink?: string;
  xmlSpace?: string;
}
// svgComp.tsx
export default function CSvg(props: ISvgProps) {
  return <Svg xmlns="http://www.w3.org/2000/svg" width={250} height={250} viewBox="0 0 250 250" xmlSpace="preserve" {...props} />;
}
