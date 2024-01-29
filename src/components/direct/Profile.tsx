import palette from '@/styles/palette'
import { Box, TextField, Button, MenuItem, Stack } from '@mui/material'

const Profile = () => {
  return (
    <Box component="form" sx={{ backgroundColor: palette.white, p: 2 }}>
      <TextField fullWidth id="select-profile" select label="Select A Profile" variant="standard">
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
      </TextField>
      <Box sx={{ paddingBottom: 2 }}>
        <TextField
          id="outlined-vendor-hostname"
          label="Vendor Hostname/IP"
          sx={{ m: 1, width: '30ch' }}
          helperText="helper text"
          defaultValue="test"
        />
        <TextField
          id="vendor-email"
          label="Vendor Direct Email Address"
          sx={{ m: 1, width: '30ch' }}
          helperText="helper text"
          defaultValue="test"
        />
        <TextField
          fullWidth
          id="vendor-username"
          label="Vendor Username"
          helperText="helper text"
          defaultValue="test"
        />
        <TextField
          fullWidth
          id="vendor-password"
          label="Vendor Password"
          helperText="helper text"
          defaultValue="test"
        />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" sx={{ color: palette.primary }}>
            Make a Profile
          </Button>

          <Button variant="outlined" sx={{ color: palette.primary }}>
            Save
          </Button>
        </Stack>

        <Button variant="outlined" sx={{ color: '#FF5252' }}>
          Remove
        </Button>
      </Box>
    </Box>
  )
}
export default Profile
