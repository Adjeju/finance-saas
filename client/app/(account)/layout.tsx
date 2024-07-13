import { Sidebar } from "@/components/shared/sidebar";

export default function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="grid min-h-screen w-full overflow-hidden grid-cols-[200px_1fr]">
      <Sidebar />
      {children}
    </main>
  );
}
