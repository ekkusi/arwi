import { useContext } from "react";
import Layout, { LayoutProps } from "../../../../../components/Layout";
import LoadingIndicator from "../../../../../components/LoadingIndicator";
import { DefaultCollectionCreationContext } from "./DefaultCollectionCreationProvider";

type DefaultCollectionCreationLayoutProps = LayoutProps;

// All this component does is check if the context is loaded and render the children if it is
// All screens in collection creation must be wrapped in this
export default function DefaultCollectionCreationLayout(props: DefaultCollectionCreationLayoutProps) {
  const context = useContext(DefaultCollectionCreationContext);

  if (!context || context?.loading) return <LoadingIndicator />;

  return <Layout {...props} />;
}
