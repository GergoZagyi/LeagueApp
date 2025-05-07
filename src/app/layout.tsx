import type { Metadata } from "next";
import "./global.css";
export const metadata: Metadata = {
  title: "League Profile Showcase",
  description: "Show off your League of Legends profile with style.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}