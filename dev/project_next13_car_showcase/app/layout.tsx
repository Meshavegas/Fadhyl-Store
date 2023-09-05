import ProductContextProvider from "@context/ProductContextProvider";
import "./globals.css";

import { Footer, NavBar } from "@components";

export const metadata = {
  title: "Fadhyl Store",
  description: "Site de vente de pagne camerounais et autres",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative">
        <ProductContextProvider>
          <NavBar />
          {children}
          <Footer />
        </ProductContextProvider>
      </body>
    </html>
  );
}
