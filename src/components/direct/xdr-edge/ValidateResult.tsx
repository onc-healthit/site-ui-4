import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import ResultsComponent from './ResultsComponent'
import { ExpandMore } from '@mui/icons-material'

interface ResultsComponentProps {
  response: MessagesProp[]
  disabled?: boolean
  buttonTitle: string
}
type MessagesProp = {
  id: number
  request: string
  response: string
  fromAddress: string
  dateLogged: string
}
const Content = ({ response }: { response: MessagesProp[] }) => {
  console.log(response)
  return (
    <Box>
      {response && (
        <>
          <Typography>Search Results for {response[0].fromAddress}</Typography>
          {response.map((message: MessagesProp) => (
            <Accordion key={message.id} slotProps={{ transition: { timeout: 300 } }}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography>Message recieved on: {message.dateLogged}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ width: '100%', flexDirection: 'row', gap: '16px', display: 'flex', p: 2 }}>
                  <Box sx={{ width: '50%', flexDirection: 'column' }}>
                    <Box mb={2}>
                      <Typography>
                        <strong>Sent Message</strong>
                      </Typography>
                    </Box>
                    <Box
                      overflow={'auto'}
                      p={2}
                      bgcolor={'#E3F2FD64'}
                      borderRadius={1}
                      border={`1px solid #E3F2FD64`}
                      mb={2}
                    >
                      <pre>{message.request}</pre>
                    </Box>
                  </Box>
                  <Box sx={{ width: '50%', flexDirection: 'column' }}>
                    <Box mb={2}>
                      <Typography>
                        <strong>Response</strong>
                      </Typography>
                    </Box>
                    <Box
                      overflow={'auto'}
                      p={2}
                      bgcolor={'#E3F2FD64'}
                      borderRadius={1}
                      border={`1px solid #E3F2FD64`}
                      mb={2}
                    >
                      <pre>{message.response}</pre>
                    </Box>
                  </Box>
                </Box>
              </AccordionDetails>
            </Accordion>
          ))}
        </>
      )}
    </Box>
  )
}
const ValidateResult = ({ response, buttonTitle }: ResultsComponentProps) => {
  return (
    <ResultsComponent
      response={response}
      buttonTitle={buttonTitle}
      loadingDialogTitle={'Sending Message...'}
      loadingDialogContent={undefined}
      resultsDialogTitle={'XDR Message Results'}
      resultsDialogContent={<Content response={response} />}
    />
  )
}

export default ValidateResult
