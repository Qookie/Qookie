import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Login from '../pages/Login';
import NavBar from '../components/shared/molecules/navBar';
import Home from '../pages/Home';
import Header from '../components/shared/molecules/header';

const Router = () => {
  return (
    <BrowserRouter>
      <HeaderWrapper />
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

const HeaderWrapper = () => {
  const location = useLocation();

  const checkPath = () => {
    switch (location.pathname) {
      case '/home':
        return 'home';
      case '/mind':
        return '마음함';
      case '/calendar':
        return '캘린더';
      case '/mypage':
        return '마이페이지';
      default:
        return location.pathname;
    }
  };

  return <Header page={checkPath()} />;
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
