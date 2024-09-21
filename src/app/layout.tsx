import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { SidebarComponent } from "@/components/sidebar";
import { ThemeProvider } from "@/components/common/theme-provider";
import { LanguageProvider } from "@/lib/lenguage-context";
import StyledToaster from "@/components/common/styled-toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tu Portfolio",
  description: "Portfolio personal creado con Next.js",
  // openGraph: {
  //   title: "Walden",
  //   description:
  //     "Cada mes Walden.ai lanza una Mystery Box donde puedes conseguir premios que te ayuden en tu camino inmobiliario.",
  //   url: "https://walden-ai.vercel.app/",
  //   type: "website",
  //   images: [
  //     {
  //       url: "https://walden.ai/wp-content/uploads/2024/02/logo.png",
  //       width: 1000,
  //       height: 400,
  //       alt: "Walden Preview Image ",
  //     },
  //   ],
  // },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <div className="flex">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <LanguageProvider>
              <SidebarComponent />
              <StyledToaster />
              <main className="flex-1 p-4">{children}</main>
            </LanguageProvider>
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
