import { Outlet } from 'react-router-dom';
import { Footer } from '../components/Footer/Footer';
import { Navbar } from '../components/Navbar/Navbar';

export function MainLayout() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="page">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
