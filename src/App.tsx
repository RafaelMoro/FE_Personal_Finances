/** @jsxImportSource @emotion/react */
import { Routes, Route } from 'react-router-dom';
import { Global } from '@emotion/react';

import {
  Login, ForgotPassword, ProtectedRoute, Dashboard,
} from './pages';
import { GlobalStyles } from './styles/Global.styled';

function App() {
  return (
    <>
      <Global styles={GlobalStyles} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
