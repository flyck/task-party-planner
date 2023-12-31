import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import { AppProps } from 'next/app';

import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client"
const inter = Inter({ subsets: ['latin'] })


// Adds messages only in a dev environment
if (process.env.NODE_ENV === "development") {
  loadDevMessages();
  loadErrorMessages();
}

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      "x-api-key": process.env.NEXT_PUBLIC_API_KEY || ""
    },
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <div className={inter.className}>
        <Component {...pageProps} />
      </div>
    </ApolloProvider>
  )
}


export default MyApp
