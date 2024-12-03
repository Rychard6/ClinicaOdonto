import { ReactNode } from 'react';
import Navbar from './Header'; // Ajuste o caminho para o seu componente Navbar

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <Navbar />
      <main className="p-4">{children}</main>
    </div>
  );
}
