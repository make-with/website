import './App.css';
import GlobalStyles from './Globalstyles';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Header from './components/views/Header/Header';
// import LandingPage from './components/views/LandingPage/LandingPage';
import auth from './hoc/auth';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import AskPage from './components/views/AskPage/AskPage';
import AskDetailPage from './components/views/AskDetailPage/AskDetailPage';
import AskUploadPage from './components/views/AskUploadPage/AskUploadPage';
// import FundingPage from './components/views/FundingPage/FundingPage';
// import FundingDetailPage from './components/views/FundingDetailPage/FundingDetailPage';
// import ContentPage from './components/views/ContentPage/ContentPage';
import MyPage from './components/views/MyPage/MyPage';
import ProfileEditPage from './components/views/ProfileEditPage/ProfileEditPage';
import MobNotice from './components/views/MyPage/sections/MobNotice';
import MobFaq from './components/views/MyPage/sections/MobFaq';
import Footer from './components/views/Footer/Footer';

function App() {
  return (
    <Router>
      <GlobalStyles />
      <div id="body">
        <Header />
        <Switch>
          {/* <Route exact path='/' component={auth(LandingPage, null)} /> */}
          <Route exact path="/register" component={auth(RegisterPage, false)} />
          <Route exact path="/login" component={auth(LoginPage, false)} />
          <Route exact path="/" component={auth(AskPage, null)} />
          <Route
            exact
            path="/ask/upload"
            component={auth(AskUploadPage, true)}
          />
          <Route
            exact
            path="/ask/:askId"
            component={auth(AskDetailPage, null)}
          />
          {/* <Route exact path='/funding' component={auth(FundingPage, null)} />
          <Route exact path='/funding/:fundingId' component={auth(FundingDetailPage, null)} />
          <Route exact path='/content' component={auth(ContentPage, null)} /> */}
          <Route exact path="/mypage" component={auth(MyPage, true)} />
          <Route
            exact
            path="/mypage/profile"
            component={auth(ProfileEditPage, true)}
          />
          <Route
            exact
            path="/mypage/notice"
            component={auth(MobNotice, true)}
          />
          <Route exact path="/mypage/faq" component={auth(MobFaq, true)} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
