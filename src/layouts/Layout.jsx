
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <main className="min-h-screen bg-[#080D18] text-white">
      <Outlet />
    </main>
  );
}
