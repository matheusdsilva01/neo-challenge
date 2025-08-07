import { ReactNode } from 'react';
import StyledComponentsRegistry from '@/lib/styled-components/registry';
import ClientLayout from '@/lib/styled-components/client-layout';
import { StoreProvider } from './StoreProvider';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <StyledComponentsRegistry>
          <StoreProvider>
              <ClientLayout>{children}</ClientLayout>
          </StoreProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
