// app/layout.tsx
import { ReactNode } from 'react';

export const metadata = {
  title: '21BRS1490', 
  description: 'Fullstack Challenge Frontend',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
