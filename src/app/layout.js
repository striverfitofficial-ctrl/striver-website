import "./globals.css";
import ScrollReveal from "../components/ScrollReveal/ScrollReveal";
import { AuthProvider } from "@/context/AuthContext";

export const metadata = {
  title: "Striverfit — Elevate Your Personal Fitness",
  description:
    "Premium smart fitness equipment for India. Adaptive resistance technology, real-time workout tracking, and compact home training solutions.",
  keywords: "fitness equipment, smart gym, adaptive resistance, home training, India",
  openGraph: {
    title: "Striverfit — Elevate Your Personal Fitness",
    description: "Premium smart fitness equipment for India.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ScrollReveal />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
