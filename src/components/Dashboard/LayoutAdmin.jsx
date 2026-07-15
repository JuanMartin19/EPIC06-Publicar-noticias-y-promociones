import { Outlet } from 'react-router-dom';
import HeaderAdmin from './HeaderAdmin';
import Sidebar from './Sidebar';
import { useAuth } from '../../auth/AuthContext';

const LayoutAdmin = () => {
  const { user, logout } = useAuth();

  return (
    <div className="d-flex flex-column vh-100">
      <HeaderAdmin username={user?.username} onLogout={logout} />
      <div className="d-flex flex-grow-1">
        <Sidebar />
        <main className="flex-grow-1 p-4 bg-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default LayoutAdmin;