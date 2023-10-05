import { Inter } from "next/font/google";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "next-themes";
import { Providers } from "@/context/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AI Chatbot",
  description: "AI powered chatbot trained on your PDF files",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Toaster
            position="top-right"
            reverseOrder={false}
            toastOptions={{ style: { background: "black", color: "white" } }}
          />
          <Theme>{children}</Theme>
        </Providers>
      </body>
    </html>
  );
}
