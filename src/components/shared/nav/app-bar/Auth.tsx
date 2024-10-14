import { AccountCircle } from '@mui/icons-material'
import { Box, Button, Link, Menu, MenuItem, Popover, Typography } from '@mui/material'
import Login from './Login'
import { signOut, useSession } from 'next-auth/react'
import { useState } from 'react'

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
export default function Auth(props: any) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [isCreatingAccount, setIsCreatingAccount] = useState(false)
  const [isForgotPassword, setIsForgotPassword] = useState(false)
  const [message, setMessage] = useState({ message: '', severity: 'info' })
  const { data: session } = useSession()
  const handleAuthMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleAuthClose = () => {
    setAnchorEl(null)
    setIsCreatingAccount(false)
    setIsForgotPassword(false)
    setMessage({ message: '', severity: 'info' })
  }

  return (
    <Box display="flex" flexDirection="row" alignItems="center">
      {session ? (
        <div>
          <Button
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleAuthMenu}
            color="inherit"
          >
            <Typography variant="h6" component="div">
              {session ? `${session.user?.name}` : 'LOGIN'}
              {''}
            </Typography>
            <AccountCircle />
          </Button>
          <Menu
            sx={{ mt: 5 }}
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleAuthClose}
          >
            <MenuItem>
              <Link href="/account/info" underline="none">
                Account Info
              </Link>
            </MenuItem>
            <MenuItem>
              <Link href="/account/changepassword" underline="none">
                Change Password
              </Link>
            </MenuItem>
            <MenuItem onClick={() => signOut()}>Log Out</MenuItem>
          </Menu>
        </div>
      ) : (
        <div>
          <Button
            size="large"
            aria-label="log in to an account"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleAuthMenu}
            color="inherit"
            endIcon={<AccountCircle />}
          >
            <Typography variant="h6" component="div">
              LOGIN
            </Typography>
          </Button>
          <Popover
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            sx={{ mt: 5 }}
            keepMounted
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleAuthClose}
          >
            <Login
              handleAuthClose={handleAuthClose}
              setIsCreatingAccount={setIsCreatingAccount}
              isCreatingAccount={isCreatingAccount}
              message={message}
              setMessage={setMessage}
              isForgotPassword={isForgotPassword}
              setIsForgotPassword={setIsForgotPassword}
            />
          </Popover>
        </div>
      )}
    </Box>
  )
}
