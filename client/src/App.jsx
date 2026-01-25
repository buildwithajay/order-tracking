import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './auth/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

import OrderTracking from './pages/OrderTracking';
import About from './pages/About';
import Contact from './pages/Contact';

// User
import UserProfile from './pages/user/UserProfile';

// Customer
import CreateOrder from './pages/customer/CreateOrder';
import MyOrders from './pages/customer/MyOrders';
import CustomerOrderTracking from './pages/customer/OrderTracking';

// Manager
import ManagerDashboard from './pages/manager/ManagerDashboard';

// Admin
import AdminDashboard from './pages/admin/AdminDashboard';

// Delivery
import AvailableOrders from './pages/delivery/AvailableOrders';
import MyDeliveries from './pages/delivery/MyDeliveries';
import DeliveryDashboard from './pages/delivery/DeliveryDashboard';

function App() {
  return (
    <MainLayout>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/track" element={<OrderTracking />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected User Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<UserProfile />} />
        </Route>

        {/* Customer Routes */}
        <Route element={<ProtectedRoute allowedRoles={['User']} />}>
          <Route path="/create-order" element={<CreateOrder />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/track/:orderNumber" element={<CustomerOrderTracking />} />
        </Route>

        {/* Admin Routes */}
        <Route element={<ProtectedRoute allowedRoles={['Admin']} />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>

        {/* Manager Routes */}
        <Route element={<ProtectedRoute allowedRoles={['Manager', 'Admin']} />}>
          <Route path="/manager/dashboard" element={<ManagerDashboard />} />
        </Route>

        {/* Delivery Routes */}
        <Route element={<ProtectedRoute allowedRoles={['DeliveryPerson']} />}>
          <Route path="/delivery/dashboard" element={<DeliveryDashboard />} />
          <Route path="/delivery/available" element={<AvailableOrders />} />
          <Route path="/delivery/my-deliveries" element={<MyDeliveries />} />
        </Route>

        {/* 404 Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </MainLayout>
  );
}

export default App;
