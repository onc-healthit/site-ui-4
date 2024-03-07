import React, { useState } from 'react'
import { Button, Box } from '@mui/material'
import dynamic from 'next/dynamic' // Import dynamic from next/dynamic

const Joyride = dynamic(() => import('react-joyride'), { ssr: false }) // Dynamically import Joyride

const TourButton: React.FC = () => {
  const [run, setRun] = useState(false)

  const handleClickStart = () => {
    setRun(true)
  }

  const steps = [
    {
      target: 'nav',
      content: 'Step 1: This is the first step.',
      styles: {
        options: {
          zIndex: 10000,
        },
        buttonNext: {
          backgroundColor: '#4caf50', // customize the next button color
        },
      },
    },
    {
      target: 'footer',
      content: 'Step 2: This is the second step.',
      styles: {
        options: {
          zIndex: 10000,
        },
        buttonBack: {
          backgroundColor: '#ff9800', // customize the back button color
        },
        buttonSkip: {
          backgroundColor: '#f44336', // customize the skip button color
        },
      },
    },
  ]

  return (
    <Box>
      <Joyride steps={steps} run={run} continuous showProgress showSkipButton />
      <Button color="secondary" variant="contained" onClick={handleClickStart}>
        Start Tour
      </Button>
    </Box>
  )
}

export default TourButton
