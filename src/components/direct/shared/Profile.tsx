import palette from '@/styles/palette'
import { Box, TextField, Button, MenuItem, FormGroup, FormControlLabel, Switch } from '@mui/material'
import { useContext } from 'react'
import { ProfileContext } from '../hisp/context'

const dropdown = [
  {
    value: 'Default Profile',
    label: 'Default Profile',
  },
]

const Profile = () => {
  const { setHostname, setEmail, setUsername, setPassword, setTls, hostname, email, password, tls, username } =
    useContext(ProfileContext)
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
            defaultValue=""
            value={hostname}
            required
            onChange={(e) => setHostname(e.target.value)}
          />
          <TextField
            fullWidth
            id="vendor-email"
            label="Vendor Direct Email Address"
            helperText="helper text"
            defaultValue=""
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>
        <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} gap={2}>
          <TextField
            fullWidth
            id="vendor-username"
            label="Vendor Username"
            helperText="helper text"
            defaultValue=""
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            fullWidth
            id="vendor-password"
            label="Vendor Password"
            helperText="helper text"
            type="password"
            defaultValue=""
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>
        <FormGroup sx={{ width: '50%' }}>
          <FormControlLabel
            control={<Switch color="secondary" defaultChecked value={tls} onChange={(e) => setTls(e.target.checked)} />}
            label="TLS REQUIRED"
            name="tlsRequired"
          />
        </FormGroup>
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
