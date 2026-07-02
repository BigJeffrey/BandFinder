import { Navigate, Route, Routes } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { AuthLayout } from './layouts/AuthLayout';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { Home } from './pages/Home/Home';
import { Login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';
import { Bands } from './pages/Bands/Bands';
import { BandDetails } from './pages/BandDetails/BandDetails';
import { CreateBand } from './pages/CreateBand/CreateBand';
import { EditBand } from './pages/EditBand/EditBand';
import { NotFound } from './pages/NotFound/NotFound';

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/bands" element={<Bands />} />
        <Route path="/bands/:id" element={<BandDetails />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/bands/new" element={<CreateBand />} />
          <Route path="/bands/:id/edit" element={<EditBand />} />
        </Route>
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}
