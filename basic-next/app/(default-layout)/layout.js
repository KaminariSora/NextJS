import Header from "../components/ui/header";
import Footer from "../components/ui/footer";
import ChatIcon from "../components/icons/chatIcon";

export default function DefaultLayout({ children }) {
  return (
    <>
      <Header />
      <main>
        {children}
      </main>
      <a href="/chat" className="chatbot-btn">
        <ChatIcon />
      </a>
      <Footer />
    </>
  );
}