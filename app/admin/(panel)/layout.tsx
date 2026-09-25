import { redirect } from "next/navigation";
import { getAuthenticatedUser } from "@/lib/api-auth";
import AdminPanelShell from "@/components/AdminPanelShell";

export default async function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  const user = await getAuthenticatedUser();
  if (!user || user.role !== "admin") redirect("/admin/login");
  return <AdminPanelShell>{children}</AdminPanelShell>;
}
