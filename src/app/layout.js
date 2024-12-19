import "./globals.css";

export const metadata = {
  title: "Sandbox",
  description: "An app for testing React three Fiber",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={` antialiased`}>{children}</body>
    </html>
  );
}
