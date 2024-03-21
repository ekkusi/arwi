import { useContext } from "react";
import Layout, { LayoutProps } from "../../../../components/layout/Layout";
import LoadingIndicator from "../../../../components/ui/LoadingIndicator";
import { CollectionCreationContext } from "./CollectionCreationProvider";

type CollectionCreationLayoutProps = LayoutProps;

// All this component does is check if the context is loaded and render the children if it is
// All screens in collection creation must be wrapped in this
export default function CollectionCreationLayout(props: CollectionCreationLayoutProps) {
  const context = useContext(CollectionCreationContext);

  if (!context || context?.loading) return <LoadingIndicator />;

  return <Layout {...props} />;
}
