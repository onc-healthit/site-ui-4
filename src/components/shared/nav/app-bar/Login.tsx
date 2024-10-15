'use client'
import palette from '@/styles/palette'
import Close from '@mui/icons-material/Close'
import {
  Grid,
  InputAdornment,
  TextField,
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Button,
  Box,
  Alert,
} from '@mui/material'
import { signIn } from 'next-auth/react'
import React, { useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { registerAccount, forgotPassword } from '../actions'
import _ from 'lodash'

const LoginButtonStyle = {
  padding: '10px 0',
  width: '100%',
  margin: 1,
}

const Login = ({
  handleAuthClose,
  setIsCreatingAccount,
  isCreatingAccount,
  message,
  setMessage,
  isForgotPassword,
  setIsForgotPassword,
}: {
  handleAuthClose: () => void
  setIsCreatingAccount: React.Dispatch<React.SetStateAction<boolean>>
  isCreatingAccount: boolean
  message: { message: string; severity: string }
  setMessage: React.Dispatch<React.SetStateAction<{ message: string; severity: string }>>
  isForgotPassword: boolean
  setIsForgotPassword: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    signIn('credentials', { username: email, password: password })
  }

  const handleCreateAccount = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (password === repeatPassword) {
      registerAccount({ username: email, password: password }).then((data) => {
        if (data === true) {
          signIn('credentials', { username: email, password: password })
        } else {
          setMessage({ message: 'User already exists', severity: 'error' })
        }
      })
    } else {
      setMessage({ message: 'Passwords do not match', severity: 'error' })
    }
  }

  const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    forgotPassword(email).then((data) => {
      if (data !== true) {
        setMessage({ message: 'This username does not exist', severity: 'error' })
      }
    })
  }

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev)
  }

  const LoginGrid = (
    <Box component="form" mb={-1} onSubmit={(e) => handleLogin(e)} sx={{ backgroundColor: palette.white }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Email (Or Username)"
            variant="outlined"
            required
            fullWidth
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Password"
            placeholder="Enter password"
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
          <Box gap={1} display={'flex'} justifyContent="space-between" component="span" width={'100%'}>
            <Button style={LoginButtonStyle} variant="contained" size="small" type="submit">
              SIGN IN
            </Button>
            <Button
              style={LoginButtonStyle}
              variant="contained"
              size="small"
              onClick={() => setIsCreatingAccount(true)}
              color="secondary"
            >
              CREATE ACCOUNT
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Box display={'flex'} justifyContent="flex-end" component="span" width={'100%'} sx={{ mt: 1 }}>
        <Button size="small" onClick={() => setIsForgotPassword(true)} color="secondary" variant="text">
          FORGOT PASSWORD?
        </Button>
      </Box>
    </Box>
  )

  const CreateAccountGrid = (
    <Box component="form" onSubmit={(e) => handleCreateAccount(e)} sx={{ backgroundColor: palette.white }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Email (Or Username)"
            variant="outlined"
            required
            fullWidth
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Password"
            placeholder="Enter password"
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
            label="Repeat Password"
            placeholder="Enter password"
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
          <Box display={'flex'} justifyContent="space-between" component="span" width={'100%'}>
            <Button style={LoginButtonStyle} variant="contained" size="small" color="primary" type="submit">
              SIGN UP
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )

  const ForgotPasswordGrid = (
    <Box component="form" onSubmit={(e) => handleForgotPassword(e)} sx={{ backgroundColor: palette.white }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Email (Or Username)"
            variant="outlined"
            helperText="A new password will be sent to this email"
            required
            fullWidth
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Box display={'flex'} gap={1} justifyContent="space-between" component="span">
            <Button style={LoginButtonStyle} variant="contained" size="small" type="submit">
              SEND
            </Button>
            <Button
              style={LoginButtonStyle}
              variant="contained"
              size="small"
              onClick={() => handleAuthClose()}
              color="secondary"
            >
              CANCEL
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )

  return (
    <>
      <Box>
        {isForgotPassword ? (
          <Card elevation={10} sx={{ maxWidth: '350px' }}>
            <CardHeader
              title={'Forgot Password'}
              action={
                <IconButton aria-label="settings" onClick={() => handleAuthClose()}>
                  <Close fontSize="small" />
                </IconButton>
              }
              titleTypographyProps={{ fontWeight: '600', variant: 'h3', color: palette.primary }}
            />
            <CardContent>{ForgotPasswordGrid}</CardContent>
          </Card>
        ) : (
          <Card elevation={10} sx={{ maxWidth: '350px' }}>
            <CardHeader
              title={isCreatingAccount ? 'Create Account' : 'Login'}
              action={
                <IconButton aria-label="settings" onClick={() => handleAuthClose()}>
                  <Close fontSize="small" />
                </IconButton>
              }
              titleTypographyProps={{ fontWeight: '600', variant: 'h3', color: palette.primary }}
            />
            <CardContent>{isCreatingAccount ? CreateAccountGrid : LoginGrid}</CardContent>
          </Card>
        )}
      </Box>
      <Box position="fixed" top="auto" sx={{ minWidth: '350px' }}>
        {!_.isEmpty(message.message) && (
          <Alert
            variant="filled"
            severity={message.severity as 'error' | 'info' | 'success' | 'warning'}
            sx={{ my: '20px', zIndex: '5000' }}
            onClose={() => setMessage({ message: '', severity: 'info' })}
          >
            {message.message}
          </Alert>
        )}
      </Box>
    </>
  )
}

export default Login
