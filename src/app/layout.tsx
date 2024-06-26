import Ankle from '@/components/shared/Ankle'
import Footer from '@/components/shared/Footer'
import CombinedNavAndAppBar from '@/components/shared/nav/CombinedNavAndAppBar'
import { lightTheme } from '@/styles/lightTheme'
import { CssBaseline, ThemeProvider, Box } from '@mui/material'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'SITE UI 4.0',
  description:
    'The Standards Implementation and Testing Environment (SITE) is a centralized collection ' +
    'of testing tools and resources designed to assist health IT developers and health IT users fully ' +
    'evaluate specific technical standards and maximize the potential of their health IT implementations',
}

const content = {
  display: 'flex',
}

const pageContainer = {
  width: '100%',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  pt: 8,
}

const footer = {
  marginTop: 'auto',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={lightTheme}>
          <CssBaseline>
            <AppRouterCacheProvider>
              <Box sx={content}>
                <CombinedNavAndAppBar />
                <Box role="main" sx={pageContainer}>
                  {children}
                  <Box sx={footer}>
                    {/* Global Ankle */}
                    <Ankle />
                    {/* Global Footer */}
                    <Footer />
                  </Box>
                </Box>
              </Box>
            </AppRouterCacheProvider>
          </CssBaseline>
        </ThemeProvider>
      </body>
    </html>
  )
}
