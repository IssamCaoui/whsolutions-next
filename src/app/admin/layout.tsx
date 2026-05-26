// src/app/admin/layout.tsx
// Fixed positioning covers the public Navbar/Footer from the root layout
import type { Metadata } from "next";
import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata: Metadata = {
  title: { default: "Admin - WH Solutions", template: "%s | Admin WH" },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-[500] flex bg-[#04091A] overflow-hidden">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
