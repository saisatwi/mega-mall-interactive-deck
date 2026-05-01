import './globals.css';
import React from 'react';

export const metadata = {
  title: 'GRAND HORIZON | A New Era of Luxury',
  description: 'Experience the pinnacle of curated excellence.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}