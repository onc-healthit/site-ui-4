'use client'

import palette from '@/styles/palette'
import { lightTheme } from '@/styles/lightTheme'
import { Box, Button, ButtonGroup, Container, ThemeProvider, Typography, Fade } from '@mui/material'
import React from 'react'
import { Inter } from 'next/font/google'
import Image from 'next/image'
import ONCLogo from '@public/shared/LogoBackgroundImage.png'

// Load the Inter font
const inter = Inter({ subsets: ['latin'] })

export default function NotFound() {
  return (
    <>
      <Box height={'90vh'} sx={{ position: 'relative' }}>
        <Image
          style={{
            backgroundSize: 'fit',
            backgroundRepeat: 'no-repeat',
            background: `linear-gradient(to bottom right, ${palette.greyLight} 0%, ${palette.grey} 75%)`, // Gradient with percentage stops
            top: 0,
            left: 0,
            position: 'absolute',
            zIndex: -1,
            overflowX: 'clip',
            width: '100%',
            height: '100%',
            objectFit: 'scale-down',
            objectPosition: 'right',
          }}
          src={ONCLogo}
          alt="ONC Logo"
          loading="lazy"
        />
        <Container maxWidth="lg">
          <ThemeProvider theme={lightTheme}>
            <Box
              position={'fixed'}
              top={164}
              color={palette.primary}
              fontFamily={inter.style.fontFamily}
              textAlign="left"
            >
              <Box>
                <Typography variant="h1" fontSize={'3em'} fontWeight={600}>
                  Page Not Found
                </Typography>
                <Typography gutterBottom variant="body1">
                  We ran into a problem.
                </Typography>
              </Box>
              <Fade in={true} timeout={400}>
                <Box>
                  <Typography sx={{ mt: 4 }} variant="h4">
                    Here’s some tips to help you out.
                  </Typography>
                  <ul>
                    <li>Try reloading the page.</li>
                    <li>Use the navigation on the left hand side to move to a different page.</li>
                    <li>If error still occurs, please contact us.</li>
                  </ul>
                </Box>
              </Fade>
              <Fade in={true} timeout={500}>
                <ButtonGroup sx={{ mt: 8, color: palette.primary }}>
                  <Button onClick={() => window.location.reload()} variant="outlined" color="inherit">
                    Reload Page
                  </Button>
                  <Button
                    href="https://site.healthit.gov/"
                    variant="outlined"
                    target="_blank"
                    rel="noopener noreferrer"
                    color="inherit"
                  >
                    Go to Home Page
                  </Button>
                  <Button color="inherit" href="mailto:edge-test-tool@googlegroups.com" variant="outlined">
                    Contact Us
                  </Button>
                </ButtonGroup>
              </Fade>
            </Box>
          </ThemeProvider>
        </Container>
      </Box>
    </>
  )
}
