import CView, { CViewProps } from "./primitives/CView";

export type LazyLoadViewProps = CViewProps & {
  currentIndex: number;
  index: number;
  key: string;
};

function indexIsActive(currentIndex: number, myIndex: number) {
  return currentIndex === myIndex || currentIndex - 1 === myIndex || currentIndex + 1 === myIndex;
}

export default function LazyLoadView({ key, currentIndex, index, children, ...rest }: LazyLoadViewProps) {
  const isActive = indexIsActive(currentIndex, index);
  if (!isActive) {
    return <CView key={key} />;
  }

  return (
    <CView key={key} {...rest}>
      {children}
    </CView>
  );
}
