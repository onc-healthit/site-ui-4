// MUI Imports
import { Box, Container, Link } from '@mui/material'
import BannerBox from '../shared/BannerBox'
// Global Imports
// Styles
import SubMenu, { menuProps } from '@/components/shared/SubMenu'
import palette from '@/styles/palette'
import ArchiveCard from './ArchiveCard'
import ArchiveFilter from './ArchiveFilter'
// Images

const ArchiveHome = () => {
  const menuItems: menuProps[] = [
    { heading: 'All', href: '' },
    { heading: 'C-CDA', href: '' },
    { heading: 'Direct', href: '' },
    { heading: 'Edge', href: '' },
    { heading: 'XDM', href: '' },
    { heading: 'Other', href: '' },
    { heading: 'Contact Us', href: '' },
  ]

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
            Unearth a treasure trove of archived resources including tools, files, and more! Please be aware that these
            materials are no longer actively maintained. Despite this, they offer valuable insights and historical
            context. Dive into our curated collection to explore and discover valuable resources for your projects and
            endeavors!
          </>
        }
      />
      <Container>
        <Box pt={4} pb={4} display={'flex'} flexDirection={'row'} gap={4}>
          <Box display={'flex'} flexDirection={'column'} gap={4}>
            <SubMenu menuItems={menuItems} />
            <ArchiveFilter />
          </Box>
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
