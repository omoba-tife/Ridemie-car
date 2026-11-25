
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layouts
import Layout from "./layouts/Layout";
import AdminLayout from "./layouts/AdminLayout";

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
import AdminUsers from "./pages/AdminUsers";
import AdminVehicles from "./pages/AdminVehicles";
import AdminBookings from "./pages/AdminBookings";
import AdminPayments from "./pages/AdminPayments";
import AdminTransactions from "./pages/AdminTransactions";
import AdminSettings from "./pages/AdminSettings";
import AdminCommissions from "./pages/AdminCommissions";
import AdminSupport from "./pages/AdminSupport";
import AdminReports from "./pages/AdminReports";
import AdminAnalytics from "./pages/AdminAnalytics";
import AdminNotifications from "./pages/AdminNotifications";
import AdminReviews from "./pages/AdminReviews";
import AdminPartners from "./pages/AdminPartners";
import AdminDisputes from "./pages/AdminDisputes";
import AdminAuditLogs from "./pages/AdminAuditLogs";

// Additional admin pages
import AdminPromotions from "./pages/AdminPromotions";
import AdminLocations from "./pages/AdminLocations";
import AdminCategories from "./pages/AdminCategories";
import AdminContent from "./pages/AdminContent";
import AdminFAQs from "./pages/AdminFAQs";
import AdminActivity from "./pages/AdminActivity";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC WEBSITE */}
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

        {/* CUSTOMER DASHBOARD */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/my-bookings/:id" element={<BookingDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/saved-vehicles" element={<SavedVehicles />} />
          <Route path="/payments" element={<Payments />} />
        </Route>

        {/* PARTNER DASHBOARD */}
        <Route element={<Layout />}>
          <Route path="/partner/dashboard" element={<PartnerDashboard />} />
          <Route path="/partner/add-vehicle" element={<AddVehicle />} />
          <Route path="/partner/vehicles" element={<PartnerVehicles />} />
          <Route path="/partner/bookings" element={<PartnerBookings />} />
          <Route path="/partner/earnings" element={<PartnerEarnings />} />
          <Route path="/partner/withdrawals" element={<PartnerWithdrawals />} />
        </Route>

        {/* ADMINISTRATION DASHBOARD */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />

          {/* Overview */}
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="reports" element={<AdminReports />} />
          <Route path="activity" element={<AdminActivity />} />

          {/* Platform management */}
          <Route path="users" element={<AdminUsers />} />
          <Route path="partners" element={<AdminPartners />} />
          <Route path="vehicles" element={<AdminVehicles />} />
          <Route path="bookings" element={<AdminBookings />} />
          <Route path="disputes" element={<AdminDisputes />} />

          {/* Fleet configuration */}
          <Route path="locations" element={<AdminLocations />} />
          <Route path="categories" element={<AdminCategories />} />

          {/* Finance */}
          <Route path="payments" element={<AdminPayments />} />
          <Route path="transactions" element={<AdminTransactions />} />
          <Route path="commissions" element={<AdminCommissions />} />
          <Route path="promotions" element={<AdminPromotions />} />

          {/* Website management */}
          <Route path="content" element={<AdminContent />} />

          {/* Customer engagement */}
          <Route path="reviews" element={<AdminReviews />} />
          <Route path="faqs" element={<AdminFAQs />} />
          <Route path="support" element={<AdminSupport />} />
          <Route path="notifications" element={<AdminNotifications />} />

          {/* System */}
          <Route path="audit-logs" element={<AdminAuditLogs />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}
