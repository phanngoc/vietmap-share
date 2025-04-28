import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VietMap Share - Thuê tài khoản VietMap Live",
  description: "Dịch vụ cho thuê tài khoản VietMap Live theo ngày với giá cả phải chăng",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <header className="bg-blue-600 text-white p-4">
          <div className="container mx-auto">
            <h1 className="text-2xl font-bold">VietMap Share</h1>
            <p className="text-sm">Dịch vụ cho thuê tài khoản VietMap Live</p>
          </div>
        </header>
        <main className="container mx-auto py-8 px-4">{children}</main>
        <footer className="bg-gray-100 p-4 mt-8">
          <div className="container mx-auto text-center text-sm text-gray-600">
            <p>© {new Date().getFullYear()} VietMap Share. Tất cả quyền được bảo lưu.</p>
            <p className="mt-2">Hỗ trợ: 0123.456.789 | Zalo: vietmapshare</p>
          </div>
        </footer>
      </body>
    </html>
  );
} 