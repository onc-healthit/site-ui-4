import { Container, List, ListItem, Typography, Card, CardContent, Box, TextField } from '@mui/material'
import bulletedList from '../shared/BulletList'
import { useFormState } from 'react-dom'
import { handleMessageValidation } from './actions'
import ValidateResult from './ValidateResult'
import palette from '@/styles/palette'

const ValidateTab = () => {
  const [data, handleSubmit] = useFormState(handleMessageValidation, { response: {} })

  return (
    <>
      <Container>
        <Box sx={{ borderRadius: '4px', bgcolor: 'white', my: 4, p: 2, border: `1px solid ${palette.greyLight}` }}>
          <Typography variant="h3" component={'h1'} sx={{ pl: 2, pb: 2 }}>
            Verify your system!
          </Typography>
          <Typography sx={{ pl: 2 }} variant="body2">
            In order to verify if your system is producing XDR messages per the IHE XDR profile used in the context of
            Direct Edge protocols.
          </Typography>
          <List sx={bulletedList('disc')} dense>
            <List sx={bulletedList('disc')} dense>
              <ListItem sx={{ display: 'list-item' }}>
                <Typography variant="body2">
                  Send a message to http://ccda.healthit.gov/xdrmessagevalidator/Dispatcher/XDRService.wsdl.
                </Typography>
              </ListItem>
              <ListItem sx={{ display: 'list-item' }}>
                <Typography variant="body2">
                  Successful processing of the message will give you a &quot;Success&quot; message.
                </Typography>
              </ListItem>
              <ListItem sx={{ display: 'list-item' }}>
                <Typography variant="body2">Any errors will be provided as a validation report.</Typography>
              </ListItem>
              <ListItem sx={{ display: 'list-item' }}>
                <Typography variant="body2">
                  Search for messages received by SITE by entering a From Address.
                </Typography>
              </ListItem>
              <ListItem sx={{ display: 'list-item' }}>
                <Typography variant="body2">
                  Please note that SITE message logs are purged often and older messages may not be available.
                </Typography>
              </ListItem>
            </List>
          </List>
        </Box>
        <Card>
          <CardContent>
            <form action={handleSubmit}>
              <Box pb={4} width={'100%'}>
                <TextField
                  sx={{ pb: 2 }}
                  fullWidth
                  id="from-address"
                  name="fromAddress"
                  label="Enter Message From Address"
                />
                <ValidateResult response={data?.response} buttonTitle={'SEARCH'} />
              </Box>
            </form>
          </CardContent>
        </Card>
      </Container>
    </>
  )
}

export default ValidateTab
