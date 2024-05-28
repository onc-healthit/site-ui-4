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
import ONCLogo from '@public/shared/ONCLogo-backgroundImage.png'
import Image from 'next/image'

import referenceDataSvg from '@public/home/reference-data.svg'
import CardWithImageHome from '@shared/CardWithImageHome'
import SectionHeader from '../shared/SectionHeader'

import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

export default function SiteHomeRows() {
  const maxWidth: number = 350
  const rowPaddingBottom: number = 20
  const industryTestingResourceRow: number = 350

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
    <Box sx={{ position: 'relative' }}>
      <Box>
        <Image
          style={{
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundColor: palette.primary,
            top: 0,
            left: 0,
            position: 'absolute',
            zIndex: -1,
            overflowX: 'clip',
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
          src={ONCLogo}
          alt="ONC Logo"
        />
      </Box>
      <Box>
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
                  'The ONC Direct Tool utilizes the Direct Standard® to provide a mechanism for developers and implementers to test the capabilities of securely transporting sensitive health care information over the open internet.'
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
                  'Resources that facilitates rigorous and repeatable testing for accurate calculation of CQMs for Eligible Providers & Hospitals.'
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
                  'The ePrescribing Test Suite supports a broad range of testing in support of the ePrescribing Community, including transport, messaging (content), and functional.'
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
                pathname={'https://hl7v2-iz-cdc-testing.nist.gov/iztool/#/home'}
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
          <Box sx={containerNoDragStyles}>
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
          </Box>
          {/* Row 3: Fixed: Industry Testing Resources */}
          <SectionHeader
            header={'Industry Resources'}
            subHeader={'Empowering Your Success with Top-Tier Industry Resources'}
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
                pathname={'/industry-resources#hl7'}
                maxWidth={industryTestingResourceRow}
                imageWidth={industryTestingResourceRow + 'px'}
                buttonTitle="Access"
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
                pathname={'/industry-resources#ig'}
                maxWidth={industryTestingResourceRow}
                imageWidth={industryTestingResourceRow + 'px'}
                buttonTitle="Learn"
              />
            </Box>
            <Box p={1}>
              <CardWithImageHome
                title={'/industry-resources#rd'}
                cardImage={referenceDataSvg}
                cardHeader={'Reference Data'}
                description={
                  'Values used to standardize and categorize data elements within a system, making it easier to understand and compare data across different applications or processes.'
                }
                pathname={'/industry-resources#rd'}
                maxWidth={industryTestingResourceRow}
                imageWidth={industryTestingResourceRow + 'px'}
              />
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}
