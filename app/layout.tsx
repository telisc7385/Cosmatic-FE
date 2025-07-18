// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ServersideComponent/Navbar/NavbarComponent";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/ServersideComponent/Footer/Footer";
import { fetchTopCategories } from "@/api/fetchTopCategories";
import ReduxProviderWrapper from "@/CartProvider/ReduxProviderWrapper";
import { getCompanySettings, CompanySettings } from "@/api/CompanyApi";
import Script from "next/script"; // Import Script component from next/script
import HomeCoupon from "@/components/ClientsideComponent/HomeCoupon/HomeCoupon";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cosmetics",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // If 'authToken' is not used anywhere else in this component (e.g., passed to a client component
  // or used for server-side logic within this layout), you can remove these two lines:
  // If you removed them, the 'authToken' unused variable error will go away.

  const topCategories = await fetchTopCategories();
  const companySettingsRes = await getCompanySettings();
  const companyDetails: CompanySettings | undefined =
    companySettingsRes?.result?.[0];

  return (
    <html lang="en">
      <head>
        {/*
          Using next/script for Google Analytics.
          The 'strategy="afterInteractive"' ensures the script loads after the page is interactive,
          which is generally good for analytics scripts.
        */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-LC7RRWM205"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-LC7RRWM205');
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} font-serif antialiased`}
      >
        <ReduxProviderWrapper>
          <Toaster position="top-center" />
         
          <Navbar companyDetails={companyDetails} />
          <main className="pt-0 bg-white">{children}</main>
          <Footer
            topCategories={topCategories}
            companyDetails={companyDetails}
          />
        </ReduxProviderWrapper>
      </body>
    </html>
  );
}
