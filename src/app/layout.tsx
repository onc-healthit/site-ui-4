import Ankle from '@/components/shared/Ankle'
import Footer from '@/components/shared/Footer'
import CombinedNavAndAppBar from '@/components/shared/nav/CombinedNavAndAppBar'
import { lightTheme } from '@/styles/lightTheme'
import { CssBaseline, ThemeProvider, Box } from '@mui/material'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import type { Metadata } from 'next'
import React from 'react'
import Script from 'next/script'
import SessionProvider from '@/components/SessionProvider'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export const metadata: Metadata = {
  title: 'SITE',
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
  pt: '58px',
}

const footer = {
  marginTop: 'auto',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)
  return (
    <html lang="en">
      <head>
        <Script async strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-ZSC2EVZSVD" />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-ZSC2EVZSVD');
            `,
          }}
        />
      </head>
      <body>
        <SessionProvider session={session}>
          <ThemeProvider theme={lightTheme}>
            <CssBaseline>
              <AppRouterCacheProvider>
                <Box sx={content}>
                  <CombinedNavAndAppBar />
                  <Box role="main" sx={pageContainer}>
                    {children}
                    <Box sx={footer}>
                      <Ankle />
                      <Footer />
                    </Box>
                  </Box>
                </Box>
              </AppRouterCacheProvider>
            </CssBaseline>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
