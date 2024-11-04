'use client'
import { Box, Container, Divider } from '@mui/material'
import oneclick from '@public/c-cda/oneclick.svg'
import scorecard from '@public/c-cda/scorecard.svg'
import uscdiv1 from '@public/c-cda/uscdi-v1.svg'
import uscdiv3 from '@public/c-cda/uscdi-v3.svg'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import uscdiv4 from '@public/c-cda/uscdi-v4.svg'
import BannerBox from '@shared/BannerBox'
import CardWithImage from '@shared/CardWithImage'
import styles from '@shared/styles.module.css'
import Link from 'next/link'
import SectionHeader from '../shared/SectionHeader'
import { useTheme, useMediaQuery } from '@mui/material'

const CCDAHome = () => {
  const theme = useTheme()

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'))
  const isLargeScreen = useMediaQuery(theme.breakpoints.down('lg'))

  // Dynamically set the width based on screen size
  const maxWidthCards = isSmallScreen ? 300 : isMediumScreen ? 332 : isLargeScreen ? 400 : 600
  return (
    <>
      {/* Global Header */}
      <BannerBox
        breadcrumbs={
          <Link color="inherit" href="/c-cda" className={styles.link}>
            C-CDA
          </Link>
        }
        heading={'Consolidated Clinical Document Architecture (C-CDA) Testing & More'}
        description={
          <>
            Consolidated Clinical Document Architecture (C-CDA) is a standardized framework used in healthcare to
            structure and share various clinical documents electronically. It improves patient care coordination by
            ensuring consistent and accurate exchange of information between different healthcare systems and providers.
            By using C-CDA validators, healthcare organizations, EHR vendors, and other stakeholders can identify and
            rectify issues in C-CDA documents before sharing them with other systems, promoting data accuracy,
            interoperability, and overall patient safety.
          </>
        }
      />
      {/* Main Content */}
      <Container>
        <SectionHeader header={'C-CDA Validators'} subHeader={'The latest C-CDA validators from ASTP'} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            gap: '32px',
            [theme.breakpoints.down('md')]: {
              flexDirection: 'row',
              gap: '16px',
              flexWrap: 'wrap',
            },
            [theme.breakpoints.down('sm')]: {
              flexDirection: 'column',
              gap: '32px',
              flexWrap: 'wrap',
            },
          }}
        >
          {/* TODO: When adding USCDI v4, Uncomment code below, reduce maxWidthMainValidatorCards to 390
          maxWidthMainValidatorCards looks to have been removed, so, search old code to figure out integration  */}
          {/* <CardWithImage
            title={'C-CDA Validator: USCDI V4'}
            cardImage={uscdiv4}
            cardHeader={'C-CDA Validator: USCDI v4'}
            description="USCDI v4 adds 20 data elements and one data class to USCDI v3."
            pathname={'/c-cda/uscdi-v4'}
            maxWidth={maxWidthMainValidatorCards}
            imageWidth={maxWidthMainValidatorCards + 'px'}
          /> */}
          <CardWithImage
            title={'C-CDA Validator: USCDI v3'}
            cardImage={uscdiv3}
            cardHeader={'C-CDA Validator: USCDI v3'}
            description="USCDI v3 contains data classes and elements from USCDI v2 and new data classes and elements
              submitted through the ONDEC system."
            pathname={'/c-cda/uscdi-v3'}
            maxWidth={maxWidthCards}
            imageWidth={maxWidthCards + 'px'}
          />
          <CardWithImage
            title={'C-CDA Validator: USCDI v1'}
            cardImage={uscdiv1}
            cardHeader={'C-CDA Validator: USCDI v1'}
            description="The first version of the United States Core Data for Interoperability (USCDI v1) is adopted
              as a standard in the ONC Cures Act Final Rule. The USCDI sets a foundation for broader sharing of
              electronic health information to support patient care."
            pathname={'/c-cda/uscdi-v1'}
            maxWidth={maxWidthCards}
            imageWidth={maxWidthCards + 'px'}
          />
        </Box>
        <Divider sx={{ p: 2, borderBottomWidth: 2 }} />

        <SectionHeader
          header={'C-CDA Additional Tools'}
          subHeader={'Help with quantitative assessment of the data quality using the Scorecard'}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            gap: '32px',
            mb: 4,
            [theme.breakpoints.down('md')]: {
              flexDirection: 'row',
              gap: '16px',
              flexWrap: 'wrap',
            },
            [theme.breakpoints.down('sm')]: {
              flexDirection: 'column',
              gap: '32px',
              flexWrap: 'wrap',
            },
          }}
        >
          <CardWithImage
            title={'C-CDA Scorecard'}
            cardImage={scorecard}
            cardHeader={'C-CDA Scorecard'}
            description="The SITE C-CDA Scorecard provides an enhanced level of interoperability for C-CDA documents
              by using a comprehensive scoring system, which allows implementers to improve the data quality and
              representation of their C-CDA documents."
            pathname={'/c-cda/scorecard/'}
            maxWidth={maxWidthCards}
            imageWidth={maxWidthCards + 'px'}
          />
          <CardWithImage
            title={'One Click Scorecard'}
            cardImage={oneclick}
            cardHeader={'One Click Scorecard'}
            description="Providers can use the One Click Scorecard with Direct to evaluate the quality of clinical
            summary documents (C-CDAs) received, or created, by their system."
            pathname={'https://oncprojectracking.healthit.gov/wiki/display/TechLabTU/ONC+One+Click+Scorecard'}
            maxWidth={maxWidthCards}
            imageWidth={maxWidthCards + 'px'}
          />
        </Box>
      </Container>
    </>
  )
}

export default CCDAHome
