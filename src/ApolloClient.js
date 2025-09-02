import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const Client = new ApolloClient({
    link: new HttpLink({
        uri: `https://foodapp.digipintechnology.com/graphql/` ,
    }),
    cache: new InMemoryCache(),
});

export default Client;