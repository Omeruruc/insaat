import { useEffect } from 'react';
import { NavigationBar } from './components/NavigationBar';
import { FooterBar } from './components/FooterBar';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { Routes, Route, useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-zinc-950">
      <header>
        <NavigationBar />
      </header>

      <main className="pt-20" role="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projeler" element={<ProjectsPage />} />
          <Route path="/projeler/:projectId" element={<ProjectDetailPage />} />
          <Route path="/hakkimizda" element={<AboutPage />} />
          <Route path="/iletisim" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <footer>
        <FooterBar />
      </footer>
    </div>
  );
}

export default App;
