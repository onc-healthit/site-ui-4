import Link from 'next/link'
import BannerBox from '../../shared/BannerBox'
import styles from '../../shared/styles.module.css'
import { Box, Button, Container, TextField, Typography } from '@mui/material'
import palette from '@/styles/palette'
const Register = () => {
  return (
    <>
      {/* Global Header */}
      <BannerBox
        breadcrumbs={[
          <Link color="inherit" href="/direct" key="1" className={styles.link}>
            Direct
          </Link>,
          <Link color="inherit" href="/direct/register" key="2" className={styles.link}>
            Register
          </Link>,
        ]}
        heading={'Register a Direct Email Address'}
        description={
          <>
            Enter your Direct (From) email address, this will be used to send a validation report to a normal email
            account. The validation reports are sent back to the email account for review by the user during testing.
            This panel allows the user to register their contact email account and link one or more Direct (From)
            account to it. Direct messages sent from a non-registered Direct (From) address will not be validated nor
            reported on.
          </>
        }
      />

      {/* Main Content */}
      <Container>
        <Box>
          <Typography variant="h3" component={'h1'} sx={{ p: 4, pl: 0 }}>
            Enter an email address to get started then select add.
          </Typography>
          <TextField
            fullWidth
            id="outlined-direct-email-address"
            label="Direct Email Address"
            helperText="Direct messages will be accepted for validation only when the Direct (From) address is registered here."
            defaultValue=""
            required
            sx={{ pb: 4 }}
          />
          <Button variant="contained" sx={{ bgcolor: palette.primary }}>
            ADD
          </Button>
        </Box>
        <Box>
          <Typography variant="h3" component={'h1'} sx={{ p: 4, pl: 0 }}>
            Manage Your Contact Email Addresses
          </Typography>
          <TextField
            fullWidth
            id="outlined-contact-email-address"
            label="Contact Email Address"
            defaultValue=""
            required
            sx={{ pb: 4 }}
          />{' '}
          <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
            <Button variant="contained" sx={{ bgcolor: palette.primary }}>
              ADD
            </Button>
            <Button variant="outlined" sx={{ color: palette.errorDark, borderColor: palette.errorDark }}>
              DELETE DIRECT GROUP
            </Button>
          </Box>
          <Box>
            {/* To-Do: List email addressess and delete email addresses with funtionality*/}
            <Typography variant="h3" component={'h1'} sx={{ p: 4, pl: 0 }}>
              Group Members
            </Typography>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default Register
