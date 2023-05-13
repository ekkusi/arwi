import { ApolloClient, ApolloProvider as ApolloProviderBase, InMemoryCache } from "@apollo/client";
import Constants from "expo-constants";

const client = new ApolloClient({
  uri: Constants.expoConfig?.extra?.graphqlApiUrl,
  cache: new InMemoryCache(),
});

export default function ApolloProvider({ children }: { children: React.ReactNode }) {
  return <ApolloProviderBase client={client}>{children}</ApolloProviderBase>;
}
