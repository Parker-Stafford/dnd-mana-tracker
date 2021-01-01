/* eslint-disable react/prop-types */
import Head from 'next/head';
import { Provider } from 'next-auth/client';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../apollo/config';

function MyApp({ Component, pageProps }) {
  const client = useApollo(pageProps.initialApolloState);
  return (
    <ApolloProvider client={client}>
      <Provider session={pageProps.session}>
        <Head>
          <link rel="icon" href="/flask-solid.png" />
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
            integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
            crossOrigin="anonymous"
          />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Righteous&family=Roboto:wght@400;500&display=swap" rel="stylesheet" />
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.15.1/css/all.css"
            integrity="sha384-vp86vTRFVJgpjF9jiIGPEEqYqlDwgyBgEF109VFjmqGmIY/Y4HV4d3Gp2irVfcrp"
            crossOrigin="anonymous"
          />
        </Head>
        <Component {...pageProps} />
        <div id="portal" />
      </Provider>
    </ApolloProvider>
  );
}

export default MyApp;
