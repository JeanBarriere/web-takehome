import 'styles/index.scss';

import Head from 'next/head';

import useCssMobileHeight from 'hooks/useCssMobileHeight';
import { createContext } from 'react';

const user = createContext({ username: '' })

function App({ Component, pageProps }) {
  useCssMobileHeight();

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, viewport-fit=cover"
        />
      </Head>
      <user.Provider value={{ username: 'something else' }}>
        <Component {...pageProps} key="main" />
      </user.Provider>
    </>
  );
}

export default App;
