import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-light">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
