import { Header } from '@/components/common/Header';
import { GuestModeDialog } from '@/components/common/GuestModeDialog';
import { ChatProvider } from '@/hooks/use-chat';
import { ChatWidget } from '@/components/chat/ChatWidget';

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ChatProvider>
      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
        <GuestModeDialog />
        <Header />
        <main className="flex-1">
          <div className="container py-8">{children}</div>
        </main>
        <footer className="py-6 border-t bg-secondary/50">
          <div className="container text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} EduPath Navigator. All rights reserved.
          </div>
        </footer>

        {/* AI Chatbot Widget */}
        <ChatWidget />
      </div>
    </ChatProvider>
  );
}
