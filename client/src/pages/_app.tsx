import type { AppProps } from "next/app";
import React from "react";
import RootLayout from "@/components/layout/layout";

// Global Theme
const theme = {
  //@ts-ignore
  components: {
    MuiTimeline: {
      styleOverrides: {
        root: {
          backgroundColor: "red",
        },
      },
    },
  },
  typography: {
    /*
    fontFamily: '"Encode Sans", sans-serif',
    */
  },
  palette: {
    background: {
      default: "#FFFFFF",
    },
    primary: { 500: "#4B2E83" },
    secondary: { main: "#85754D" },
  },
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RootLayout>
      <Component {...pageProps} />
    </RootLayout>
  );
}
export default MyApp;
