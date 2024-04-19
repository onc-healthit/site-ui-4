'use client'
import palette from '@/styles/palette'
import { Box, Container } from '@mui/material'
import atmSvg from '@public/home/alternative.svg'
import cCdaSvg from '@public/home/c-cda.svg'
import cpoeSvg from '@public/home/cpoe.svg'
import cqmtsvg from '@public/home/CQMT.svg'
import eRxSvg from '@public/home/erx.svg'
import phrSvg from '@public/home/phr.svg'
import directSvg from '@public/home/direct.svg'
import hl7Svg from '@public/home/hl7.svg'
import igSvg from '@public/home/ig.svg'
import iheSvg from '@public/home/ihe.svg'
import infernoSvg from '@public/home/inferno.svg'
import lanternSvg from '@public/home/lantern.svg'
import nistSvg from '@public/home/nist.svg'

import referenceDataSvg from '@public/home/reference-data.svg'
import CardWithImageHome from '@shared/CardWithImageHome'
import SectionHeader from '../shared/SectionHeader'

import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

export default function SiteHomeRows() {
  const maxWidth: number = 350
  const rowPaddingBottom: number = 20
  const industryTestingResourceRow: number = 350
  const imageURL: string = '../shared/ONCLogo-backgroundImage.png'

  const containerNoDragStyles = {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    gap: '18px',
    paddingBottom: `${rowPaddingBottom}px`,
  }
  const responsive = {
    desktop: {
      breakpoint: { max: Infinity, min: 1045 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  }
  return (
    <>
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
          {/* Row 1: Scrollable: ONC Certification Tools*/}
          <SectionHeader
            header={'ONC Certification Tools'}
            subHeader={'All tools required for certification.'}
            isHeaderAlternateColor={true}
          />
          <Carousel
            swipeable={true}
            keyBoardControl={true}
            showDots={true}
            infinite={false}
            draggable={false}
            responsive={responsive}
            removeArrowOnDeviceType={['mobile']}
            dotListClass="custom-dot-list-style"
            customTransition="all .5"
            transitionDuration={500}
          >
            <Box p={1}>
              <CardWithImageHome
                description={
                  'This is an instance of Inferno hosted by ONC for purposes of testing for the ONC Health IT Certification Program and to support community-driven health IT standards development projects.'
                }
                cardHeader={'Inferno FHIR Testing'}
                title={'Inferno FHIR Testing'}
                cardImage={infernoSvg}
                pathname={'https://inferno.healthit.gov/'}
                maxWidth={maxWidth}
                imageWidth={maxWidth + 'px'}
                buttonTitle="Start"
              />
            </Box>
            <Box p={1}>
              <CardWithImageHome
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
            </Box>
            <Box p={1}>
              <CardWithImageHome
                title={'Direct Project Tooling'}
                cardImage={directSvg}
                cardHeader={'Direct Project Tooling'}
                description={
                  'A collection of testing utilities created to validate the requirements of the ONC Health IT Certification Program.'
                }
                pathname={'/direct'}
                maxWidth={maxWidth}
                imageWidth={maxWidth + 'px'}
              />
            </Box>
            <Box p={1}>
              <CardWithImageHome
                title={'Clinical Quality Measure Testing'}
                cardImage={cqmtsvg}
                cardHeader={'Clinical Quality Measure Testing'}
                description={
                  'Sponsored by the ONC and developed by The MITRE Corporation, facilitates rigorous and repeatable testing for accurate calculation of CQMs for Eligible Providers & Hospitals.'
                }
                pathname={'/cqmt'}
                maxWidth={maxWidth}
                imageWidth={maxWidth + 'px'}
                buttonTitle="Start"
              />
            </Box>
            <Box p={1}>
              <CardWithImageHome
                title={'Electronic Prescribing (eRX) Tool'}
                cardImage={eRxSvg}
                cardHeader={'Electronic Prescribing (eRX) Tool'}
                description={
                  'ePrescribing Test Suite supports a broad range of testing in support of the ePrescribing Community, including transport, messaging (content), and functional.'
                }
                pathname={'https://tools.ncpdp.org/erx/#/home'}
                maxWidth={maxWidth}
                imageWidth={maxWidth + 'px'}
                buttonTitle="Start"
              />
            </Box>
            <Box p={1}>
              <CardWithImageHome
                title={'Public Health Reporting'}
                cardImage={phrSvg}
                cardHeader={'Public Health Reporting'}
                description={
                  'Explore public health reporting and CDA reporting tools, including HL7® CDA® Cancer Registry Reporting Validation Tool for validating cancer-related medical information. '
                }
                pathname={'/public-health-reporting'}
                maxWidth={maxWidth}
                imageWidth={maxWidth + 'px'}
                buttonTitle="Start"
              />
            </Box>
            <Box p={1}>
              <CardWithImageHome
                title={'Alternative Test Methods'}
                cardImage={atmSvg}
                cardHeader={'Alternative Test Methods'}
                description={
                  'Innovative approaches deviating from conventional techniques, aiming to enhance accuracy, efficiency, or ethical considerations in assessing health-related data, systems, or software solutions.'
                }
                pathname={'/alternative-test-methods'}
                maxWidth={maxWidth}
                imageWidth={maxWidth + 'px'}
                buttonTitle="Start"
              />
            </Box>
          </Carousel>
          {/* Row 2: Scrollable: General Testing Tools*/}
          <SectionHeader
            header={'General Testing Tools'}
            subHeader={'All tools not required for certification, but a benefit for your software!'}
            isHeaderAlternateColor={true}
          />
          <Carousel
            swipeable={true}
            draggable={false}
            keyBoardControl={true}
            showDots={true}
            infinite={false}
            responsive={responsive}
            autoPlaySpeed={1000}
            containerClass="carousel-container"
            removeArrowOnDeviceType={['tablet', 'mobile']}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-0-px"
          >
            <Box p={1}>
              <CardWithImageHome
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
            </Box>
            <Box p={1}>
              <CardWithImageHome
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
            </Box>
            <Box p={1}>
              <CardWithImageHome
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
            </Box>
            <Box p={1}>
              <CardWithImageHome
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
          </Carousel>
          {/* Row 3: Fixed: Industry Testing Resources */}
          <SectionHeader
            header={'Industry Testing Resources'}
            subHeader={'Outside tools may help you!'}
            isHeaderAlternateColor={true}
          />
          <Box sx={containerNoDragStyles}>
            <Box p={1}>
              <CardWithImageHome
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
            </Box>
            <Box p={1}>
              <CardWithImageHome
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
            </Box>
            <Box p={1}>
              <CardWithImageHome
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
          </Box>
        </Container>
      </Box>
    </>
  )
}
