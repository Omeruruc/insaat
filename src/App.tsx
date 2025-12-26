import { useEffect } from 'react';
import { NavigationBar } from './components/NavigationBar';
import { FooterBar } from './components/FooterBar';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { CompletedProjectsPage } from './pages/CompletedProjectsPage';
import { OngoingProjectsPage } from './pages/OngoingProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { ContactPage } from './pages/ContactPage';
import { BoardMessagePage } from './pages/BoardMessagePage';
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
        {/* @ts-expect-error - React Router v6 type definitions issue with React 18 */}
        <Routes>
          {/* @ts-expect-error - React Router v6 type definitions issue with React 18 */}
          <Route path="/" element={<HomePage />} />
          {/* @ts-expect-error - React Router v6 type definitions issue with React 18 */}
          <Route path="/projeler" element={<ProjectsPage />} />
          {/* @ts-expect-error - React Router v6 type definitions issue with React 18 */}
          <Route path="/projeler/tamamlanan" element={<CompletedProjectsPage />} />
          {/* @ts-expect-error - React Router v6 type definitions issue with React 18 */}
          <Route path="/projeler/devam-eden" element={<OngoingProjectsPage />} />
          {/* @ts-expect-error - React Router v6 type definitions issue with React 18 */}
          <Route path="/projeler/:projectId" element={<ProjectDetailPage />} />
          {/* @ts-expect-error - React Router v6 type definitions issue with React 18 */}
          <Route path="/hakkimizda" element={<AboutPage />} />
          {/* @ts-expect-error - React Router v6 type definitions issue with React 18 */}
          <Route path="/yonetim-kurulu-mesaji" element={<BoardMessagePage />} />
          {/* @ts-expect-error - React Router v6 type definitions issue with React 18 */}
          <Route path="/iletisim" element={<ContactPage />} />
          {/* @ts-expect-error - React Router v6 type definitions issue with React 18 */}
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
