'use client'
import Close from '@mui/icons-material/Close'
import { Grid, TextField, Card, CardHeader, CardContent, IconButton, Button, ButtonGroup, styled } from '@mui/material'
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

const Login = (props: {
  handleAuthClose: () => void
  showAccountCreation: (isCreating: boolean) => void
  isCreatingAccount: boolean
}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleLogin = () => {
    signIn('credentials', { username: email, password: password })
  }
  const handleSignUp = () => {
    console.log(`DEBUG ---> sign up is not implemented yet`)
  }

  return (
    <>
      <Card>
        <CardHeader
          title={props.isCreatingAccount ? 'Sign Up' : 'Login'}
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
              {props.isCreatingAccount && (
                <TextField
                  label="Repeat Password"
                  placeholder="Repeat password"
                  type="password"
                  variant="outlined"
                  required
                  fullWidth
                  onChange={(e) => setPassword(e.target.value)}
                />
              )}
              <Grid item xs={12}>
                <StyledLoginButtonRowWrapper>
                  {!props.isCreatingAccount && (
                    <>
                      <Button style={LoginButtonStyle} variant="contained" size="medium" onClick={handleLogin}>
                        SIGN IN
                      </Button>
                      <Button
                        style={LoginButtonStyle}
                        variant="contained"
                        size="medium"
                        color="secondary"
                        onClick={() => props.showAccountCreation(true)}
                      >
                        CREATE ACCOUNT
                      </Button>
                    </>
                  )}

                  {props.isCreatingAccount && (
                    <Button style={LoginButtonStyle} variant="contained" size="medium" onClick={handleSignUp}>
                      Sign Up
                    </Button>
                  )}
                </StyledLoginButtonRowWrapper>
              </Grid>
            </Grid>

            {/* <FormControlLabel control={<Checkbox name="checkedB" color="primary" />} label="Remember me" />
          <Button type="submit" color="primary" variant="contained" style={btnstyle} fullWidth>
            Sign in
          </Button>
          <Typography>
            <Link href="#">Forgot password ?</Link>
          </Typography>
          <Typography>
            {' '}
            Do you have an account ?<Link href="#">Sign Up</Link>
          </Typography> */}
          </Grid>
        </CardContent>
      </Card>
    </>
  )
}

export default Login
