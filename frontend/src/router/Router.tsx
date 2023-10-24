import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Login from '../pages/Login';
import NavBar from '../components/shared/navBar';
import Home from '../pages/Home';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/calendar" element={<Login />} />
        <Route path="/mind" element={<Login />} />
        <Route path="/mypage" element={<Login />} />
      </Routes>
      <NavBarWrapper />
    </BrowserRouter>
  );
};

const NavBarWrapper = () => {
  const location = useLocation();

  const checkPath = () => {
    switch (location.pathname) {
      case '/':
        return false;
      default:
        return true;
    }
  };

  return checkPath() && <NavBar />;
};

export default Router;
