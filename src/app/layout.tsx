import Link from "next/link";

export default function RootLayout({children}: { children: React.ReactNode }) {
  return (
    <html lang="en">
    <body>
    <header>
      <nav>
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
