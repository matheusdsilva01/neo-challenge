import { ReactNode } from 'react';
import StyledComponentsRegistry from '@/lib/styled-components/registry';
import ClientLayout from '@/lib/styled-components/client-layout';
import { StoreProvider } from './StoreProvider';
import { Header } from '@/components/components/Header';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Marvel Comics',
  description: 'Desafio Técnico utilizando API da Marvel',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <StyledComponentsRegistry>
          <StoreProvider>
              <Header />
              <ClientLayout>{children}</ClientLayout>
          </StoreProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
