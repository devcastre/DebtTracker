
import { BottomNav, Sidebar } from '@/src/app/components/SwitchingNavbar';


export default function UserLayout({ children }) {
  return (
    <>
      <Sidebar />
      {children}
      <BottomNav />
    </>
  );
}