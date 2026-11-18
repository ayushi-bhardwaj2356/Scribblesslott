import { Outlet } from 'react-router-dom';
import AnnouncementBar from './AnnouncementBar';
import Footer from './Footer';
import Navbar from './Navbar';

export default function Layout() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <AnnouncementBar />
        <Navbar />
      </header>
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
