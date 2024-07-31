import palette from '@/styles/palette'
import { Box, TextField, Button, MenuItem, FormGroup, FormControlLabel, Switch } from '@mui/material'

const dropdown = [
  {
    value: 'Default Profile',
    label: 'Default Profile',
  },
]

interface ProfileProps {
  setHostname?: (hostname: string) => void
  setEmail?: (email: string) => void
  setUsername?: (username: string) => void
  setPassword?: (password: string) => void
  setTls?: (tls: boolean) => void
}

const noop = () => {}

const Profile: React.FC<ProfileProps> = ({
  setHostname = noop,
  setEmail = noop,
  setUsername = noop,
  setPassword = noop,
  setTls = noop,
}) => {
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
            required
            onChange={(e) => setHostname(e.target.value)}
          />
          <TextField
            fullWidth
            id="vendor-email"
            label="Vendor Direct Email Address"
            helperText="helper text"
            defaultValue=""
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
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            fullWidth
            id="vendor-password"
            label="Vendor Password"
            helperText="helper text"
            defaultValue=""
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>
        <FormGroup sx={{ width: '50%' }}>
          <FormControlLabel
            control={<Switch color="secondary" defaultChecked onChange={(e) => setTls(e.target.checked)} />}
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
