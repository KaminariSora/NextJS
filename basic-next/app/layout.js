import "./globals.css";
import "./layout.css";
import Navbar from "./components/navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <div className="section" id='section-2'>
          {children}
        </div>
      </body>
    </html>
  );
}
