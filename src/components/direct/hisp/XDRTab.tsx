import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import XDRTestCard from '@components/direct/hisp/XDRTestCard'
const XDR = () => {
  const [option, setOption] = React.useState('')
  const [showTestCard, setShowTestCard] = React.useState(false)
  const handleChange = (event: SelectChangeEvent) => {
    setOption(event.target.value as string)
  }

  useEffect(() => {
    if (option !== '') {
      setShowTestCard(true)
    }
  }, [option])
  const dropdown = [
    {
      value: 'Sender',
      label: 'Sender',
    },
    {
      value: 'Reciever',
      label: 'Reciever',
    },
  ]
  return (
    <Container>
      <Box pt={4}>
        <Typography variant="h3">
          Select sender or receiver for your system & fill in the additional fields to get started.{' '}
        </Typography>
      </Box>
      <Box display={'flex'} flexDirection={'row'} gap={4} py={4}>
        <Box width={'40%'}>
          <Card>
            <CardContent>
              <FormControl fullWidth>
                <InputLabel id="select-label">Choose a sender or reciever to see the test </InputLabel>
                <Select
                  labelId="select-label"
                  id="select"
                  value={option}
                  label="Choose a sender or reciever to see the test"
                  onChange={handleChange}
                >
                  {dropdown.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </CardContent>
          </Card>
        </Box>
        <Box gap={4} display={'flex'} flexDirection={'column'} width={'60%'}>
          {showTestCard && (
            <XDRTestCard
              cardHeader={'SMTP MT Test 39 (Message with Good Header)'}
              cardContent={
                'Verify the ability of the system to properly process the Disposition-Notifications-Options Header. Hitting Run will cause ETT to send a message with a well-formed Disposition-Notifications-Options Header. If the message is sent successfully. Check MDN will appear. Clicking that will check for the expected Processed and Dispatched MDN (Note that you may have to click multiple times due to lag.) The expected result is a Processed and Dispatched MDN. The selection of a file is optional, if the system requires clinical information with the message.'
              }
            />
          )}
          {showTestCard && (
            <XDRTestCard
              cardHeader={'SMTP MT Test 40 (Message with Bad Header)'}
              cardContent={
                'Verify the ability of the system to process an invalid Disposition-Notifications-Options Header. Hitting Run will cause ETT to send a message with an incorrect Disposition-Notifications-Options Header. If the message is sent successfully. Check MDN will appear. Clicking that will check for the expected Processed MDN (Note that you may have to click multiple times due to lag.) The expected result is that the Vendor will be able to process the invalid Disposition-Notifications-Options Header and respond with a Processed MDN. Optionally, the test will accommodate systems that also respond with a Dispatched MDN--however the Dispatched MDN must NOT contain the X-DIRECT-FINAL-DESTINATION-DELIVERY header to pass. The selection of a file is optional, if the system requires clinical information with the message.'
              }
            />
          )}
          {showTestCard && (
            <XDRTestCard
              cardHeader={'SMTP MT Test 41 (Unable to deliver)'}
              cardContent={
                'Verifies the ability of the sending system to send an email to ETT using the SMTP protocol with STARTTLS. The SUT will send an email to edge-receiver@james.healthit.gov. Hitting "Run" will cause ETT to search for an email sent to edge-receiver@james.healthit.gov from the email address entered in Profile window. Note that the C-CDA Document Type selected will not affect the test result.'
              }
            />
          )}
        </Box>
      </Box>
    </Container>
  )
}

export default XDR
