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
  styled,
} from '@mui/material'
import { signIn } from 'next-auth/react'
import React, { useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material'

const StyledLoginButtonRowWrapper = styled('div')(() => ({
  paddingTop: 24,
  width: '100%',
  display: 'flex',
  justifyContent: 'space-around',
}))

const LoginButtonStyle = {
  width: '100%',
  margin: 1,
}

const Login = (props: { handleAuthClose: () => void }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = () => {
    signIn('credentials', { username: email, password: password })
  }

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev)
  }

  return (
    <>
      <Card elevation={10} sx={{ maxWidth: '350px' }}>
        <CardHeader
          title="Login"
          action={
            <IconButton aria-label="settings" onClick={() => props.handleAuthClose()}>
              <Close fontSize="small" />
            </IconButton>
          }
          titleTypographyProps={{ fontWeight: '600', variant: 'h3', color: palette.primary }}
        />
        <CardContent>
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
              <StyledLoginButtonRowWrapper>
                <Button style={LoginButtonStyle} variant="contained" size="medium" onClick={handleLogin}>
                  SIGN IN
                </Button>
              </StyledLoginButtonRowWrapper>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  )
}

export default Login
