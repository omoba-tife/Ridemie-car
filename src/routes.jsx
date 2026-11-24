
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layouts
import Layout from "./layouts/Layout";

// Public pages
import Home from "./pages/Home";
import Fleet from "./pages/Fleet";
import VehicleDetails from "./pages/VehicleDetails";
import Booking from "./pages/Booking";
import Services from "./pages/Services";
import Experience from "./pages/Experience";
import Partners from "./pages/Partners";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

// Authentication pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";

// Customer pages
import Dashboard from "./pages/Dashboard";
import MyBookings from "./pages/MyBookings";
import Profile from "./pages/Profile";
import SavedVehicles from "./pages/SavedVehicles";
import Payments from "./pages/Payments";
import BookingDetails from "./pages/BookingDetails";

// Partner pages
import PartnerDashboard from "./pages/PartnerDashboard";
import AddVehicle from "./pages/AddVehicle";
import PartnerVehicles from "./pages/PartnerVehicles";
import PartnerBookings from "./pages/PartnerBookings";
import PartnerEarnings from "./pages/PartnerEarnings";
import PartnerWithdrawals from "./pages/PartnerWithdrawals";

// Admin pages
import AdminDashboard from "./pages/AdminDashboard";
import AdminLayout from "./pages/AdminLayout";
import AdminUsers from "./pages/AdminUsers";
import AdminVehicles from "./pages/AdminVehicles";
import AdminBookings from "./pages/AdminBookings";
import AdminPayments from "./pages/AdminPayments";
import AdminTransactions from "./pages/AdminTransactions";
import AdminSettings from "./pages/AdminSettings";
import AdminCommissions from "./pages/AdminCommissions";
import AdminSupport from "./pages/AdminSupport";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =================================
            PUBLIC WEBSITE
        ================================= */}

        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />

          <Route path="/fleet" element={<Fleet />} />
          <Route path="/fleet/:id" element={<VehicleDetails />} />

          <Route path="/booking" element={<Booking />} />
          <Route path="/services" element={<Services />} />
          <Route path="/experience" element={<Experience />} />

          <Route path="/partners" element={<Partners />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>


        {/* =================================
            CUSTOMER DASHBOARD
        ================================= */}

        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/my-bookings/:id" element={<BookingDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/saved-vehicles" element={<SavedVehicles />} />
          <Route path="/payments" element={<Payments />} />
        </Route>


        {/* =================================
            PARTNER DASHBOARD
        ================================= */}

        <Route element={<Layout />}>
          <Route
            path="/partner/dashboard"
            element={<PartnerDashboard />}
          />

          <Route
            path="/partner/add-vehicle"
            element={<AddVehicle />}
          />

          <Route
            path="/partner/vehicles"
            element={<PartnerVehicles />}
          />

          <Route
            path="/partner/bookings"
            element={<PartnerBookings />}
          />

          <Route
            path="/partner/earnings"
            element={<PartnerEarnings />}
          />

          <Route
            path="/partner/withdrawals"
            element={<PartnerWithdrawals />}
          />
        </Route>


        {/* =================================
            ADMINISTRATION DASHBOARD
        ================================= */}

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />

          <Route
            path="users"
            element={<AdminUsers />}
          />

          <Route
            path="vehicles"
            element={<AdminVehicles />}
          />

          <Route
            path="bookings"
            element={<AdminBookings />}
          />

          <Route
            path="payments"
            element={<AdminPayments />}
          />

          <Route
            path="transactions"
            element={<AdminTransactions />}
          />

          <Route
            path="commissions"
            element={<AdminCommissions />}
          />

          <Route
            path="support"
            element={<AdminSupport />}
          />

          <Route
            path="settings"
            element={<AdminSettings />}
          />
        </Route>


        {/* =================================
            404 PAGE
        ================================= */}

        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}
