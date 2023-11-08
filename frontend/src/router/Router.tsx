import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Login from '../pages/Login';
import Home from '../pages/Home';
import NavBar from '../components/shared/molecules/NavBar';
import Header from '../components/shared/molecules/Header';
import InitQookie from '../pages/InitQookie';
import Challenge from '../pages/Challenge';
import Loading from '../pages/Loading';
import SetWakeupTime from '../pages/SetWakeupTime';
import Mypage from '../pages/Mypage';
import WakeupQuest from '../pages/quest/WakeupQuest';
import EatQuest from '../pages/quest/EatQuest';
import { useRecoilState } from 'recoil';
import { UserState } from '../modules/user';
import NotFound from '../pages/NotFound';
import WalkQuest from '../pages/quest/WalkQuest';
import SquatQuest from '../pages/quest/SquatQuest';
import PromiseQuest from '../pages/quest/PromiseQuest';
import PhotoQuest from '../pages/quest/PhotoQuest';
import StretchQuest from '../pages/quest/StretchQuest';
import MeditaionQuest from '../pages/quest/MeditaionQuest';
import WaterQuest from '../pages/quest/WaterQuest';
import KeyPage from '../pages/KeyPage';
import Notification from '../pages/Notification';

const Router = () => {
  const [userState, _] = useRecoilState(UserState);

const reload = () => window.location.reload()

  return (
    <BrowserRouter>
      <HeaderWrapper />
      {userState ? (
        <Routes>
          <Route path="/*" element={<NotFound />} />
          <Route path="/init" element={<InitQookie />} />
          <Route path="/set-wakeup" element={<SetWakeupTime />} />
          <Route path="/home" element={<Home />} />
          <Route path="/calendar" element={<Login />} />
          <Route path="/mind" element={<Login />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/challenge" element={<Challenge />} />
            <Route path="/notification" element={<Notification />} />
          <Route path="/loading" element={<Loading />} />

          <Route path="/quest">
            <Route path="wake" element={<WakeupQuest />} />
            <Route path="eat" element={<EatQuest />} />
            <Route path="walk" element={<WalkQuest />} />
            <Route path="squat" element={<SquatQuest />} />
            <Route path="promise" element={<PromiseQuest />} />
            <Route path="photo" element={<PhotoQuest />} />
            <Route path="stretch" element={<StretchQuest />} />
            <Route path="meditation" element={<MeditaionQuest />} />
            <Route path="water" element={<WaterQuest />} />
          </Route>
        </Routes>
      ) : (
        <Routes>
          <Route path="/*" element={<Login />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="/.well-known/assetlinks.json" element={<KeyPage/>}/>
        </Routes>
      )}
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
    case '/set-wakeup':
    case '/':
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
      case '/notification':
        return true;
      default:
        return false;
    }
  };

  return checkPath() && <NavBar />;
};

export default Router;
