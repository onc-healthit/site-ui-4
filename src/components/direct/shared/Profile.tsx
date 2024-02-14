import palette from '@/styles/palette'
import { Box, TextField, Button, MenuItem } from '@mui/material'

const dropdown = [
  {
    value: 'Default Profile',
    label: 'Default Profile',
  },
]
const Profile = () => {
  return (
    <Box component="form" sx={{ backgroundColor: palette.white }}>
      <TextField
        fullWidth
        id="select-profile"
        select
        label="Select A Profile"
        defaultValue="Default Profile"
        variant="filled"
      >
        {dropdown.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <Box display={'flex'} flexDirection={'column'} gap={4} p={2}>
        <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} pt={2} gap={2}>
          <TextField
            fullWidth
            id="outlined-vendor-hostname"
            label="Vendor Hostname/IP"
            helperText="helper text"
            defaultValue="test"
            required
          />
          <TextField
            fullWidth
            id="vendor-email"
            label="Vendor Direct Email Address"
            helperText="helper text"
            defaultValue="test"
            required
          />
        </Box>
        <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} gap={2}>
          <TextField
            fullWidth
            id="vendor-username"
            label="Vendor Username"
            helperText="helper text"
            defaultValue="test"
            required
          />
          <TextField
            fullWidth
            id="vendor-password"
            label="Vendor Password"
            helperText="helper text"
            defaultValue="test"
            required
          />
        </Box>
      </Box>
      <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} p={2}>
        <Box display={'flex'} flexDirection={'row'} gap={1}>
          <Button variant="outlined" sx={{ color: palette.primary }}>
            Make Profile
          </Button>
          <Button disabled variant="outlined" sx={{ color: palette.primary }}>
            Save
          </Button>
        </Box>
        <Button variant="text" sx={{ color: palette.errorDark }}>
          Remove
        </Button>
      </Box>
    </Box>
  )
}
export default Profile
