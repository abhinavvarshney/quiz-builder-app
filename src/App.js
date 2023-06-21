import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import PrivateWrapper from './components/PrivateWrapper';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { KEYS_IN_LOCAL_STORAGE, PAGE_ROUTES, QUIZ } from './constants';
import SignIn from './pages/SignIn';
import Signup from './pages/Signup';
import QuizCreated from './pages/QuizCreated';
import AllQuiz from './pages/AllQuiz';
import CreateQuiz from './pages/CreateQuiz';
import { getDataFromLocalStorage } from './utils/dataStorage';
import Quiz from './pages/Quiz';

function App() {


  /*
   * Find if user is authorized or not 
  */
  let authorized = false;
  const {
    token = ''
  } = getDataFromLocalStorage(KEYS_IN_LOCAL_STORAGE.USER_INFO) || {};
  if (token) {
    authorized = true;
  }

  return (
    <Router>
      <Routes>
        <Route element={<PrivateWrapper auth={{ isAuthenticated: authorized }} />}>
          <Route path="/" exact={true} element={<QuizCreated />} />
        </Route>
        <Route element={<PrivateWrapper auth={{ isAuthenticated: authorized }} />}>
          <Route path={PAGE_ROUTES.DASHBOARD} element={<QuizCreated />} />
        </Route>
        <Route element={<PrivateWrapper auth={{ isAuthenticated: authorized }} />}>
          <Route path={PAGE_ROUTES.QUIZ_CREATED} element={<QuizCreated />} />
        </Route>
        <Route element={<PrivateWrapper auth={{ isAuthenticated: authorized }} />}>
          <Route path={PAGE_ROUTES.ALL_QUIZ} element={<AllQuiz />} />
        </Route>
        <Route element={<PrivateWrapper auth={{ isAuthenticated: authorized }} />}>
          <Route path={PAGE_ROUTES.CREATE_QUIZ} element={<CreateQuiz />} />
        </Route>
        <Route path={PAGE_ROUTES.SIGNIN} element={<SignIn />} />
        <Route path={PAGE_ROUTES.SIGNUP} element={<Signup />} />
        <Route path={`${PAGE_ROUTES.QUIZ}${QUIZ.PERMALINK}`} element={<Quiz />} />
      </Routes>
    </Router>
  );
}

export default App;
