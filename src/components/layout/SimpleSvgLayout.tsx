import React from 'react';
import { HexBackground } from '../shared/HexBackground';
import { Container } from '../ui/container';
import { Typography } from '../ui/typography';

const SimpleSvgLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div
      className="bg-background relative min-h-screen overflow-hidden"
      style={
        {
          '--color-background': '#fff',
          '--primary': '#3d63dd',
          '--slate-1': '#f8f9fa',
        } as React.CSSProperties
      }
    >
      <HexBackground />
      <header className="absolute z-10 py-4">
        <Container variant="full">
          <div className="flex items-end gap-0.5">
            <Typography variant="h3">Slotify</Typography>
            <div className="bg-primary h-2 w-2 -translate-y-2 rounded-full"></div>
          </div>
        </Container>
      </header>
      <main>
        <Container>
          <section className="relative z-10 flex min-h-screen flex-col items-center justify-center py-16">
            {children}
          </section>
        </Container>
      </main>
    </div>
  );
};

export default SimpleSvgLayout;
