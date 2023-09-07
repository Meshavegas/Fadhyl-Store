import ProductContextProvider from "@context/ProductContextProvider";
import "./globals.css";

import { Footer, NavBar } from "@components";
import UserContextProvider from "@context/user/usercontextProvider";

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
        <UserContextProvider>
          <ProductContextProvider>
            <NavBar />
            {children}
            <Footer />
          </ProductContextProvider>
        </UserContextProvider>
      </body>
    </html>
  );
}
