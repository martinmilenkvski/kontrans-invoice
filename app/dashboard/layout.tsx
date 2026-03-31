export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="font-space">
      {children}
    </div>
  );
}
