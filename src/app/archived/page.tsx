import Box from '@mui/material/Box'
import ArchiveCard from '../../components/archived/ArchiveCard'
import ArchiveSubMenu from '../../components/archived/ArchiveSubMenu'
import BannerBox from '@shared/BannerBox'

export default function ArchivedHome() {
  return (
    <div>
      <BannerBox
        breadcrumbs={undefined}
        heading={'Archived tools, files and other additional content'}
        isTourButton={false}
        description={
          "Welcome to the Frequently Asked Questions (FAQ) section of the SITE website. Here, we've compiled a comprehensive list of common queries and inquiries to provide you with quick and informative answers to your most pressing questions about SITE. Whether you're a new visitor exploring our platform or a long-time user seeking clarification, this FAQ section aims to simplify your experience and provide valuable insights into SITE's features and functionalities."
        }
      />
      <Box
        sx={{
          position: 'relative',
          width: '1441px',
          height: '1457px',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex',
          padding: '0 32px',
          mt: 4,
        }}
      >
        <ArchiveSubMenu />
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            left: '300px',
            maxWidth: '1075px',
            width: '100%',
            paddingBottom: 4,
          }}
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
      </Box>
    </div>
  )
}
