import { Box, Button, Typography } from '@mui/material'
import _ from 'lodash'

import ErrorDisplayCard from '@/components/c-cda/validation/results/ErrorDisplay'
import { useFormStatus } from 'react-dom'
import { useState, useEffect } from 'react'
import { CircularProgress } from '@mui/material'
import palette from '@/styles/palette'
import { Check } from '@mui/icons-material'
import ErrorIcon from '@mui/icons-material/Error'
import eventTrack from '@/services/analytics'

interface ResultsComponentProps {
  response: ContentProps
  disabled?: boolean
  buttonTitle: string
}
type ContentProps = {
  success: boolean
  message: string
  uploadedTrustAnchorFileName: string
  error?: string
  errorStatus?: number
}
const TrustAnchorResults = ({ response, buttonTitle }: ResultsComponentProps) => {
  const [resultsOpen, setResultsOpen] = useState(false)
  const [errorOpen, setErrorOpen] = useState(false)
  const { pending } = useFormStatus()
  const trackSubmitClick = () => {
    eventTrack('Submit Anchor', 'Transport Test Tool', 'Trust Anchor Exchange Instructions')
  }
  const handleErrorClose = () => {
    setErrorOpen(false)
  }

  const handleResultsOpen = () => {
    setResultsOpen(false)
  }

  useEffect(() => {
    if (!pending && !_.isEmpty(response) && !_.has(response, 'error')) {
      setResultsOpen(true)
    }
    if (!pending && _.has(response, 'error')) {
      setErrorOpen(true)
    }
  }, [pending, response])

  return (
    <>
      <Button onClick={trackSubmitClick} type="submit" variant="contained" disabled={pending}>
        {pending ? <CircularProgress size={24} /> : buttonTitle}
      </Button>

      {!pending && _.has(response, 'error') && (
        <ErrorDisplayCard open={errorOpen} handleClose={handleErrorClose} response={response} />
      )}

      {!pending && !_.has(response, 'error') && !_.isEmpty(response) && (
        <Box py={2}>
          {response.success && (
            <Box
              sx={{ width: '100%', flexDirection: 'row', gap: '16px', display: 'flex', alignItems: 'center', p: 2 }}
              borderRadius={1}
              border={`1px solid ${palette.success}`}
            >
              <Check
                fontSize="large"
                sx={{
                  color: palette.success,
                  transition: 'transform 0.3s ease-in-out',
                  transform: 'scale(1)',
                  '&:hover': {
                    transform: 'scale(1.2)',
                  },
                }}
              />
              <Box>
                <Typography>{response.message}</Typography>
              </Box>
            </Box>
          )}
          {!response.success && (
            <Box
              sx={{ width: '100%', flexDirection: 'row', gap: '16px', display: 'flex', alignItems: 'center', p: 2 }}
              borderRadius={1}
              border={`1px solid ${palette.error}`}
            >
              <ErrorIcon
                fontSize="large"
                sx={{
                  color: palette.error,
                  transition: 'transform 0.3s ease-in-out',
                  transform: 'scale(1)',
                  '&:hover': {
                    transform: 'scale(1.2)',
                  },
                }}
              />
              <Box>
                <Typography>{response.message}</Typography>
              </Box>
            </Box>
          )}
        </Box>
      )}
    </>
  )
}

export default TrustAnchorResults
