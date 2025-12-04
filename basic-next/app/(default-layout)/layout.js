import Header from "../components/ui/header";
import Footer from "../components/ui/footer";

export default function DefaultLayout({ children }) {
  return (
    <>
      <Header/>
      <main>
        {children}
      </main>
      <Footer />
    </>
  );
}