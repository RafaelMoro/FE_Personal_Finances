/** @jsxImportSource @emotion/react */
import { Routes, Route } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Global } from '@emotion/react';

import {
  Login, ForgotPassword, ProtectedRoute, Dashboard, ResetPassword, CreateAccount,
} from './pages/LoginModule';
import { CreateRecord } from './pages/Records/CreateRecords/CreateRecord';
import { GlobalStyles } from './styles/Global.styled';
import { EditRecord } from './pages/Records/EditRecords/EditRecord';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Global styles={GlobalStyles} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/register" element={<CreateAccount />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-record" element={<CreateRecord />} />
          <Route path="/edit-record" element={<EditRecord />} />
        </Route>
      </Routes>
    </LocalizationProvider>
  );
}

export default App;
