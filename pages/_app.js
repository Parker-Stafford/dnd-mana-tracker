/* eslint-disable react/prop-types */
import '../styles/globals.css';
import { Provider } from 'next-auth/client';
import { ApolloProvider } from '@apollo/client';
import client from '../gqlClient/config';

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Provider session={pageProps.session}>
        <Component {...pageProps} />
      </Provider>
    </ApolloProvider>
  );
}

export default MyApp;
