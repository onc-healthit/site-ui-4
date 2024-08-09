'use client'
import Close from '@mui/icons-material/Close'
import { Grid, TextField, Card, CardHeader, CardContent, IconButton, Button, styled } from '@mui/material'
import { signIn } from 'next-auth/react'
import React, { useState } from 'react'

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
  const handleLogin = () => {
    signIn('credentials', { username: email, password: password })
  }
  return (
    <>
      <Card>
        <CardHeader
          title="Login"
          action={
            <IconButton aria-label="settings" onClick={() => props.handleAuthClose()}>
              <Close />
            </IconButton>
          }
          sx={{ typography: 'title', fontWeight: 'bold' }}
        />
        <CardContent>
          <Grid container spacing={3}>
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
                type="password"
                variant="outlined"
                required
                fullWidth
                onChange={(e) => setPassword(e.target.value)}
              />
              <Grid item xs={12}>
                <StyledLoginButtonRowWrapper>
                  <Button style={LoginButtonStyle} variant="contained" size="medium" onClick={handleLogin}>
                    SIGN IN
                  </Button>
                </StyledLoginButtonRowWrapper>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  )
}

export default Login
