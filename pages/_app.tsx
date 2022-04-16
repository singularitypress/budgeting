import React from "react";
import type { AppProps } from "next/app";

import "../styles/index.scss";

export default ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};
