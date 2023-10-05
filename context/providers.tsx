"use client";

import { ThemeProvider } from "next-themes";

export function Providers(props: { children: React.ReactNode }) {
  const { children } = props;

  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
}
