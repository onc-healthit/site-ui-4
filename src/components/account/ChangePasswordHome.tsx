'use client'
import PageAlertBox from '@/components/shared/PageAlertBox'
import {
  Alert,
  Box,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  LinearProgress,
  TextField,
  Typography,
  CardContent,
} from '@mui/material'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { changePassword } from './actions'
import _ from 'lodash'
import { VisibilityOff, Visibility } from '@mui/icons-material'
import eventTrack from '@/services/analytics'

const LoginButtonStyle = {
  padding: '10px 0',
  width: '100%',
  margin: 1,
}

const ChangePasswordHome = () => {
  const { data: session, status } = useSession()
  const [isLoading, setIsLoading] = useState(false)
  const [oldPassword, setOldPassword] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState({ message: '', severity: 'info' })

  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true)
    e.preventDefault()
    if (password === repeatPassword) {
      changePassword(oldPassword, password).then((data) => {
        if (data === true) {
          setMessage({ message: 'Password updated', severity: 'success' })
          setOldPassword('')
          setPassword('')
          setRepeatPassword('')
          eventTrack('Change Password', 'Authentication', 'Success')
        } else {
          setMessage({ message: `${data}`, severity: 'error' })
          setOldPassword('')
          setPassword('')
          setRepeatPassword('')
          eventTrack('Change Password', 'Authentication', 'Error')
        }
      })
    } else {
      setMessage({ message: 'Passwords do not match', severity: 'error' })
      setOldPassword('')
      setPassword('')
      setRepeatPassword('')
      eventTrack('Change Password', 'Authentication', 'Password do not match')
    }
    setIsLoading(false)
  }

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev)
  }

  const ChangePasswordGrid = (
    <Box component="form" onSubmit={(e) => handleChangePassword(e)} sx={{ mt: 5 }}>
      <Grid gap={2} container>
        <Grid item xs={12}>
          <TextField
            label="Old Password"
            placeholder="Enter old password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            required
            fullWidth
            onChange={(e) => setOldPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="New Password"
            placeholder="Enter new password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            required
            fullWidth
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Repeat New Password"
            placeholder="Repeat new password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            required
            fullWidth
            onChange={(e) => setRepeatPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Box component="span">
            <Button style={LoginButtonStyle} variant="contained" size="small" color="primary" type="submit">
              Save
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )

  return status !== 'authenticated' ? (
    <Container maxWidth="md" sx={{ pt: 4 }}>
      <PageAlertBox message="You must be logged in to change your password." />
    </Container>
  ) : (
    <>
      {isLoading ? (
        <LinearProgress />
      ) : (
        <>
          <Container sx={{ mt: 8 }} maxWidth="xs">
            <Card>
              <CardContent>
                <Typography variant="h1" gutterBottom fontWeight={'600'}>
                  Change Password
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography gutterBottom>
                  To keep your account secure, please enter your current password and your new password. Make sure your
                  new password includes a mix of letters, numbers, and symbols.
                </Typography>
                <Typography sx={{ mt: 2 }}>
                  Choose a password that you haven&apos;t used before. Once you&apos;ve filled in the fields, click{' '}
                  <strong>&quot;Save&quot;</strong> to update your password. If you need assistance, please contact our
                  support team. Stay secure!
                </Typography>
                {ChangePasswordGrid}
              </CardContent>
            </Card>
            {!_.isEmpty(message.message) && (
              <Alert
                variant="filled"
                severity={message.severity as 'error' | 'info' | 'success' | 'warning'}
                sx={{ marginY: '20px' }}
                onClose={() => setMessage({ message: '', severity: 'info' })}
              >
                {message.message}
              </Alert>
            )}
          </Container>
        </>
      )}
    </>
  )
}

export default ChangePasswordHome
