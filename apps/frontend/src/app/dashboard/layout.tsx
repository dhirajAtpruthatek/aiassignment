import { SocketProvider } from '../../lib/provider/socket-provider';
import SideBar from './_components/sidebar/SideBar';
import TitleBar from './_components/titlebar/TitleBar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SocketProvider>
      <div className="h-screen flex gradientBg  relative w-screen">
        <SideBar />

        <div className="flex-1 flex flex-col   h-full overflow-hidden">
          <TitleBar />

          <main className="flex-1 overflow-auto hide-scrollbar">
            {children}
          </main>
        </div>
      </div>
    </SocketProvider>
  );
}
