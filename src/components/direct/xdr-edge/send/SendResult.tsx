import { Box, Typography } from '@mui/material'
import palette from '@/styles/palette'
import ResultsComponent from '../ResultsComponent'
//import { Check } from '@mui/icons-material'
import ErrorIcon from '@mui/icons-material/Error'

interface ResultsComponentProps {
  response: ContentProps
  disabled?: boolean
  buttonTitle: string
}
type ContentProps = {
  success: boolean
  message: string
  payload: string
}
const Content = (response: ContentProps) => {
  return (
    <Box>
      {response.success && (
        <>
          <Box sx={{ width: '100%', flexDirection: 'row', gap: '16px', display: 'flex', p: 2 }}>
            <Box sx={{ width: '50%', flexDirection: 'column' }}>
              <Box mb={2}>
                <Typography>
                  <strong>Sent Message</strong>
                </Typography>
              </Box>
              <Box overflow={'auto'} p={2} bgcolor={'#E3F2FD64'} borderRadius={1} border={`1px solid #E3F2FD64`} mb={2}>
                <pre>{response.payload}</pre>
              </Box>
            </Box>
            <Box sx={{ width: '50%', flexDirection: 'column' }}>
              <Box mb={2}>
                <Typography>
                  <strong>Response</strong>
                </Typography>
              </Box>
              <Box overflow={'auto'} p={2} bgcolor={'#E3F2FD64'} borderRadius={1} border={`1px solid #E3F2FD64`} mb={2}>
                <pre>{response.message}</pre>
              </Box>
            </Box>
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
const ReceiveMessageSITEResults = ({ response, buttonTitle }: ResultsComponentProps) => {
  return (
    <ResultsComponent
      response={response}
      buttonTitle={buttonTitle}
      loadingDialogTitle={'Sending Message...'}
      loadingDialogContent={undefined}
      resultsDialogTitle={'XDR Message Results'}
      resultsDialogContent={
        <Content success={response.success} message={response.message} payload={response.payload} />
      }
    />
  )
}

export default ReceiveMessageSITEResults
