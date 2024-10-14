'use client'
import PageAlertBox from '@/components/shared/PageAlertBox'
import palette from '@/styles/palette'
import {
  Alert,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  LinearProgress,
  TextField,
  Typography,
} from '@mui/material'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { changePassword } from './actions'
import _ from 'lodash'
import { VisibilityOff, Visibility } from '@mui/icons-material'

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
        } else {
          setMessage({ message: `${data}`, severity: 'error' })
          setOldPassword('')
          setPassword('')
          setRepeatPassword('')
        }
      })
    } else {
      setMessage({ message: 'Passwords do not match', severity: 'error' })
      setOldPassword('')
      setPassword('')
      setRepeatPassword('')
    }
    setIsLoading(false)
  }

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev)
  }

  const ChangePasswordGrid = (
    <Box component="form" onSubmit={(e) => handleChangePassword(e)} sx={{ backgroundColor: palette.white, mt: 5 }}>
      <Grid container spacing={2}>
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
    <Container sx={{ pt: 4 }}>
      <PageAlertBox message="You must be logged in to change your password." />
    </Container>
  ) : (
    <>
      <Container sx={{ pt: 4 }}>
        {isLoading ? (
          <LinearProgress />
        ) : (
          <>
            <Typography sx={{ flex: 1 }} variant="h1" component="h1">
              Change Your Password
            </Typography>
            <Divider />
            {!_.isEmpty(message.message) && (
              <Alert
                severity={message.severity as 'error' | 'info' | 'success' | 'warning'}
                sx={{ marginBottom: '10px' }}
                onClose={() => setMessage({ message: '', severity: 'info' })}
              >
                {message.message}
              </Alert>
            )}
            {ChangePasswordGrid}
          </>
        )}
      </Container>
    </>
  )
}

export default ChangePasswordHome
