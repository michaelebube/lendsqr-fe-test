import { Navigate, Route, Routes } from 'react-router-dom';
import { DashboardLayout } from './components/DashboardLayout';
import { DashboardHome } from './pages/DashboardHome';
import { Login } from './pages/Login';
import { UserDetails } from './pages/UserDetails';
import { Users } from './pages/Users';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardHome />} />
        <Route path="users" element={<Users />} />
        <Route path="users/:userId" element={<UserDetails />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
