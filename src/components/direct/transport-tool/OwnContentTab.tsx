import DragandDropFile from '@/components/shared/DragandDropFile'
import palette from '@/styles/palette'
import { Box, TextField, Stack, Typography, Button } from '@mui/material'

const OwnContentTab = () => {
  return (
    <Box p={2}>
      <TextField
        fullWidth
        id="ownEndpointName"
        label="Enter Your Endpoint Name"
        helperText="Recipient Direct email address"
        sx={{ pb: 4 }}
      />
      <Box pb={4}>
        <Stack direction="row" alignItems="flex-start" gap={1}>
          <Typography gutterBottom variant="body1">
            <strong>Select a Local C-CDA File to Send:</strong>
          </Typography>
        </Stack>
        <DragandDropFile />
      </Box>
      <Button variant="contained" sx={{ color: palette.white }} type="submit">
        SEND MESSAGE
      </Button>
    </Box>
  )
}

export default OwnContentTab
