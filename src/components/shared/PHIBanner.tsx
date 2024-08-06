'use client'

import React, { useEffect, useState } from 'react'
import { Snackbar, Alert } from '@mui/material'
import palette from '@/styles/palette'

const PHIBanner: React.FC = () => {
  // State to control Snackbar visibility
  const [snackbarOpen, setSnackbarOpen] = useState(false)

  useEffect(() => {
    // Check if the Snackbar has been shown in the local storage
    const snackbarShown = localStorage.getItem('snackbarShown')

    if (!snackbarShown) {
      // Show Snackbar if it has not been shown yet
      setSnackbarOpen(true)
      // Mark Snackbar as shown in localStorage
      localStorage.setItem('snackbarShown', 'true')
    }
  }, [])

  const handleSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setSnackbarOpen(false)
  }

  return (
    <div style={{ display: 'flex' }}>
      <Snackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{
          left: '55%!important',
        }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="warning"
          sx={{ width: '100%', border: `1px solid ${palette.warning}` }}
        >
          The SITE tools do not retain your submitted files. However, we strongly suggest that you do not include any
          Protected Health Information (PHI) or Personally Identifiable Information (PII) in your file submissions
          within our tools.{' '}
          <a
            href="https://www.hhs.gov/hipaa/for-professionals/privacy/special-topics/de-identification/index.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Click here for more information
          </a>{' '}
          on how to de-identify PHI.
        </Alert>
      </Snackbar>
    </div>
  )
}

export default PHIBanner
