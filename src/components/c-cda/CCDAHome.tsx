import { Box, Container, Divider } from '@mui/material'
import Link from 'next/link'
import BannerBox from '@shared/BannerBox'
import styles from '@shared/styles.module.css'
import CardWithImage from '@shared/CardWithImage'
import uscdiv3 from '@public/c-cda/uscdi-v3.svg'
import uscdiv1 from '@public/c-cda/uscdi-v1.svg'
import scorecard from '@public/c-cda/scorecard.svg'
import oneclick from '@public/c-cda/oneclick.svg'
import placeholder from '@public/c-cda/placeholder.svg'
import SectionHeader from '../shared/SectionHeader'

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
        <SectionHeader header={'C-CDA Validators'} subHeader={'The latest C-CDA validators from ONC'} />

        <Box display={'flex'} width={'100%'} justifyContent={'space-between'}>
          <CardWithImage
            title={'C-CDA Validator: USCDI v3'}
            cardImage={uscdiv3}
            cardHeader={'C-CDA Validator: USCDI v3'}
            description={
              'Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.'
            }
            pathname={'/c-cda/uscdi-v3'}
            maxWidth={maxWidth}
            imageWidth={maxWidth + 'px'}
          />
          <CardWithImage
            title={'C-CDA Validator: USCDI v1'}
            cardImage={uscdiv1}
            cardHeader={'C-CDA Validator: USCDI v1'}
            description={
              'Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.'
            }
            pathname={'/c-cda/uscdi-v1'}
            maxWidth={maxWidth}
            imageWidth={maxWidth + 'px'}
          />
        </Box>
        <Divider sx={{ p: 2, borderBottomWidth: 2 }} />
        <SectionHeader
          header={'C-CDA Additional Tools'}
          subHeader={'Help with quantitative assessment of the data quality using the Scorecard'}
        />

        <Box sx={{ ...flexibleBox }}>
          <CardWithImage
            title={'C-CDA Scorecard'}
            cardImage={scorecard}
            cardHeader={'C-CDA Scorecard'}
            description={
              'The SITE C-CDA Scorecard provides an enhanced level of interoperability for C-CDA documents by using a comprehensive scoring system, which allows implementers to improve the data quality and representation of their C-CDA documents.'
            }
            pathname={'/c-cda/'}
            maxWidth={maxWidth}
            imageWidth={maxWidth + 'px'}
          />
          <CardWithImage
            title={'One Click Scorecard'}
            cardImage={oneclick}
            cardHeader={'One Click Scorecard'}
            description={
              'Providers can use the One Click Scorecard to evaluate the quality of clinical summary documents (C-CDAs) received, or created, by their system.'
            }
            pathname={'/c-cda/'}
            maxWidth={maxWidth}
            imageWidth={maxWidth + 'px'}
          />
        </Box>
        <Divider sx={{ p: 2, borderBottomWidth: 2 }} />
        <SectionHeader
          header={'Certification Criteria Version'}
          subHeader={
            'This area provides tools for testing conformance of artifacts to industry standards and specific criteria'
          }
        />
        <Box paddingBottom={4} display={'flex'} width={'100%'} justifyContent={'space-between'}>
          <CardWithImage
            title={'2015 Edition'}
            cardImage={placeholder}
            cardHeader={'2015 Edition'}
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
