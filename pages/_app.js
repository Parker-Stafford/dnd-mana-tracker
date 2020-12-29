/* eslint-disable react/prop-types */
import '../styles/globals.css';
import { Provider } from 'next-auth/client';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../apollo/config';

function MyApp({ Component, pageProps }) {
  const client = useApollo(pageProps.initialApolloState);
  return (
    <ApolloProvider client={client}>
      <Provider session={pageProps.session}>
        <Component {...pageProps} />
      </Provider>
    </ApolloProvider>
  );
}

export default MyApp;
