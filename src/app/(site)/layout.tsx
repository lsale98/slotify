import SimpleSvgLayout from '@/components/layout/SimpleSvgLayout';

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SimpleSvgLayout>{children}</SimpleSvgLayout>;
}
