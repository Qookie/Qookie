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
import Store from '../pages/Store';
import ItemUpload from '../pages/ItemUpload';
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
import AttendanceQuest from '../pages/quest/AttendanceQuest';
import Notification from '../pages/Notification';
import History from '../pages/History';
import Withdraw from '../pages/Withdraw';
import Myqookie from '../pages/Myqookie';
import Badge from '../pages/Badge';
import Profile from '../pages/Profile';
import Coinlist from '../pages/Coinlist';
import Mind from '../pages/Mind';
import PastMind from '../pages/PastMind';
import { PrivateRoute } from './PrivateRoute';

const Router = () => {
  const [userState, _] = useRecoilState(UserState);

  return (
    <BrowserRouter>
      <HeaderWrapper />
      <Routes>
        <Route path="/loading" element={<Loading />} />
        <Route path="/.well-known/assetlinks.json" element={<KeyPage />} />
        <Route path="/*" element={<NotFound signedIn={userState ? true : false} />} />

        <Route element={<PrivateRoute signedIn={userState ? true : false} />}>
          <Route path="/" element={<Login />} />
          <Route path="/init" element={<InitQookie />} />
          <Route path="/set-wakeup" element={<SetWakeupTime />} />
          <Route path="/home" element={<Home />} />
          <Route path="/mind" element={<Mind />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/store" element={<Store />} />
          <Route path="/admin" element={<ItemUpload />} />
          <Route path="/challenge" element={<Challenge />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="/calendar" element={<History />} />
          <Route path="/withdraw" element={<Withdraw />} />
          <Route path="/myqookie" element={<Myqookie />} />
          <Route path="/badge" element={<Badge />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/qoinlist" element={<Coinlist />} />
          <Route path="/past-mind" element={<PastMind />} />
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
            <Route path="attendance" element={<AttendanceQuest />} />
          </Route>
          <Route path="/*" element={<NotFound signedIn={userState ? true : false} />} />
        </Route>
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
    case '/mypage':
      return <Header page="tab" title="마이페이지" />;

    case '/calendar':
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
