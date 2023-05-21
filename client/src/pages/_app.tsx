import type { AppProps } from "next/app";
import React from "react";
import RootLayout from "@/components/layout/layout";
import "../style/global.css";
// import { ThemeProvider } from "@mui/styles";
import { ThemeProvider } from "@mui/material/styles";
import { mainTheme } from "../style/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={mainTheme}>
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </ThemeProvider>
  );
}
export default MyApp;
