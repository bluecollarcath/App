import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Curriculum from './pages/Curriculum';
import Course from './pages/Course';
import Lesson from './pages/Lesson';
import Pricing from './pages/Pricing';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import Account from './pages/Account';
import NotFound from './pages/NotFound';

export default function App() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="curriculum" element={<Curriculum />} />
        <Route path="courses/:slug" element={<Course />} />
        <Route path="courses/:slug/lessons/:lessonId" element={<Lesson />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<AuthPage mode="login" />} />
        <Route path="signup" element={<AuthPage mode="signup" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="account" element={<Account />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
