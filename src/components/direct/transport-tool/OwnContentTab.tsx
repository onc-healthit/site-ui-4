import DragandDropFile from '@/components/shared/DragandDropFile'
import { Box, TextField, Stack, Typography } from '@mui/material'
import { handleSendMessageWithAttachmentFile } from './actions'
import { useState } from 'react'
import { useFormState } from 'react-dom'
import OwnContentResults from './ReceiveMessageSITEResults'

const OwnContentTab = () => {
  const [endpointName, setEndpointName] = useState('')
  const [data, handleSubmit] = useFormState(handleSendMessageWithAttachmentFile, { response: {} })
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setEndpointName(value)
  }
  return (
    <form action={handleSubmit}>
      <Box p={2}>
        <TextField
          fullWidth
          id="ownEndpointName"
          label="Enter Your Endpoint Name"
          helperText="Recipient Direct email address"
          sx={{ pb: 4 }}
          name="toAddress"
          value={endpointName}
          onChange={handleChange}
          type="email"
        />
        <Box pb={4}>
          <Stack direction="row" alignItems="flex-start" gap={1}>
            <Typography gutterBottom variant="body1">
              <strong>Select a Local C-CDA File to Send:</strong>
            </Typography>
          </Stack>
          <DragandDropFile maxFiles={1} name="attachment" />
        </Box>
        <OwnContentResults response={data?.response} buttonTitle={'SEND MESSAGE'} />
      </Box>
    </form>
  )
}

export default OwnContentTab
