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
      <Container disableGutters sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <ArchiveSubMenu></ArchiveSubMenu>
        <Box
          display={'flex'}
          maxWidth={'1075px'}
          width={'100%'}
          alignItems={'flex-end'}
          marginRight={'32px'}
          ml={'320px'}
          mt={'263px'}
          paddingBottom={4}
        >
          <ArchiveCard
            cardHeader="Cures Update"
            description={
              'HL7® CDA R2 Implementation Guide: C-CDA Templates for Clinical Notes R2.1 Companion Guide, Release 2-US Realm, Oct 2021 (with errata)'
            }
          />
          <ArchiveCard
            cardHeader="Cures Update"
            description={
              'HL7® CDA R2 Implementation Guide: C-CDA Templates for Clinical Notes R2.1 Companion Guide, Release 2-US Realm, Oct 2021 (with errata)'
            }
          />
          <ArchiveCard
            cardHeader="USCDI v2"
            description={
              'HL7® CDA R2 Implementation Guide: C-CDA Templates for Clinical Notes R2.1 Companion Guide, Release 3-US Realm, May 2022'
            }
          />
          <ArchiveCard
            cardHeader="USCDI v2"
            description={
              'HL7® CDA R2 Implementation Guide: C-CDA Templates for Clinical Notes R2.1 Companion Guide, Release 3-US Realm, May 2022'
            }
          />
        </Box>
      </Container>
    </Box>
  )
}
