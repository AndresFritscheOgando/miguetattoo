import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen">
            <SidebarProvider>
                <AppSidebar />
                <main className="flex-1">{children}</main>
            </SidebarProvider>
        </div>
    );
}