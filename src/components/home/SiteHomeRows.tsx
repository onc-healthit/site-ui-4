'use client'
import palette from '@/styles/palette'
import { Box, Container, Skeleton } from '@mui/material'
import { useTheme, Theme } from '@mui/material/styles'
import {
  atmSvg,
  cCdaSvg,
  cpoeSvg,
  cqmtsvg,
  eRxSvg,
  phrSvg,
  directSvg,
  hl7Svg,
  igSvg,
  MITRESvg,
  iheSvg,
  infernoSvg,
  infernoValidatorSvg,
  lanternSvg,
} from '@public/home'
import ONCLogo from '@public/shared/LogoBackgroundImage.png'
import Image from 'next/image'
import CardWithImageHome from '@shared/CardWithImageHome'
import SectionHeader from '../shared/SectionHeader'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { useState, useEffect } from 'react'
import { SxProps } from '@mui/system'

export default function SiteHomeRows() {
  const theme = useTheme()
  const maxWidth = 350
  const rowPaddingBottom = 64
  const industryTestingResourceRow = 350

  // Loading state
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate a loading state
    const timer = setTimeout(() => setLoading(false), 300) // Example loading time
    return () => clearTimeout(timer)
  }, [])

  const containerNoDragStyles: SxProps<Theme> = {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    gap: '41px',
    flexWrap: 'wrap',
    paddingBottom: `${rowPaddingBottom}px`,
    [theme.breakpoints.down('md')]: {
      flexDirection: 'row',
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      gap: '16px',
      width: '80%',
    },
  }
  const responsive = {
    desktop: {
      breakpoint: { max: Infinity, min: 1100 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 975, min: 600 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 600, min: 0 },
      items: 1,
    },
  }
  const skeleton = (
    <Box display={'flex'} gap={4} p={1}>
      <Box>
        <Skeleton variant="rectangular" width={maxWidth} height={200} />
        <Skeleton width="60%" />
        <Skeleton width="90%" />
        <Skeleton width="30%" />
      </Box>
      <Box>
        <Skeleton variant="rectangular" width={maxWidth} height={200} />
        <Skeleton width="60%" />
        <Skeleton width="90%" />
        <Skeleton width="30%" />
      </Box>
      <Box>
        <Skeleton variant="rectangular" width={maxWidth} height={200} />
        <Skeleton width="60%" />
        <Skeleton width="90%" />
        <Skeleton width="30%" />
      </Box>
    </Box>
  )

  return (
    <Box sx={{ position: 'relative' }}>
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
          objectFit: 'none',
          objectPosition: 'right',
        }}
        src={ONCLogo}
        alt="ONC Logo"
        loading="lazy"
      />
      <Box>
        <Container sx={{ px: 4 }}>
          {/* Row 1: Scrollable: ONC Certification Tools */}
          <SectionHeader
            header="ONC Certification Tools"
            subHeader="All tools required for certification."
            isHeaderAlternateColor
            isSubHeaderAlternateColor={palette.secondaryLight}
          />
          {loading ? (
            skeleton
          ) : (
            <Box>
              <Carousel
                swipeable
                keyBoardControl
                showDots
                infinite={false}
                draggable={false}
                responsive={responsive}
                removeArrowOnDeviceType={['mobile']}
                dotListClass="custom-dot-list-style"
                customTransition="all .5"
                transitionDuration={500}
                partialVisible={true}
              >
                {[
                  {
                    title: 'Inferno FHIR® Testing',
                    description:
                      'This is an instance of Inferno hosted by ASTP for purposes of testing for the ONC Health IT Certification Program and to support community-driven health IT standards development projects.',
                    cardImage: infernoSvg,
                    pathname: 'https://inferno.healthit.gov/',
                  },
                  {
                    title: 'C-CDA Testing',
                    description:
                      'These tools will help test C-CDA documents for conformance to the C-CDA IG, and also help with quantitative assessment of the data quality using the Scorecard',
                    cardImage: cCdaSvg,
                    pathname: '/c-cda',
                  },
                  {
                    title: 'Direct Tooling',
                    description:
                      'The ASTP Direct Tool utilizes the Direct Standard® to provide a mechanism for developers and implementers to test the capabilities of securely transporting sensitive health care information over the open internet.',
                    cardImage: directSvg,
                    pathname: '/direct',
                  },
                  {
                    title: 'Clinical Quality Measure Testing',
                    description:
                      'Resources that facilitates rigorous and repeatable testing for accurate calculation of CQMs for Eligible Providers & Hospitals.',
                    cardImage: cqmtsvg,
                    pathname: '/cqmt',
                  },
                  {
                    title: 'Electronic Prescribing (eRX) Tool',
                    description:
                      'The ePrescribing Test Suite supports a broad range of testing in support of the ePrescribing Community, including transport, messaging (content), and functional.',
                    cardImage: eRxSvg,
                    pathname: 'https://erx.healthit.gov/erx/',
                  },
                  {
                    title: 'Public Health Reporting',
                    description: `These tools support the public health criteria in the ONC Certification Program. The public health criteria help promote interoperability to support State, Tribal, Local, and Territorial Health Departments and programs in the Centers for Disease Control and Prevention.`,
                    cardImage: phrSvg,
                    pathname: '/public-health-reporting',
                  },
                  {
                    title: 'Alternative Test Methods',
                    description:
                      'Innovative approaches deviating from conventional techniques, aiming to enhance accuracy, efficiency, or ethical considerations in assessing health-related data, systems, or software solutions.',
                    cardImage: atmSvg,
                    pathname: 'https://hl7v2-iz-cdc-testing.nist.gov/iztool/#/home',
                  },
                ].map((card, index) => (
                  <Box key={index} p={1}>
                    <CardWithImageHome
                      title={card.title}
                      cardImage={card.cardImage}
                      cardHeader={card.title}
                      description={card.description}
                      pathname={card.pathname}
                      maxWidth={maxWidth}
                      imageWidth={`${maxWidth}px`}
                      buttonTitle="Start"
                    />
                  </Box>
                ))}
              </Carousel>
            </Box>
          )}
          {/* Row 2: Scrollable: General Testing Tools */}
          <SectionHeader
            header="General Testing Tools"
            subHeader="All tools not required for certification, but a benefit for your software!"
            isHeaderAlternateColor
            isSubHeaderAlternateColor={palette.secondaryLight}
          />
          {loading ? (
            skeleton
          ) : (
            <Box>
              <Carousel
                swipeable
                keyBoardControl
                showDots
                infinite={false}
                draggable={false}
                responsive={responsive}
                removeArrowOnDeviceType={['mobile']}
                dotListClass="custom-dot-list-style"
                customTransition="all .5"
                transitionDuration={500}
                partialVisible={true}
              >
                {[
                  {
                    title: 'CPOE Evaluation Tool',
                    description:
                      'A CPOE evaluation tool is a software or solution designed to assess the effectiveness, efficiency, and user satisfaction of a CPOE system.',
                    cardImage: cpoeSvg,
                    pathname: 'https://www.leapfroggroup.org/survey-materials/prepare-cpoe-tool',
                  },
                  {
                    title: 'IHE Testing Tools',
                    description:
                      'Our software applications designed to test the interoperability and compliance of healthcare information systems with IHE integration profiles and standards.',
                    cardImage: iheSvg,
                    pathname: 'https://www.ihe.net/testing/testing_tools',
                  },
                  {
                    title: 'Lantern Project',
                    description:
                      'A fast Healthcare Interoperability Resources (FHIR®) Application Programming Interface (API) Monitoring System, otherwise known as Lantern.',
                    cardImage: lanternSvg,
                    pathname: 'https://lantern.healthit.gov/?tab=dashboard_tab',
                  },
                  {
                    title: 'Inferno Resource Validator',
                    description:
                      'FHIR® Validator validates your resources using the profile URLs found in the "meta.profile" field of your resource (or the Base FHIR® profiles if no profile URLs are present).',
                    cardImage: infernoValidatorSvg,
                    pathname: 'https://inferno.healthit.gov/validator/',
                  },
                ].map((card, index) => (
                  <Box key={index} p={1}>
                    <CardWithImageHome
                      title={card.title}
                      cardImage={card.cardImage}
                      cardHeader={card.title}
                      description={card.description}
                      pathname={card.pathname}
                      maxWidth={maxWidth}
                      imageWidth={`${maxWidth}px`}
                      buttonTitle="Start"
                    />
                  </Box>
                ))}
              </Carousel>
            </Box>
          )}

          {/* Row 3: Fixed: Industry Testing Resources */}
          <SectionHeader
            header="Industry Resources"
            subHeader="Empowering Your Success with Top-Tier Industry Resources."
            isHeaderAlternateColor
            isSubHeaderAlternateColor={palette.secondaryLight}
          />
          <Box sx={{ ...containerNoDragStyles }}>
            {loading
              ? skeleton
              : [
                  {
                    title: 'HL7® Tools',
                    description:
                      'Assess the conformance, interoperability, and functionality of healthcare information systems implementing HL7® standards.',
                    cardImage: hl7Svg,
                    pathname: '/industry-resources#hl7',
                  },
                  {
                    title: 'Implementation Guides',
                    description:
                      'Implementation guides in healthcare serve as comprehensive documents outlining the specific rules, standards, and protocols for implementing interoperable health information systems.',
                    cardImage: igSvg,
                    pathname: '/industry-resources#ig',
                  },
                  {
                    title: 'MITRE Github',
                    description: `Visit MITRE's GitHub page to explore a wealth of open-source repositories. MITRE, a leader in innovative research and technology, offers a variety of projects that span cybersecurity, artificial intelligence, healthcare, and more.`,
                    cardImage: MITRESvg,
                    pathname: '/industry-resources#mg',
                  },
                ].map((card, index) => (
                  <Box key={index} p={1}>
                    <CardWithImageHome
                      title={card.title}
                      cardImage={card.cardImage}
                      cardHeader={card.title}
                      description={card.description}
                      pathname={card.pathname}
                      maxWidth={industryTestingResourceRow}
                      imageWidth={`${industryTestingResourceRow}px`}
                      buttonTitle="Access"
                    />
                  </Box>
                ))}
          </Box>
        </Container>
      </Box>
    </Box>
  )
}
