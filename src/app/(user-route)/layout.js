import { BottomNav, Sidebar } from '@/src/components/SwitchingNavbar';

export default function UserLayout({ children }) {
  return (
    <div className="flex h-dvh overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto w-dvw">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}