import { Sidebar } from "@/components/ui/sidebar";

export default function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex">
      <Sidebar />
      <div>{children}</div>
    </main>
  );
}
