// MUI Imports
import BannerBox from '../shared/BannerBox'
import { Box, Container, Divider } from '@mui/material'
// Global Imports
import Link from 'next/link'
// MUI Icons
import ArrowForwardIcon from '@mui/icons-material/ArrowDownward'
// Styles
import palette from '@/styles/palette'
import SectionHeader from '../shared/SectionHeader'
import CardWithBorder from '../shared/CardWithBorder'
// Images

// * Will bring in at a different time
// const hoverGrow = {
//   transition: 'transform 0.15s ease-in-out',
//   '&:hover': {
//     transform: 'scale3d(1.05, 1.05, 1)',
//     boxShadow: '0px 0px 16px 8px rgba(0,0,0,0.1)',
//   },
// }

const PHRHome = () => {
  return (
    <Box>
      {/* Global Header */}
      <BannerBox
        breadcrumbs={
          <Link color={palette.secondary} href={'/public-health-reporting'}>
            Public Health Reporting
          </Link>
        }
        heading={'Public Health Reporting'}
        description={
          <>
            These tools support the public health criteria in the ONC Certification Program. The public health criteria
            help promote interoperability to support State, Tribal, Local, and Territorial Health Departments and
            programs in the Centers for Disease Control and Prevention. Most of the public health tooling for the ONC
            Certification Program is developed using {''}
            <span>
              <Link
                href={
                  'https://www.nist.gov/itl/ssd/systems-interoperability-group/nist-test-tools-onc-health-it-certification-program'
                }
              >
                NIST tooling.
              </Link>
            </span>
          </>
        }
      />
      {/* Main Content */}
      <Container>
        {/* CDA Reporting Header */}
        <SectionHeader header={'CDA Reporting'} subHeader={'Ensuring CDA Compliance: Precision in Reporting'} />
        {/* Other Tools & Resources Content */}
        <Box gap={4} display={'flex'} justifyContent={'space-between'} flexDirection={'row'} width={'100%'}>
          {/* HL7® CDA® Cancer Registry Reporting Validation Tool*/}

          <CardWithBorder
            cardHeader={'HL7® CDA® Cancer Registry Reporting Validation Tool'}
            subHeader="170.315(f)(4)"
            description={
              'The Cancer Report  (CRV) is an interactive tool for validating the content of electronic submissions of cancer-related medical information prior to a systems communication with a cancer registry.'
            }
            buttonTitle={'Go to validator'}
            buttonLink={'https://cda-validation.nist.gov/cda-validation/muCRV.html'}
            buttonIcon={<ArrowForwardIcon />}
          />
          {/* Antimicrobial use and resistance HL7® CDA® validato*/}
          <CardWithBorder
            cardHeader={'Antimicrobial use and resistance HL7® CDA® validator'}
            subHeader="170.315(f)(6)"
            description={
              'This validator is not intended for use with PHI/PII. Only use this validator with test/sample data that contains no PHI/PII.'
            }
            buttonTitle={'Go to validator'}
            buttonLink={'https://validator-legacy.lantanagroup.com/validator/'}
            buttonIcon={<ArrowForwardIcon />}
          />
          {/* HL7® CDA® National Health Care Surveys Validator */}
          <CardWithBorder
            cardHeader={'HL7® CDA® National Health Care Surveys Validator'}
            subHeader="170.315(f)(7)"
            description={
              'Facilitate testing of National Health Care Surveys CDA XML documents conformant to HL7 Implementation Guide for CDA® Release 2: National Health Care Surveys (NHCS)'
            }
            buttonTitle={'Go to validator'}
            buttonLink={'https://cda-validation.nist.gov/cda-validation/muNHCS.html'}
            buttonIcon={<ArrowForwardIcon />}
          />
        </Box>
        <Divider sx={{ p: 2, borderBottomWidth: 2 }} />
        {/* NIST Reporting Header */}
        <SectionHeader
          header={'NIST Reporting'}
          subHeader={'Elevating Healthcare Data Integrity: NIST Reporting Excellence.'}
        />
        {/* Other Tools & Resources Content */}
        <Box gap={4} pb={8} display={'flex'} justifyContent={'space-between'} flexDirection={'row'} width={'100%'}>
          {/* NIST HL7® v2 Immunization Test Suite Card */}
          <CardWithBorder
            cardHeader={'NIST HL7® v2 Immunization Test Suite'}
            subHeader="170.315(f)(1)"
            description={
              'The NIST Immunization Test Suite supports a broad range of testing in support of the Immunization Community, including transport, messaging (content), and functional.'
            }
            buttonTitle={'Go to test suite'}
            buttonLink={'https://hl7v2-iz-r1-5-testing.nist.gov/iztool/#/home'}
            buttonIcon={<ArrowForwardIcon />}
          />
          {/* NIST HL7® v2 Syndromic Surveillance Test Suite */}
          <CardWithBorder
            cardHeader={'NIST HL7® v2 Syndromic Surveillance Test Suite'}
            subHeader="170.315(f)(2) "
            description={
              'The NIST Syndromic Surveillance Test Suite supports the testing of HL7 v2.5.1 messages in support of the Syndromic Surveillance Community.'
            }
            buttonTitle={'Go to test suite'}
            buttonLink={'https://hl7v2-ss-r2-testing.nist.gov/ss-r2/#/home'}
            buttonIcon={<ArrowForwardIcon />}
          />
          <CardWithBorder
            cardHeader={'NIST Electronic Laboratory Reporting (ELR) Validation Suite'}
            subHeader="170.315(f)(3)"
            description={
              'The NIST Electronic Lab Reporting (ELR) Validation Suite is intended to be used for Health IT ONC 2014 and 2015 Edition certification testing. The validation suite provides functionality to test HIT senders.'
            }
            buttonTitle={'Go to test suite'}
            buttonLink={'https://hl7v2-elr-testing.nist.gov/mu-elr/'}
            buttonIcon={<ArrowForwardIcon />}
          />
        </Box>
      </Container>
    </Box>
  )
}

export default PHRHome
