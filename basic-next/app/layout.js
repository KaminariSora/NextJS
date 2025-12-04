import Footer from "./components/ui/footer";
import Header from "./components/ui/header";
import "./globals.css";
import "./layout.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
