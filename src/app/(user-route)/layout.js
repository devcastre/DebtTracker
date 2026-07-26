
import { BottomNav, Sidebar } from '@/src/components/SwitchingNavbar';


export default function UserLayout({ children }) {
  return (
    <>
      <Sidebar />
      {children}
      <BottomNav />
    </>
  );
}