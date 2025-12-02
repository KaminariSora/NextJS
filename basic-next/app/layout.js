import "./globals.css";
import "./layout.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="section" id='section-2'>
          {children}
        </div>
      </body>
    </html>
  );
}
