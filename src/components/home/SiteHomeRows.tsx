import palette from '@/styles/palette'
import { Box, Container } from '@mui/material'
import cCdaSvg from '@public/home/c-cda.svg'
import cpoeSvg from '@public/home/cpoe.svg'
import cqmQrdaSvg from '@public/home/cqm-qrda.svg'
import directSvg from '@public/home/direct.svg'
import hl7Svg from '@public/home/hl7.svg'
import igSvg from '@public/home/ig.svg'
import iheSvg from '@public/home/ihe.svg'
import infernoSvg from '@public/home/inferno.svg'
import lanternSvg from '@public/home/lantern.svg'
import nistSvg from '@public/home/nist.svg'
import referenceDataSvg from '@public/home/reference-data.svg'
import CardWithImage from '@shared/CardWithImage'
import SectionHeader from '../shared/SectionHeader'

export default function SiteHomeRows() {
  const maxWidth: number = 270
  const rowPaddingBottom: number = 20
  const industryTestingResourceRow = 370
  const imageURL = '../shared/ONCLogo-backgroundImage.png'

  return (
    <>
      {/* TODO:
      -@Matt: "Take A Tour" button location matches design but would it look better aligned with main header vs subHeader?
      -@Matt: Export of CQM image not working correctly so it's rendered off, fix and re-import
      -#Matt: Fix card overlap on lower res screens
      -@Matt: Fix width and height of cards to match design (likely need to support height in CardWIthImage),
      or should we, taller descriptions are better than wide, right?
      -Externalize links (external and routes) here and in nav to constants since there is reuse now
      -Support scrolling of cards
      -Could further modularize this into SiteHomeRow and then map them here if time (or separte row components if less time) */}
      <Box
        bgcolor={palette.primary}
        sx={{
          backgroundImage: `url(${imageURL})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundColor: palette.primary,
        }}
      >
        <Container>
          {/* Row 1: ONC Certification Tools*/}
          <SectionHeader
            header={'ONC Certification Tools'}
            subHeader={'All tools required for certification.'}
            isHeaderAlternateColor={true}
          />
          <Box display={'flex'} width={'100%'} justifyContent={'space-between'} sx={{ pb: `${rowPaddingBottom}px` }}>
            <CardWithImage
              title={'Inferno FHIR Testing'}
              cardImage={infernoSvg}
              cardHeader={'Inferno FHIR Testing'}
              description={
                'This is an instance of Inferno hosted by ONC for purposes of testing for the ONC Health IT Certification Program and to support community-driven health IT standards development projects.'
              }
              pathname={'https://inferno.healthit.gov/'}
              maxWidth={maxWidth}
              imageWidth={maxWidth + 'px'}
              buttonTitle="Start"
            />
            <CardWithImage
              title={'C-CDA Testing'}
              cardImage={cCdaSvg}
              cardHeader={'C-CDA Testing'}
              description={
                'These tools will help test C-CDA documents for conformance to the C-CDA IG, and also help with quantitative assessment of the data quality using the Scorecard'
              }
              pathname={'/c-cda'}
              maxWidth={maxWidth}
              imageWidth={maxWidth + 'px'}
              buttonTitle="Access"
            />
            <CardWithImage
              title={'Direct Project Tooling'}
              cardImage={directSvg}
              cardHeader={'Direct Project Tooling'}
              description={
                'Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.'
              }
              pathname={'/direct'}
              maxWidth={maxWidth}
              imageWidth={maxWidth + 'px'}
            />
            <CardWithImage
              title={'CQM QRDA Testing'}
              cardImage={cqmQrdaSvg}
              cardHeader={'CQM QRDA Testing'}
              description={
                'Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.'
              }
              pathname={'/cqm-qrda'}
              maxWidth={maxWidth}
              imageWidth={maxWidth + 'px'}
              buttonTitle="Start"
            />
          </Box>

          {/* Row 2: General Testing Tools*/}
          <SectionHeader
            header={'General Testing Tools'}
            subHeader={'All tools not required for certification, but a benefit for your software!'}
            isHeaderAlternateColor={true}
          />
          <Box display={'flex'} width={'100%'} justifyContent={'space-between'} sx={{ pb: `${rowPaddingBottom}px` }}>
            <CardWithImage
              title={'CPOE Evaluation Tool'}
              cardImage={cpoeSvg}
              cardHeader={'CPOE Evaluation Tool'}
              description={
                'A CPOE evaluation tool is a software or solution designed to assess the effectiveness, efficiency, and user satisfaction of a CPOE system.'
              }
              pathname={'https://www.leapfroggroup.org/survey-materials/prepare-cpoe-tool'}
              maxWidth={maxWidth}
              imageWidth={maxWidth + 'px'}
              buttonTitle="View"
            />
            <CardWithImage
              title={'IHE Testing Tools'}
              cardImage={iheSvg}
              cardHeader={'IHE Testing Tools'}
              description={
                'Our software applications designed to test the interoperability and compliance of healthcare information systems with IHE integration profiles and standards.'
              }
              pathname={'https://www.ihe.net/testing/testing_tools'}
              maxWidth={maxWidth}
              imageWidth={maxWidth + 'px'}
              buttonTitle="Learn"
            />
            <CardWithImage
              title={'NIST Conformance Testing'}
              cardImage={nistSvg}
              cardHeader={'NIST Conformance Testing'}
              description={
                'NIST Conformance Tests are especially important for ensuring interoperability and compliance with industry standards.'
              }
              pathname={'/nist-conformance-test'}
              maxWidth={maxWidth}
              imageWidth={maxWidth + 'px'}
              buttonTitle="Learn"
            />
            <CardWithImage
              title={'Lantern Project'}
              cardImage={lanternSvg}
              cardHeader={'Lantern Project'}
              description={
                'A fast Healthcare Interoperability Resources (FHIR®) Application Programming Interface (API) Monitoring System, otherwise known as Lantern.'
              }
              pathname={'https://lantern.healthit.gov/?tab=dashboard_tab'}
              maxWidth={maxWidth}
              imageWidth={maxWidth + 'px'}
              buttonTitle="Start"
            />
          </Box>

          {/* Row 3:  */}
          <SectionHeader
            header={'Industry Testing Resources'}
            subHeader={'Outside tools may help you!'}
            isHeaderAlternateColor={true}
          />
          <Box
            display={'flex'}
            width={'100%'}
            justifyContent={'space-between'}
            gap={4}
            sx={{ pb: `${rowPaddingBottom}px` }}
          >
            <CardWithImage
              title={'HL7 Tools'}
              cardImage={hl7Svg}
              cardHeader={'HL7 Tools'}
              description={
                'Assess the conformance, interoperability, and functionality of healthcare information systems implementing HL7 standards.'
              }
              pathname={'/hl7-tools'}
              maxWidth={industryTestingResourceRow}
              imageWidth={industryTestingResourceRow + 'px'}
              buttonTitle="Access"
            />
            <CardWithImage
              title={'Reference Data'}
              cardImage={referenceDataSvg}
              cardHeader={'Reference Data'}
              description={
                'Values used to standardize and categorize data elements within a system, making it easier to understand and compare data across different applications or processes.'
              }
              pathname={'/reference-data'}
              maxWidth={industryTestingResourceRow}
              imageWidth={industryTestingResourceRow + 'px'}
            />
            <CardWithImage
              title={'Implementation Guides'}
              cardImage={igSvg}
              cardHeader={'Implementation Guides'}
              description={
                'Implementation guides in healthcare serve as comprehensive documents outlining the specific rules, standards, and protocols for implementing interoperable health information systems.'
              }
              pathname={'/implementation-guide-authoring-tools'}
              maxWidth={industryTestingResourceRow}
              imageWidth={industryTestingResourceRow + 'px'}
              buttonTitle="Learn"
            />
          </Box>
        </Container>
      </Box>
    </>
  )
}
