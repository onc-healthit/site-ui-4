import { Box, Button, Divider, Typography } from '@mui/material'
import _ from 'lodash'

import ErrorDisplayCard from '@/components/c-cda/validation/results/ErrorDisplay'
import { useFormStatus } from 'react-dom'
import { useState, useEffect } from 'react'
import { CircularProgress } from '@mui/material'
import palette from '@/styles/palette'
import { Check } from '@mui/icons-material'
import ErrorIcon from '@mui/icons-material/Error'
interface ResultsComponentProps {
  response: ContentProps
  disabled?: boolean
  buttonTitle: string
}
type ContentProps = {
  result?: boolean
  message?: string
  error?: string
  errorStatus?: number
}
const SendDirectResults = ({ response, buttonTitle, disabled }: ResultsComponentProps) => {
  const [errorOpen, setErrorOpen] = useState(false)
  const { pending } = useFormStatus()

  const handleErrorClose = () => {
    setErrorOpen(false)
  }

  useEffect(() => {
    if (!pending && _.has(response, 'error')) {
      setErrorOpen(true)
    }
  }, [pending, response])

  return (
    <>
      <Button type="submit" variant="contained" disabled={pending || disabled}>
        {pending ? <CircularProgress size={24} /> : buttonTitle}
      </Button>

      {!pending && _.has(response, 'error') && (
        <ErrorDisplayCard open={errorOpen} handleClose={handleErrorClose} response={response} />
      )}

      {!pending && !_.has(response, 'error') && !_.isEmpty(response) && (
        <Box py={2}>
          <Divider />

          {response.result && (
            <Box borderRadius={1} border={`1px solid ${palette.success}`}>
              <Box
                sx={{ width: '100%', flexDirection: 'row', gap: '16px', display: 'flex', alignItems: 'center', p: 2 }}
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
                <Typography variant="h4">Message successfully sent!</Typography>
              </Box>
            </Box>
          )}
          {response.result === undefined && (
            <Box borderRadius={1} border={`1px solid ${palette.error}`}>
              <Box
                sx={{ width: '100%', flexDirection: 'row', gap: '16px', display: 'flex', alignItems: 'center', p: 2 }}
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
                <Typography variant="h4">Message failed to be sent!</Typography>
              </Box>
              <Box>
                <pre>{response.message}</pre>
              </Box>
            </Box>
          )}
        </Box>
      )}
    </>
  )
}

export default SendDirectResults
