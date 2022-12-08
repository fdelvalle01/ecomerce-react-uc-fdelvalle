import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

// Componente que envuelve a la aplicación para que pueda acceder a los datos de Apollo Client a través de la propiedad client en todo el árbol de componentes.
const client = new ApolloClient({
  uri: "https://ddam-2022-react-api.onrender.com/shop/graphql",
  cache: new InMemoryCache(),
});

export function ProductApolloClient(props) {
  return <ApolloProvider client={client} {...props}></ApolloProvider>;
}
