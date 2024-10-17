import React, { useState } from 'react'
import { Button, Box } from '@mui/material'
import dynamic from 'next/dynamic' // Import dynamic from next/dynamic
import palette from '@/styles/palette'
import { CallBackProps } from 'react-joyride'

const Joyride = dynamic(() => import('react-joyride'), { ssr: false }) // Dynamically import Joyride

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
const TourButton: React.FC = () => {
  const [run, setRun] = useState(false)

  const handleClickStart = () => {
    // Google Analytics event tracking
    setRun(true) // Reset the run state
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'Start Tour', {
        event_category: 'Button',
        event_label: 'Start Tour',
      })
    }
  }
  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data

    if (status === 'finished' || status === 'skipped') {
      if (window.gtag && typeof window.gtag === 'function') {
        window.gtag('event', 'End Tour', {
          event_category: 'Button',
          event_label: status === 'finished' ? 'Tour Finished' : 'Tour Skipped',
        })
      }
      setRun(false) // Reset the run state
    }
  }
  const steps = [
    {
      target: '#site-nav-onc-cert-tools',
      content:
        'ASTP has curated the content for the left navigation on their website to provide users with easy access to the most relevant and valuable pages.',
      placement: 'right' as const,
      styles: {
        options: {
          zIndex: 10000,
        },
        buttonNext: {
          backgroundColor: palette.secondary, // customize the next button color
        },
      },
      disableBeacon: true,
    },
    {
      target: '#site-nav-general-tools',
      content:
        'ONC has curated the content for the left navigation on their website to provide users with easy access to the most relevant and valuable pages.',
      placement: 'right' as const,
      styles: {
        options: {
          zIndex: 10000,
        },
        buttonNext: {
          backgroundColor: palette.secondary, // customize the next button color
        },
      },
      disableBeacon: true,
    },
    {
      target: '#site-nav-industry-testing',
      content:
        'ASTP has curated the content for the left navigation on their website to provide users with easy access to the most relevant and valuable pages.',
      placement: 'right' as const,
      styles: {
        options: {
          zIndex: 10000,
        },
        buttonNext: {
          backgroundColor: palette.secondary, // customize the next button color
        },
      },
      disableBeacon: true,
    },
    {
      target: '#communication-Fab',
      content:
        'ASTP has curated the content for the left navigation on their website to provide users with easy access to the most relevant and valuable pages.',
      placement: 'top' as const,
      styles: {
        options: {
          zIndex: 20000,
        },
        buttonBack: {
          backgroundColor: palette.greyLight, // customize the back button color
          color: palette.greyDark,
        },
        buttonSkip: {
          backgroundColor: palette.secondary, // customize the skip button color
        },
        buttonNext: {
          backgroundColor: palette.secondary, // customize the skip button color
        },
      },
      disableBeacon: true,
    },
  ]

  return (
    <Box>
      <Joyride
        steps={steps}
        run={run}
        continuous
        showProgress
        showSkipButton
        callback={handleJoyrideCallback}
        styles={{
          options: {
            primaryColor: palette.secondary,
            zIndex: 1003,
          },
          tooltipContainer: {
            lineHeight: 1.4,
            textAlign: 'left' as const,
          },
        }}
      />
      <Button size="small" color="secondary" variant="contained" onClick={handleClickStart}>
        Start Tour
      </Button>
    </Box>
  )
}

export default TourButton
