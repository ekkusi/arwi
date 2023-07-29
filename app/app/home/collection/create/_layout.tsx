import { useContext } from "react";
import LoadingIndicator from "../../../../components/LoadingIndicator";
import CView, { CViewProps } from "../../../../components/primitives/CView";
import { CollectionCreationContext } from "./CollectionCreationProvider";

type CollectionCreationLayoutProps = CViewProps;

// All this component does is check if the context is loaded and render the children if it is
// All screens in collection creation must be wrapped in this
export default function CollectionCreationLayout({ style, ...rest }: CollectionCreationLayoutProps) {
  const context = useContext(CollectionCreationContext);

  if (!context || context?.loading) return <LoadingIndicator />;

  return <CView style={{ flex: 1, ...style }} {...rest} />;
}
