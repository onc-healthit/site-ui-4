import { Container, List, ListItem, Typography, Card, CardContent, Box, TextField, Button } from '@mui/material'
import bulletedList from '../shared/BulletList'

const ValidateTab = () => {
  return (
    <>
      <Container>
        <Typography variant="h3" component={'h1'} sx={{ pl: 0, pt: 4, pb: 4 }}>
          Verify your system!
        </Typography>
        <List sx={bulletedList('disc')} dense>
          <ListItem sx={{ display: 'list-item' }}>
            <Typography variant="body2">
              In order to verify if your system is producing XDR messages per the IHE XDR profile used in the context of
              Direct Edge protocols.
            </Typography>
          </ListItem>
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
              <Typography variant="body2">Search for messages received by SITE by entering a From Address.</Typography>
            </ListItem>
            <ListItem sx={{ display: 'list-item' }}>
              <Typography variant="body2">
                Please note that SITE message logs are purged often and older messages may not be available.
              </Typography>
            </ListItem>
          </List>
        </List>
        <Card>
          <CardContent>
            <Box pb={4} component="form" width={'100%'} noValidate>
              <TextField
                sx={{ pb: 2 }}
                fullWidth
                id="from-address"
                name="fromAddress"
                label="Enter Message From Address"
                helperText="Direct messages will be accepted for validation only when the Direct (From) address is registered here."
              />
              <Button variant="contained" color="primary" size="large" type="submit">
                SEARCH
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </>
  )
}

export default ValidateTab