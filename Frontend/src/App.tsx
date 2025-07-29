import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom'
import './App.css'
import Homepage from './components/homepage'
import About from './components/About/about'
import Members from './components/members/members'
import Events from './components/Events/Event'
import Userpage from './components/user_page/Userpage'
import Admin from './components/Admin/Admin'
import Hackathon from './components/Events/Hackathon'
import HackathonCountdownPage from './pages/hackathon-countdown'
import StaffLogin from './components/staff/StaffLogin';
import StaffDashboard from './components/staff/StaffDashboard';
import UserProfileSection from './components/user_page/UserProfileSection';
import UserClubInfoSection from './components/user_page/UserClubInfoSection';
import UserPastEventsSection from './components/user_page/UserPastEventsSection';
import { ThemeProvider } from './contexts/ThemeContext';
import Login from './components/Auth/Login'
import Signup from './components/Auth/Signup'
import { PageViewsProvider } from './contexts/PageViewsContext';


function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/members" element={<Members />} />
          <Route path="/about" element={<About />} />
          <Route path="/events" element={<Events />} />
          {/* User page with nested routes */}
          <Route path="/users" element={<Userpage />}>
            <Route index element={<Navigate to="profile" replace />} />
            <Route path="profile" element={<UserProfileSection />} />
            <Route path="clubinfo" element={<UserClubInfoSection />} />
            <Route path="pastevents" element={<UserPastEventsSection />} />
          </Route>
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin/dashboard" element={<Admin/>} />
          <Route path="/admin/users" element={<Admin/>} />
          <Route path="/admin/events" element={<Admin/>} />
          <Route path="/admin/create-staff" element={<Admin/>} />
          <Route path="/events/hackathon" element={<Hackathon />} />
          <Route path="/events/hackathon-countdown" element={<HackathonCountdownPage />} />
          <Route path="/staff/login" element={<StaffLogin />} />
          <Route path="/staff" element={<Navigate to="/staff/users" replace />} />
          <Route path="/staff/users" element={<StaffDashboard />} />
          <Route path="/staff/events" element={<StaffDashboard />} />

          <Route path="/user/login" element={<Login />} />
          <Route path="/user/signup" element={<Signup />} />
          

        </Routes>
      </BrowserRouter>
      <PageViewsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/members" element={<Members />} />
            <Route path="/about" element={<About />} />
            <Route path="/events" element={<Events />} />
            {/* User page with nested routes */}
            <Route path="/users" element={<Userpage />}>
              <Route index element={<Navigate to="profile" replace />} />
              <Route path="profile" element={<UserProfileSection />} />
              <Route path="clubinfo" element={<UserClubInfoSection />} />
              <Route path="pastevents" element={<UserPastEventsSection />} />
            </Route>
            <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="/admin/dashboard" element={<Admin/>} />
            <Route path="/admin/users" element={<Admin/>} />
            <Route path="/admin/events" element={<Admin/>} />
            <Route path="/admin/create-staff" element={<Admin/>} />
            <Route path="/events/hackathon" element={<Hackathon />} />
            <Route path="/events/hackathon-countdown" element={<HackathonCountdownPage />} />
            <Route path="/staff/login" element={<StaffLogin />} />
            <Route path="/staff" element={<Navigate to="/staff/users" replace />} />
            <Route path="/staff/users" element={<StaffDashboard />} />
            <Route path="/staff/events" element={<StaffDashboard />} />
          </Routes>
        </BrowserRouter>
      </PageViewsProvider>
    </ThemeProvider>
  )
}


export default App
