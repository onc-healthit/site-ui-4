import { Box, TextField, Button, MenuItem } from '@mui/material'

const Profile = () => {
  return (
    <Box component="form">
      <TextField fullWidth id="select-profile" select label="Select A Profile" variant="standard">
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
      </TextField>
      <Box>
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
      <Box>
        <Box sx={{ display: 'flex' }}>
          <Button variant="outlined" color="primary">
            Make a Profile
          </Button>

          <Button variant="outlined" color="primary">
            Save
          </Button>
        </Box>
        <Box>
          <Button variant="outlined" color="error">
            Remove
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
export default Profile
