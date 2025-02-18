import Navbar from "@/components/navbar";

export default function LoggedInLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header style={{ position: "sticky", top: 0, zIndex: 1 }}>
        <Navbar />
      </header>
      <main>{children}</main>
    </>
  );
}
