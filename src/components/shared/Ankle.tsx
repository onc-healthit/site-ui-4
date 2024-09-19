'use client'
import palette from '@/styles/palette'
import { Box, Container, Typography } from '@mui/material'
import Link from 'next/link'

interface GtagOptions {
  event_category: string
  event_label: string
  // Add more properties if needed
}

declare global {
  interface Window {
    gtag?: (key: string, type: string, options: GtagOptions) => void
  }
}

export default function Ankle() {
  const ClickDocumentationAnkle = () => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'Go to Docs', {
        event_category: 'Link',
        event_label: 'Go to Docs thru ankle',
      })
    }
  }
  const ClickArchivedAnkle = () => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'Go to Archived', {
        event_category: 'Link',
        event_label: 'Go to Archived thru ankle',
      })
    }
  }
  return (
    <Box bgcolor="#122953" boxShadow={'0px -4px 20px 20px rgb(0, 0, 0, 0.15)'} pt={4} pb={4}>
      <Container>
        <Typography variant="h5" color="#fff" component={'h2'}>
          <strong>Can't find what your looking for?</strong>
        </Typography>
        <Typography variant="body1" color="#fff">
          Please checkout our{' '}
          <Link onClick={ClickDocumentationAnkle} style={{ color: palette.white }} href="/docs" passHref>
            Documentation
          </Link>{' '}
          or{' '}
          <Link onClick={ClickArchivedAnkle} style={{ color: palette.white }} href="/archived" passHref>
            Archived
          </Link>
          {' section '}
          for more details.
        </Typography>
      </Container>
    </Box>
  )
}
