import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import DNA from './pages/DNA';
import PlanetTwin from './pages/PlanetTwin';
import Optimization from './pages/Optimization';
import Forecasts from './pages/Forecasts';
import Scanner from './pages/Scanner';
import Coach from './pages/Coach';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

export const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route
            path="/dashboard"
            element={
              <Layout>
                <Dashboard />
              </Layout>
            }
          />
          <Route
            path="/twin"
            element={
              <Layout>
                <PlanetTwin />
              </Layout>
            }
          />
          <Route
            path="/dna"
            element={
              <Layout>
                <DNA />
              </Layout>
            }
          />
          <Route
            path="/forecasts"
            element={
              <Layout>
                <Forecasts />
              </Layout>
            }
          />
          <Route
            path="/optimization"
            element={
              <Layout>
                <Optimization />
              </Layout>
            }
          />
          <Route
            path="/scanner"
            element={
              <Layout>
                <Scanner />
              </Layout>
            }
          />
          <Route
            path="/coach"
            element={
              <Layout>
                <Coach />
              </Layout>
            }
          />
          <Route
            path="/profile"
            element={
              <Layout>
                <Profile />
              </Layout>
            }
          />
        </Route>

        {/* Fallback redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};
export default App;

