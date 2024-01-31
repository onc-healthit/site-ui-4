import { Box, Container, Divider, Typography } from '@mui/material'
import Link from 'next/link'
import BannerBox from '@shared/BannerBox'
import styles from '@shared/styles.module.css'
import Footer from '@shared/Footer'
import Ankle from '@shared/Ankle'
import CardWithImage from '@shared/CardWithImage'
import uscdiv3 from '@public/c-cda/uscdi-v3.svg'
import uscdiv2 from '@public/c-cda/uscdi-v2.svg'
import placeholder from '@public/c-cda/placeholder.svg'
import CardWithBorder from '@shared/CardWithBorder'

const CCDAHome = () => {
  return (
    <Box width="100%" pt={8}>
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
            (Consolidated Clinical Document Architecture) C-CDA s a standardized framework used in healthcare to
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
        <Box paddingTop={4} paddingBottom={4}>
          <Typography variant="h4" component={'h2'}>
            <strong>C-CDA Validators</strong>
          </Typography>
          <Typography variant="body1" color="secondary">
            <strong>The latest C-CCDA validators from ONC</strong>
          </Typography>
        </Box>
        <Box display={'flex'} width={'100%'} justifyContent={'space-between'}>
          <CardWithImage
            title={'C-CDA Validators USCDI v3'}
            cardImage={uscdiv3}
            cardHeader={'C-CDA Validators USCDI v3'}
            cardSubheader={''}
            description={'This will be available when the website is launched in Early, 2024'}
            pathname={''}
            maxWidth={545}
            imageWidth={'600px'}
          />

          <CardWithImage
            title={'C-CDA Validators USCDI v2'}
            cardImage={uscdiv2}
            cardHeader={'C-CDA Validators USCDI v2'}
            cardSubheader={''}
            description={
              'Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.'
            }
            pathname={''}
            maxWidth={545}
            imageWidth={'600px'}
          />
        </Box>
        <Divider sx={{ p: 2, borderBottomWidth: 2 }} />
        <Box paddingTop={4} paddingBottom={4}>
          <Typography variant="h4" component={'h2'}>
            <strong>C-CDA Additional Tools</strong>
          </Typography>
          <Typography variant="body1" color="secondary">
            <strong>Help with quantitative assessment of the data quality using the Scorecard.</strong>
          </Typography>
        </Box>
        <Box display={'flex'} width={'100%'} justifyContent={'space-between'} paddingBottom={4}>
          <CardWithBorder
            cardHeader="C-CDA Scorecard"
            description={
              'The SITE C-CDA Scorecard provides an enhanced level of interoperability for C-CDA documents by using a comprehensive scoring system, which allows implementers to improve the data quality and representation of their C-CDA documents.'
            }
            maxWidth={545}
          />
          <CardWithBorder
            cardHeader="One Click Scorecard"
            description={
              'HL7® CDA R2 Implementation Guide: C-CDA Templates for Clinical Notes R2.1 Companion Guide, Release 2-US Realm, Oct 2021 (with errata)'
            }
            maxWidth={545}
          />
        </Box>
        <Divider sx={{ p: 2, borderBottomWidth: 2 }} />
        <Box paddingTop={4} paddingBottom={4}>
          <Typography variant="h4" component={'h2'}>
            <strong>Certification Criteria Version</strong>
          </Typography>
          <Typography variant="body1" color="secondary">
            <strong>
              This area provides tools for testing conformance of artifacts to industry standards and specific criteria.
            </strong>
          </Typography>
        </Box>
        <Box paddingBottom={4} display={'flex'} width={'100%'} justifyContent={'space-between'}>
          <CardWithImage
            title={'2015 Edition'}
            cardImage={placeholder}
            cardHeader={'2015 Edition'}
            cardSubheader={''}
            description={
              'HL7® Implementation Guide for CDA® Release 2: Consolidated CDA Templates for Clinical Notes (US Realm), Draft Standard for Trial Use Release 2.1, August 2015'
            }
            pathname={''}
            maxWidth={345}
            imageWidth={'350px'}
          />

          <CardWithImage
            title={'Cures Update'}
            cardImage={placeholder}
            cardHeader={'Cures Update'}
            cardSubheader={''}
            description={
              'HL7® CDA R2 Implementation Guide: C-CDA Templates for Clinical Notes R2.1 Companion Guide, Release 2-US Realm, Oct 2021 (with errata)'
            }
            pathname={''}
            maxWidth={345}
            imageWidth={'350px'}
          />
          <CardWithImage
            title={'USCDI v2'}
            cardImage={placeholder}
            cardHeader={'USCDI v2'}
            cardSubheader={''}
            description={
              'HL7® CDA R2 Implementation Guide: C-CDA Templates for Clinical Notes R2.1 Companion Guide, Release 3-US Realm, May 2022'
            }
            pathname={''}
            maxWidth={345}
            imageWidth={'350px'}
          />
        </Box>
      </Container>
      {/* Global Ankle */}
      <Ankle />
      {/* Global Footer */}
      <Footer />
    </Box>
  )
}

export default CCDAHome
