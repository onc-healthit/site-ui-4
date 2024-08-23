import { Typography, List, ListItem, Box, TextField } from '@mui/material'
import bulletedList from '../shared/BulletList'
import { useState } from 'react'
import { handleSearchSITEInbox } from './actions'
import { useFormState } from 'react-dom'
import SendMessageResults from './SendMessageResults'

const SendMessageSITE = () => {
  const [fromAddress, SetFromAddress] = useState('')
  const [data, handleSubmit] = useFormState(handleSearchSITEInbox, { response: {} })
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    SetFromAddress(value)
  }
  return (
    <>
      <Typography variant="body2">
        When you exchanged your Trust Anchors with SITE and want to validate your Direct installation, send Direct
        messages to the end point listed below
      </Typography>
      <List sx={bulletedList('disc')}>
        <ListItem sx={{ display: 'list-item' }}>
          <Typography variant="body2">provider1@direct.site.healthit.gov</Typography>
        </ListItem>
      </List>
      <Typography variant="body2">
        {
          "Upon successful receipt of the message, the Direct Transport Test Tool will send an MDN(Message Disposition Notification) back to the sender's email address. The content of the message can be anything and is not validated or used by the SITE. To validate if a message was received from your test system, enter your Direct From address which you used to send the message below and search for messages. The test tool will display the last message received from the Direct From address entered if any exist."
        }
      </Typography>
      <form action={handleSubmit}>
        <Box pt={4}>
          <Typography variant="body1" pb={2}>
            <strong>Verify your message was received</strong>
          </Typography>
          <TextField
            fullWidth
            id="SITEFromAddress"
            name="fromAddress"
            label="Enter Message 'FROM' Address"
            helperText=""
            value={fromAddress}
            InputProps={{ type: 'email' }}
            sx={{ pb: 2 }}
            onChange={handleChange}
          />
          <SendMessageResults response={data?.response} buttonTitle={'SEARCH'} fromAddress={fromAddress} />
        </Box>
      </form>
    </>
  )
}

export default SendMessageSITE