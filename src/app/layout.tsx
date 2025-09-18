import Link from "next/link";
import "@/app/globals.css";

export default function RootLayout({children}: { children: React.ReactNode }) {
  return (
    <html lang="en">
    <body>
    <header className="flex items-center justify-end h-30 bg-blue-200 p-4">
      <nav className="text-white font-bold p-4">
        <Link href="/">Home</Link> | <Link href="/about">About</Link> | <Link href="/login">Login</Link> |
        <Link href="/profile">Profile</Link> | <Link href="/walking">Walking</Link>
      </nav>
    </header>
    <main>{children}</main>
    <footer>© 2025 My Website</footer>
    </body>
    </html>
  )
}
