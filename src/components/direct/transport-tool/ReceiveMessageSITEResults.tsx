import { Box, Typography } from '@mui/material'
import palette from '@/styles/palette'
import ResultsComponent from './ResultsComponent'
import { Check } from '@mui/icons-material'
import ErrorIcon from '@mui/icons-material/Error'

interface ResultsComponentProps {
  response: ContentProps
  disabled?: boolean
  buttonTitle: string
}
type ContentProps = {
  success: boolean
  message: string
}
const Content = (response: ContentProps) => {
  return (
    <Box>
      {response.success && (
        <>
          <Box sx={{ width: '100%', flexDirection: 'row', gap: '16px', display: 'flex', alignItems: 'center', p: 2 }}>
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
              <Typography>
                <strong>Sent Message</strong>
              </Typography>
            </Box>
          </Box>
          <Box>
            <Typography>{response.message}</Typography>
          </Box>
        </>
      )}
      {!response.success && (
        <>
          <Box sx={{ width: '100%', flexDirection: 'row', gap: '16px', display: 'flex', alignItems: 'center', pb: 2 }}>
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
              <Typography>
                <strong>Failed</strong>
              </Typography>
            </Box>
          </Box>
          <Box>
            <Typography>{response.message}</Typography>
          </Box>
        </>
      )}
    </Box>
  )
}
const ReceiveMessageSITEResults = ({ response, disabled, buttonTitle }: ResultsComponentProps) => {
  return (
    <ResultsComponent
      response={response}
      buttonTitle={buttonTitle}
      loadingDialogTitle={'Sending Message...'}
      loadingDialogContent={undefined}
      resultsDialogTitle={'Message Delivery'}
      resultsDialogContent={<Content success={response.success} message={response.message} />}
    />
  )
}

export default ReceiveMessageSITEResults
