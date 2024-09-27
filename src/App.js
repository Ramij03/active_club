// App.js
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Menu from './components/Menu';
import Footer from './components/Footer';
import Dashboard from './pages/admin/Dashboard';
import Profile from './pages/public/profile';
import Register from './components/auth/register';
import Login from './components/auth/login';
import Home from './pages/public/home';
import AboutUs from './pages/public/about';
import UserRoute from './Routes/UserRoute';
import AdminRoute from './Routes/AdminRoute';
import ManageAdmins from './pages/admin/manageadmins';
import ManageGuides from './pages/admin/manageguides';
import ManageUsers from './pages/admin/manageusers';
import ManageEvents from './pages/admin/manageevents';
import MenuA from '../src/components/MenuA';
import HeaderA from './components/HeaderA';
import EventDetails from './pages/public/eventdetail';
import Guide from './pages/public/guide';
import Events from './pages/public/events';
import GuideDetail from './pages/public/guidedetail';
import ManageMembers from './pages/admin/managemembers';
import ManageCateg from './pages/admin/managecateg';
import GetStarted from './pages/public/GetStarted';
import { AppProvider } from './components/helper/UseContext';

const Layout = ({ children }) => (
  <>
    <Header />
    <Menu />
    {children}
    <Footer />
  </>
);

const Layout1 = ({ children }) => (
  <>
    <HeaderA />
    <MenuA />
    {children}
    <Footer />
  </>
);

function App() {
  return (
    <div className="wrapper">
      <AppProvider> {/* Wrap everything with AppProvider */}
        <Router>
          <Routes>
            <Route path="/" element={<GetStarted />} />
            
            {/* User Routes */}
            <Route path="/home" element={
              <UserRoute>
                <Layout><Home /></Layout>
              </UserRoute>
            } />
            <Route path="/profile" element={
              <UserRoute>
                <Layout><Profile /></Layout>
              </UserRoute>
            } />
            <Route path="/eventdetail/:eventId" element={
              <UserRoute>
                <Layout><EventDetails /></Layout>
              </UserRoute>
            } />
            <Route path="/event" element={
              <UserRoute>
                <Layout><Events /></Layout>
              </UserRoute>
            } />
            <Route path="/guide" element={
              <UserRoute>
                <Layout><Guide /></Layout>
              </UserRoute>
            } />
            <Route path="/guidedetail/:guideId" element={
              <UserRoute>
                <Layout><GuideDetail /></Layout>
              </UserRoute>
            } />
            
            {/* Admin Routes */}
            <Route path="/dashboard" element={
              <AdminRoute>
                <Layout1><Dashboard /></Layout1>
              </AdminRoute>
            } />
            <Route path="/manageevents" element={
              <AdminRoute>
                <Layout1><ManageEvents /></Layout1>
              </AdminRoute>
            } />
            <Route path="/manageguides" element={
              <AdminRoute>
                <Layout1><ManageGuides /></Layout1>
              </AdminRoute>
            } />
            <Route path="/manageusers" element={
              <AdminRoute>
                <Layout1><ManageUsers /></Layout1>
              </AdminRoute>
            } />
            <Route path="/manageadmins" element={
              <AdminRoute>
                <Layout1><ManageAdmins /></Layout1>
              </AdminRoute>
            } />
            <Route path="/managemembers" element={
              <AdminRoute>
                <Layout1><ManageMembers /></Layout1>
              </AdminRoute>
            } />
            <Route path="/managecateg" element={
              <AdminRoute>
                <Layout1><ManageCateg /></Layout1>
              </AdminRoute>
            } />

            {/* Auth Routes */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            <Route path="/aboutus" element={<UserRoute><Layout><AboutUs /></Layout></UserRoute>} />
          </Routes>
        </Router>
      </AppProvider>
    </div>
  );
}

export default App;
