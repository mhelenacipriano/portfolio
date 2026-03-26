import "./globals.css";

export const metadata = {
  title: "Maria Helena | Portfolio",
  description: "Frontend Engineer - Retro DOS Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
