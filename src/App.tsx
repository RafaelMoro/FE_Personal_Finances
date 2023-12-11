/** @jsxImportSource @emotion/react */
import { Routes, Route, Navigate } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Global } from '@emotion/react';
import { Provider } from 'react-redux';

import {
  Login, ForgotPassword, ProtectedRoute, Dashboard, ResetPassword, CreateAccount,
} from './pages/LoginModule';
import { CreateRecord } from './pages/Records/CreateRecords/CreateRecord';
import { GlobalStyles } from './styles/Global.styled';
import { EditRecord } from './pages/Records/EditRecords/EditRecord';
import { NotFound } from './pages/NotFound';
import { store } from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Global styles={GlobalStyles} />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/register" element={<CreateAccount />} />
          <Route path="/404" element={<NotFound />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create-record" element={<CreateRecord />} />
            <Route path="/edit-record" element={<EditRecord />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Route>
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </LocalizationProvider>
    </Provider>
  );
}

export default App;
