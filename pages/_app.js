import "../styles/globals.css";
import Head from "next/head";
import GameStateContextProvider from "../contexts/GameStateContextProvider";
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Where&apos;s That Thing?</title>
        <meta name="description" content="A fun Where's Wally type game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GameStateContextProvider>
        <Component {...pageProps} />
      </GameStateContextProvider>
    </>
  );
}

export default MyApp;
