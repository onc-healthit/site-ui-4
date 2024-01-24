import styles from '../page.module.css'
import './WelcomeText.css'
import React from 'react'
import ArchiveCard from './ArchiveCard'
import Box from '@mui/material/Box'
import WelcomeHeader from './WelcomeHeader'
import Link from '@mui/material/Link'
import { Container, Divider, Typography } from '@mui/material'
import ArchiveSubMenu from './ArchiveSubMenu'

export default function ArchivedHome() {
  return (
    <Box>
      {/* Global Header */}
      <WelcomeHeader
        heading={'Archived tools, files and other additional content'}
        description={
          <>
            Welcome to the Frequently Asked Questions (FAQ) section of the SITE website. Here, we've compiled a
            comprehensive list of common queries and inquiries to provide you with quick and informative answers to your
            most pressing questions about SITE. Whether you're a new visitor exploring our platform or a long-time user
            seeking clarification, this FAQ section aims to simplify your experience and provide valuable insights into
            SITE's features and functionalities.
          </>
        }
      />
      {/* Main Content */}
      <Container disableGutters>
        <ArchiveSubMenu></ArchiveSubMenu>
        <Box
          display={'flex'}
          maxWidth={'1075px'}
          width={'100%'}
          justifyContent={'flex-end'}
          marginRight={'32px'}
          marginLeft={'300px'}
          mt={'263px'}
          paddingBottom={4}
        >
          <ArchiveCard
            cardHeader="Register for Direct Email"
            description={
              'Enter your Direct (From) email address, this will be used to send a validation report to a normal email account. The validation reports are sent back to the email account for review by the user during testing.'
            }
          />
          <ArchiveCard
            cardHeader="Send Direct Email"
            description={
              'Enter your Direct (From) email address, this will be used to send a validation report to a normal email account. The validation reports are sent back to the email account for review by the user during testing.'
            }
          />
          <ArchiveCard
            cardHeader="Send Direct Email"
            description={
              'Enter your Direct (From) email address, this will be used to send a validation report to a normal email account. The validation reports are sent back to the email account for review by the user during testing.'
            }
          />
          <ArchiveCard
            cardHeader="Send Direct Email"
            description={
              'Enter your Direct (From) email address, this will be used to send a validation report to a normal email account. The validation reports are sent back to the email account for review by the user during testing.'
            }
          />
        </Box>
        <Divider sx={{ p: 2, borderBottomWidth: 2 }} />
      </Container>
    </Box>
  )
}
