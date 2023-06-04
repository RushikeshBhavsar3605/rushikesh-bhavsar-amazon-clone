import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { store } from "@/appredux/store";
import { Provider } from "react-redux";

/* Here we need to add redux and its provider and WRAPPING in the retturn statement */
export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  );
}

/* <Provider store={store}> */
