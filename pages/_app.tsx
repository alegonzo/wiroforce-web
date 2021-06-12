import React from "react";
import Head from "next/head";
import { Provider } from "next-auth/client";
import { AppProps } from "next/app";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../styles/theme";

export default function MyApp(props: AppProps) {
    const { Component, pageProps } = props;

    React.useEffect(() => {
        const jssStyles = document.querySelector("#jss-server-side");
        if (jssStyles) {
            jssStyles.parentElement!.removeChild(jssStyles);
        }
    }, []);

    return (
        <Provider
            options={{
                clientMaxAge: 0,
                keepAlive: 0,
                basePath: `/wiroforce/api/auth`,
            }}
            session={pageProps.session}
        >
            <React.Fragment>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Component {...pageProps} />
                </ThemeProvider>
            </React.Fragment>
        </Provider>
    );
}
