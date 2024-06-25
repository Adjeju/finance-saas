import { Sidebar } from "@/components/ui/sidebar";

export default function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="grid min-h-screen w-full overflow-hidden lg:grid-cols-[200px_1fr]">
      <Sidebar />
      <div>{children}</div>
    </main>
  );
}
