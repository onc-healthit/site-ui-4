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
      content: (
        <>
          The left navigation panel has been streamlined for easy access to tools and resources available on SITE. These
          are organized into three main categories: ONC Certification Tools, General Testing Tools, and Industry
          Resources.
          <br />
          <br />
          The ONC Certification Tools section includes everything required for ONC Certification.
        </>
      ),
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
        'General Testing Tools are conveniently grouped to support users in conducting various tests efficiently.',
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
        "Industry Resources offer links to key references such as HL7 standards, FHIR Implementation Guides, MITRE's GitHub repositories, and additional essential materials.",
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
        'The Information panel provides valuable details about SITE, including announcements, release notes, a link to the Google Group forum, and contact information for questions or inquiries.',
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
