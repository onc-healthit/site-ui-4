import { Box, Container, Divider } from '@mui/material'
import Link from 'next/link'
import BannerBox from '@shared/BannerBox'
import styles from '@shared/styles.module.css'
import CardWithImage from '@shared/CardWithImage'
import uscdiv3 from '@public/c-cda/uscdi-v3.svg'
import uscdiv2 from '@public/c-cda/uscdi-v2.svg'
import placeholder from '@public/c-cda/placeholder.svg'
import CardWithBorder from '@shared/CardWithBorder'
import SectionHeader from '../shared/SectionHeader'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

const CCDAHome = () => {
  const maxWidth = 550
  const certCardMaxWidth = 350
  const flexibleBox = { display: 'flex', gap: 4, flexDirection: 'row', width: '100%', justifyContent: 'space-between' }
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
        <SectionHeader header={'C-CDA Validators'} subHeader={'The latest C-CDA validators from ONC'} />

        <Box display={'flex'} width={'100%'} justifyContent={'space-between'}>
          <CardWithImage
            title={'C-CDA Validators USCDI v3'}
            cardImage={uscdiv3}
            cardHeader={'C-CDA Validators USCDI v3'}
            cardSubheader={''}
            description={
              'Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.'
            }
            pathname={''}
            maxWidth={maxWidth}
            imageWidth={maxWidth + 'px'}
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
            maxWidth={maxWidth}
            imageWidth={maxWidth + 'px'}
          />
        </Box>
        <Divider sx={{ p: 2, borderBottomWidth: 2 }} />
        <SectionHeader
          header={'C-CDA Additional Tools'}
          subHeader={'Help with quantitative assessment of the data quality using the Scorecard.'}
        />

        <Box sx={{ ...flexibleBox }}>
          <CardWithBorder
            cardHeader="C-CDA Scorecard"
            description={
              'The SITE C-CDA Scorecard provides an enhanced level of interoperability for C-CDA documents by using a comprehensive scoring system, which allows implementers to improve the data quality and representation of their C-CDA documents.'
            }
            buttonTitle={'GO'}
            buttonLink={''}
            buttonIcon={<ArrowForwardIcon />}
          />
          <CardWithBorder
            cardHeader="One Click Scorecard"
            description={
              'HL7® CDA R2 Implementation Guide: C-CDA Templates for Clinical Notes R2.1 Companion Guide, Release 2-US Realm, Oct 2021 (with errata)'
            }
            buttonTitle={'GO'}
            buttonLink={''}
            buttonIcon={<ArrowForwardIcon />}
          />
        </Box>
        <Divider sx={{ p: 2, borderBottomWidth: 2 }} />
        <SectionHeader
          header={'Certification Criteria Version'}
          subHeader={
            'This area provides tools for testing conformance of artifacts to industry standards and specific criteria.'
          }
        />
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
            maxWidth={certCardMaxWidth}
            imageWidth={certCardMaxWidth + 'px'}
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
            maxWidth={certCardMaxWidth}
            imageWidth={certCardMaxWidth + 'px'}
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
            maxWidth={certCardMaxWidth}
            imageWidth={certCardMaxWidth + 'px'}
          />
        </Box>
      </Container>
    </>
  )
}

export default CCDAHome
