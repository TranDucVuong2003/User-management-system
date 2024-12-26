import './assets/reset.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppProvider } from './Context/ContextApp';
import { Navigate, Route, Routes } from 'react-router-dom';
import React, { Fragment, lazy, Suspense, useCallback, useEffect, useState } from 'react';

const UserList = lazy(() => import('./Components/UserList'))
const LogIn = lazy(() => import('./Components/LogIn/LogIn'));
const Header = lazy(() => import('./Components/Header'))
const InputTable = lazy(() => import('./Components/InputTable'))


function App() {
  const [isAuth, setIsAuth] = useState(false);

  // Kiểm tra trạng thái đăng nhập khi load ứng dụng
  useEffect(() => {
    const auth = localStorage.getItem('isAuth');
    if (auth === 'true') {
      setIsAuth(true);
    }
  }, []);

  const hanleSetAuth = useCallback((isAuth) => {
    setIsAuth(isAuth)
  }, [])
  return (
    // context
    <Suspense>
      <AppProvider>
        <Routes>
          <Route path="/" element={
            isAuth ? <Fragment>
              <Header setIsAuth={hanleSetAuth} /> <UserList />
            </Fragment> : <Navigate to="/login" />
          } />

          <Route path="/users" element={
            isAuth ? <Fragment>
              <Header setIsAuth={hanleSetAuth} /> <UserList />
            </Fragment> : <Navigate to="/login" />
          } />

          <Route path="/login" element={
            isAuth ? <Navigate to="/" /> : <LogIn setIsAuth={setIsAuth} />
          } />

          <Route path='/user' element={
            isAuth ? <><Header setIsAuth={setIsAuth} /><InputTable /></> : <Navigate to="/login" />
          } />

        </Routes>
      </AppProvider>
    </Suspense>
  )
}

export default App
