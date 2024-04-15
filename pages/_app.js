import '../styles/globals.css';
import 'prismjs/themes/prism-tomorrow.css';

import { SessionProvider } from "next-auth/react"

export default function MyApp({ Component, pageProps: { session, ...pageProps }, 
}) {
  return (
    <>
      <SessionProvider session={session}>
        <span className="theme-bejamas" />
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}
