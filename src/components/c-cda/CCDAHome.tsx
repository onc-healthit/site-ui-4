import { Box, Container, Divider } from '@mui/material'
import oneclick from '@public/c-cda/oneclick.svg'
import scorecard from '@public/c-cda/scorecard.svg'
import uscdiv1 from '@public/c-cda/uscdi-v1.svg'
import uscdiv3 from '@public/c-cda/uscdi-v3.svg'
import uscdiv4 from '@public/c-cda/uscdi-v4.svg'
import BannerBox from '@shared/BannerBox'
import CardWithImage from '@shared/CardWithImage'
import styles from '@shared/styles.module.css'
import Link from 'next/link'
import SectionHeader from '../shared/SectionHeader'

const CCDAHome = () => {
  const maxWidthMainValidatorCards = 390
  const maxWidthAdditionalToolCards = 600 // Change to 390 if using a three column grid
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
          {/* TODO: Update each description to be unique to each validator version */}
          <CardWithImage
            title={'C-CDA Validator: USCDI V4'}
            cardImage={uscdiv4}
            cardHeader={'C-CDA Validator: USCDI v4'}
            description={`This area provides tools for testing conformance of artifacts to industry standards and specific criteria. There are both context-free validators for general testing and validators for the ONC Health IT Certification Program's certification criteria.`}
            pathname={'/c-cda/uscdi-v4'}
            maxWidth={maxWidthMainValidatorCards}
            imageWidth={maxWidthMainValidatorCards + 'px'}
          />
          <CardWithImage
            title={'C-CDA Validator: USCDI v3'}
            cardImage={uscdiv3}
            cardHeader={'C-CDA Validator: USCDI v3'}
            description={`This area provides tools for testing conformance of artifacts to industry standards and specific criteria. There are both context-free validators for general testing and validators for the ONC Health IT Certification Program's certification criteria.`}
            pathname={'/c-cda/uscdi-v3'}
            maxWidth={maxWidthMainValidatorCards}
            imageWidth={maxWidthMainValidatorCards + 'px'}
          />
          <CardWithImage
            title={'C-CDA Validator: USCDI v1'}
            cardImage={uscdiv1}
            cardHeader={'C-CDA Validator: USCDI v1'}
            description={`This area provides tools for testing conformance of artifacts to industry standards and specific criteria. There are both context-free validators for general testing and validators for the ONC Health IT Certification Program's certification criteria.`}
            pathname={'/c-cda/uscdi-v1'}
            maxWidth={maxWidthMainValidatorCards}
            imageWidth={maxWidthMainValidatorCards + 'px'}
          />
        </Box>
        <Divider sx={{ p: 2, borderBottomWidth: 2 }} />

        <SectionHeader
          header={'C-CDA Additional Tools'}
          subHeader={'Help with quantitative assessment of the data quality using the Scorecard'}
        />
        <Box sx={{ ...flexibleBox }} paddingBottom={4}>
          <CardWithImage
            title={'C-CDA Scorecard'}
            cardImage={scorecard}
            cardHeader={'C-CDA Scorecard'}
            description={
              'The SITE C-CDA Scorecard provides an enhanced level of interoperability for C-CDA documents by using a comprehensive scoring system, which allows implementers to improve the data quality and representation of their C-CDA documents.'
            }
            pathname={'/c-cda/scorecard/'}
            maxWidth={maxWidthAdditionalToolCards}
            imageWidth={maxWidthAdditionalToolCards + 'px'}
          />
          {/* TODO: Are we going to make a landing page for the one click scorecard or just link to the ONC page? */}
          <CardWithImage
            title={'One Click Scorecard'}
            cardImage={oneclick}
            cardHeader={'One Click Scorecard'}
            description={
              'Providers can use the One Click Scorecard with Direct to evaluate the quality of clinical summary documents (C-CDAs) received, or created, by their system.'
            }
            pathname={'https://oncprojectracking.healthit.gov/wiki/display/TechLabTU/ONC+One+Click+Scorecard'}
            maxWidth={maxWidthAdditionalToolCards}
            imageWidth={maxWidthAdditionalToolCards + 'px'}
          />
        </Box>
      </Container>
    </>
  )
}

export default CCDAHome
