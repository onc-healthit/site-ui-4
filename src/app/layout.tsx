'use client'
import React from 'react'
// import type { Metadata } from 'next'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import lightThemeOptions from '../styles/lightThemeOptions'

const lightTheme = createTheme(lightThemeOptions)

// export const metadata: Metadata = {
//   title: 'SITE UI 4.0',
//   description: 'The Standards Implementation and Testing Environment (SITE) is a centralized collection ' +
//     'of testing tools and resources designed to assist health IT developers and health IT users fully ' +
//     'evaluate specific technical standards and maximize the potential of their health IT implementations',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
    </head>
      <body>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline>
        <section>
          <header>*AppBar Component Placeholder*</header>
        </section>

        <section>
          <nav>*Nav Component Placeholder*</nav>
        </section>

        <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
        </CssBaseline>
        </ThemeProvider>
      </body>
    </html>
  )
}
