import Navbar from "@/components/navs/Navbar";
import { CSSProperties } from "react";

const headerStyle = {
  position: "sticky",
  top: 0,
  zIndex: 1,
} satisfies CSSProperties;

export default function LoggedInLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header style={headerStyle}>
        <Navbar />
      </header>
      <main>{children}</main>
    </>
  );
}
