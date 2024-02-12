// MUI Imports
import BannerBox from '../shared/BannerBox'
import { Box, Link, Container } from '@mui/material'
// Global Imports
import React from 'react' // Import React if you haven't already
// Styles
import palette from '@/styles/palette'
import ArchiveSubMenu from './ArchiveSubMenu'
import ArchiveCard from './ArchiveCard'
// Images

const ArchiveHome = () => {
  return (
    <Box>
      {/* Global Header */}
      <BannerBox
        breadcrumbs={
          <Link color={palette.secondary} href={'/archived'}>
            Archived
          </Link>
        }
        heading={'Archived tools, files and other additional content'}
        description={
          <>
            Unearth a treasure trove of archived resources including tools files and more! Please be aware that these
            materials are no longer actively maintained. Despite this, they offer valuable insights and historical
            context. Dive into our curated collection to explore and discover valuable resources for your projects and
            endeavors!
          </>
        }
      />
      <Container>
        <Box pt={4} pb={4} gap={4} display={'flex'} flexDirection={'row'}>
          <ArchiveSubMenu />
          <Box gap={4} display={'flex'} flexDirection={'row'} flexWrap={'wrap'}>
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
        </Box>
      </Container>
    </Box>
  )
}

export default ArchiveHome
