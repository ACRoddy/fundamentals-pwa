import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import SplashPage          from './pages/SplashPage'
import MenuPage            from './pages/MenuPage'
import WeekGridPage        from './pages/WeekGridPage'
import SessionPage         from './pages/SessionPage'
import WarmUpListPage      from './pages/WarmUpListPage'
import WarmUpPage          from './pages/WarmUpPage'
import ActivityListPage    from './pages/ActivityListPage'
import ActivityPage        from './pages/ActivityPage'
import WelcomeRoutinePage  from './pages/WelcomeRoutinePage'
import TidyUpPage          from './pages/TidyUpPage'
import ParentBriefingPage  from './pages/ParentBriefingPage'
import OrganisationPage    from './pages/OrganisationPage'
import CoolDownPage        from './pages/CoolDownPage'
import ComingSoonPage      from './pages/ComingSoonPage'
import AdminGatePage       from './pages/admin/AdminGatePage'
import AdminHomePage       from './pages/admin/AdminHomePage'
import WeekSetupPage       from './pages/admin/WeekSetupPage'
import ActivityFormPage    from './pages/admin/ActivityFormPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Splash */}
        <Route path="/"        element={<SplashPage />} />

        {/* Main menu */}
        <Route path="/menu"    element={<MenuPage />} />

        {/* Lessons flow */}
        <Route path="/lessons"                               element={<WeekGridPage />} />
        <Route path="/lessons/:weekId"                       element={<SessionPage />} />
        <Route path="/lessons/:weekId/welcome"               element={<WelcomeRoutinePage />} />
        <Route path="/lessons/:weekId/warmup"                element={<WarmUpListPage />} />
        <Route path="/lessons/:weekId/warmup/:slot"          element={<WarmUpPage />} />
        <Route path="/lessons/:weekId/throwing"              element={<ActivityListPage />} />
        <Route path="/lessons/:weekId/throwing/:slot"        element={<ActivityPage />} />
        <Route path="/lessons/:weekId/kicking"               element={<ActivityListPage />} />
        <Route path="/lessons/:weekId/kicking/:slot"         element={<ActivityPage />} />
        <Route path="/lessons/:weekId/cooldown"              element={<CoolDownPage />} />
        <Route path="/lessons/:weekId/tidyup"                element={<TidyUpPage />} />
        <Route path="/lessons/:weekId/parents"               element={<ParentBriefingPage />} />
        <Route path="/lessons/:weekId/layout"                element={<OrganisationPage />} />

        {/* Admin */}
        <Route path="/admin"              element={<AdminGatePage />} />
        <Route path="/admin/home"         element={<AdminHomePage />} />
        <Route path="/admin/week"         element={<WeekSetupPage />} />
        <Route path="/admin/activity/new" element={<ActivityFormPage />} />

        {/* Coming soon sections */}
        <Route path="/inclusion"         element={<ComingSoonPage />} />
        <Route path="/alt-activities"    element={<ComingSoonPage />} />
        <Route path="/parents-resources" element={<ComingSoonPage />} />
        <Route path="/committee"         element={<ComingSoonPage />} />
        <Route path="/calendar"          element={<ComingSoonPage />} />
        <Route path="/setup"             element={<ComingSoonPage />} />
        <Route path="/layout-org"        element={<ComingSoonPage />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
