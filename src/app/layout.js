import "./globals.css";

export const metadata = {
  title: "Room-xr",
  description: "Room Configurator in WebXR",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={` antialiased`}>{children}</body>
    </html>
  );
}
