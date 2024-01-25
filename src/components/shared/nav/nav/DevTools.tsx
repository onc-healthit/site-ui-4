import { FormControlLabel, FormGroup, Switch, Typography } from '@mui/material'

interface DevToolsInterface {
  auth: boolean
  handleAuthChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void
}
export default function DevTools({ auth, handleAuthChange }: DevToolsInterface) {
  return (
    <>
      <Typography variant="h6" noWrap component="h6">
        Debug Dev Controls
      </Typography>
      <ol>
        <li>Toggle Auth State</li>
        <li>
          <FormGroup>
            <FormControlLabel
              control={<Switch checked={auth} onChange={handleAuthChange} aria-label="login switch" />}
              label={auth ? 'Logout' : 'Login'}
            />
          </FormGroup>
        </li>
      </ol>
    </>
  )
}
