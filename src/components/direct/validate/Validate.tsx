'use client'
import BannerBox from '@/components/shared/BannerBox'
import styles from '@/components/shared/styles.module.css'
import { Box, Button, Container, Stack, TextField, Tooltip, Typography } from '@mui/material'
import Link from 'next/link'
import DragandDropFile from '@components/shared/DragandDropFile'
import HelpIcon from '@mui/icons-material/Help'
import palette from '@/styles/palette'

const Validate = () => {
  return (
    <>
      {/* Global Header */}
      <BannerBox
        breadcrumbs={[
          <Link color="inherit" href="/direct" key="1" className={styles.link}>
            Direct
          </Link>,
          <Link color="inherit" href="/direct/validate" key="2" className={styles.link}>
            Validate
          </Link>,
        ]}
        heading={'Validate Direct Message'}
        description={
          <>
            Ensure that your direct messaging system complies with legal and regulatory requirements, including HIPAA
            regulations in the United States. Stay updated with any changes in the regulations that might impact the way
            direct messages need to be handled and secured.
          </>
        }
      />
      {/* Main Content */}
      <Container>
        <Box>
          <Typography variant="h3" component={'h1'} sx={{ p: 4, pl: 0 }}>
            Upload your file & enter password to validate
          </Typography>
          <TextField
            fullWidth
            id="outlined-password"
            label="Password"
            helperText="This is the password for the certificate file. Leave it blank if there is no password"
            sx={{ pb: 4 }}
          />
          <Box
            display={'flex'}
            alignItems={'baseline'}
            flexDirection={'row'}
            justifyContent={'space-between'}
            pb={4}
            gap={4}
          >
            <Box width={'48%'} pb={4}>
              <Stack direction="row" alignItems="flex-start" gap={1}>
                <Typography gutterBottom variant="body1">
                  Upload your message file
                </Typography>
                <Tooltip title="This is the message you want to validate" arrow placement="right">
                  <HelpIcon color="primary" fontSize={'small'} />
                </Tooltip>
              </Stack>
              <DragandDropFile />
            </Box>
            <Box width={'48%'} pb={4}>
              <Stack direction="row" alignItems="flex-start" gap={1}>
                <Typography gutterBottom variant="body1">
                  Upload your certificate file
                </Typography>
                <Tooltip
                  title="Certificate containing the private key used to decrypt the message"
                  arrow
                  placement="right"
                >
                  <HelpIcon color="primary" fontSize={'small'} />
                </Tooltip>
              </Stack>
              <DragandDropFile />
            </Box>
          </Box>
          <Button variant="contained" sx={{ bgcolor: palette.primary }}>
            Validate
          </Button>
        </Box>
      </Container>
    </>
  )
}

export default Validate
