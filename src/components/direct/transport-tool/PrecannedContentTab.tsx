import palette from '@/styles/palette'
import { Box, TextField, Button, MenuItem } from '@mui/material'

const fileDropdown = [
  {
    value: ' ',
    label: 'select one',
  },
]

const PrecannedContentTab = () => {
  return (
    <Box p={2}>
      <TextField
        fullWidth
        id="precannedEndpointName"
        label="Enter Your Endpoint Name"
        helperText="Recipient Direct email address"
        sx={{ pb: 4 }}
      />

      <TextField
        fullWidth
        id="selectCCDAFile"
        name="ccdaFile"
        select
        label="Select a Precanned Sample C-CDA File to Send"
        helperText=""
        sx={{ pb: 4 }}
        value={' '}
      >
        {fileDropdown.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      <Button variant="contained" sx={{ color: palette.white }} type="submit">
        SEND MESSAGE
      </Button>
    </Box>
  )
}

export default PrecannedContentTab
