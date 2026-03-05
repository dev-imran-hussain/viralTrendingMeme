export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Sirf ek clean wrapper
    <div className="min-h-screen bg-[#F4F4F5]">
      {children}
    </div>
  );
}