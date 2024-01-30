import { Box, FormControlLabel, FormGroup, Switch, Typography } from '@mui/material'

interface DevToolsInterface {
  auth: boolean
  handleAuthChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void
}
export default function DevTools({ auth, handleAuthChange }: DevToolsInterface) {
  return (
    <Box p={4}>
      <Typography variant="h6" noWrap component="h6">
        Debug Dev Controls
      </Typography>
      <Typography variant="body1">Toggle Auth State</Typography>
      <FormGroup>
        <FormControlLabel
          control={<Switch color="secondary" checked={auth} onChange={handleAuthChange} aria-label="login switch" />}
          label={auth ? 'Logout' : 'Login'}
        />
      </FormGroup>
    </Box>
  )
}
