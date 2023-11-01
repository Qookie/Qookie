import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Login from '../pages/Login';
import Home from '../pages/Home';
import NavBar from '../components/shared/molecules/NavBar';
import Header from '../components/shared/molecules/Header';
import InitQookie from '../pages/InitQookie';
import Challenge from '../pages/Challenge';
import Loading from '../pages/Loading';

const Router = () => {
  return (
    <BrowserRouter>
      <HeaderWrapper />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/init" element={<InitQookie />} />
        <Route path="/home" element={<Home />} />
        <Route path="/calendar" element={<Login />} />
        <Route path="/mind" element={<Login />} />
        <Route path="/mypage" element={<Login />} />
        <Route path="/challenge" element={<Challenge />} />
        <Route path="/loading" element={<Loading />} />
      </Routes>
      <NavBarWrapper />
    </BrowserRouter>
  );
};

const HeaderWrapper = () => {
  const location = useLocation();
  switch (location.pathname) {
    case '/home':
      return <Header page="home" />;
    case '/mind':
      return <Header page="tab" title="마음함" />;
    case '/calendar':
      return <Header page="tab" title="캘린더" />;
    case '/mypage':
      return <Header page="tab" title="마이페이지" />;
    case '/':
      return <></>;
    case '/init':
      return <></>;
      case '/loading':
        return <></>;
    default:
      return <Header page="default" />;
  }
};

const NavBarWrapper = () => {
  const location = useLocation();

  const checkPath = () => {
    switch (location.pathname) {
      case '/home':
        return true;
      case '/mind':
        return true;
      case '/calendar':
        return true;
      case '/mypage':
        return true;
      default:
        return false;
    }
  };

  return checkPath() && <NavBar />;
};

export default Router;
