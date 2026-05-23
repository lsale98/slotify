import SimpleSvgLayout from '@/components/layout/SimpleSvgLayout';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SimpleSvgLayout>{children}</SimpleSvgLayout>;
}
