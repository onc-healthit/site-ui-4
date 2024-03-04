import palette from '@/styles/palette'
import { Typography, List, ListItem, Box, Button, TextField } from '@mui/material'
import bulletedList from '../shared/BulletList'

const SendMessageDirect = () => {
  return (
    <>
      <Typography variant="body2">
        When you are part of the Direct Trust Production Bundle and would like to validate your Direct installation,
        send Direct messages to the end point listed below
      </Typography>
      <List sx={bulletedList('disc')}>
        <ListItem sx={{ display: 'list-item' }}>
          <Typography variant="body2">interop@direct.hhs.gov</Typography>
        </ListItem>
      </List>
      <Typography variant="body2">
        Upon successful receipt of the message, the Direct Transport Test Tool will send an MDN(Message Disposition
        Notification) back to the sender’s email address. The content of the message can be anything and is not
        validated or used by the SITE. To validate if a message was received from your test system, enter your Direct
        From address which you used to send the message below and search for messages. The test tool will display the
        last message received from the Direct From address entered if any exist.
      </Typography>

      <Box pt={4}>
        <Typography variant="body1" pb={2}>
          <strong>Verify your message was received</strong>
        </Typography>
        <TextField
          fullWidth
          id="DirectFromAddress"
          name="DirectFromAddress"
          label="Enter Message 'FROM' Address"
          helperText=""
          value={''}
          InputProps={{ type: 'email' }}
          sx={{ pb: 2 }}
        />
        <Button variant="contained" sx={{ color: palette.white }} type="submit">
          SEARCH
        </Button>
      </Box>
    </>
  )
}

export default SendMessageDirect
