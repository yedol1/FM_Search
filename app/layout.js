import Head from './head'
import './styles/globals.css'
import './styles/reset.css'
export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}) {
  return (
    <html lang="en">
      <Head />
      <body>{children}</body>
    </html>
  )
}
