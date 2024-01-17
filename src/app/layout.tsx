import type { Metadata } from 'next'
import './globals.css'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
export const metadata: Metadata = {
  title: 'SITE UI 4.0',
  description: 'The Standards Implementation and Testing Environment (SITE) is a centralized collection ' +
    'of testing tools and resources designed to assist health IT developers and health IT users fully ' +
    'evaluate specific technical standards and maximize the potential of their health IT implementations',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>

        <section>
          <header>*AppBar Component Placeholder*</header>
        </section>

        <section>
          <nav>*Nav Component Placeholder*</nav>
        </section>

        <AppRouterCacheProvider>{children}</AppRouterCacheProvider>

      </body>
    </html>
  )
}
