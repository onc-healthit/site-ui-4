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
            Explore public health reporting and CDA reporting tools, including HL7® CDA® Cancer Registry Reporting
            Validation Tool for validating cancer-related medical information. Additionally, ensure compliance with
            HL7® CDA® National Health Care Surveys Validator for testing CDA XML documents. NIST offers specialized
            test suites like the HL7® v2 Immunization and Syndromic Surveillance Test Suites, along with the Electronic
            Laboratory Reporting Validation Suite for HIT certification testing.
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
            description={
              'The Cancer Report  (CRV) is an interactive tool for validating the content of electronic submissions of cancer-related medical information prior to a systems communication with a cancer registry.'
            }
            buttonTitle={'Go to validator'}
            buttonLink={'https://cda-validation.nist.gov/cda-validation/muCRV.html'}
            buttonIcon={<ArrowForwardIcon />}
          />

          {/* HL7® CDA® National Health Care Surveys Validator */}
          <CardWithBorder
            cardHeader={'HL7® CDA® National Health Care Surveys Validator'}
            description={
              'Facilitate testing of National Health Care Surveys CDA XML documents conformant to HL7 Implementation Guide for CDA® Release 2: National Health Care Surveys (NHCS)'
            }
            buttonTitle={'Go to validator'}
            buttonLink={'https://cda-validation.nist.gov/cda-validation/muNHCS.html'}
            buttonIcon={<ArrowForwardIcon />}
          />
          {/* Antimicrobial use and resistance HL7® CDA® validato*/}
          <CardWithBorder
            cardHeader={'Antimicrobial use and resistance HL7® CDA® validator'}
            description={
              'This validator is not intended for use with PHI/PII. Only use this validator with test/sample data that contains no PHI/PII.'
            }
            buttonTitle={'Go to validator'}
            buttonLink={'https://validator-legacy.lantanagroup.com/validator/'}
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
            description={
              'The NIST Syndromic Surveillance Test Suite supports the testing of HL7 v2.5.1 messages in support of the Syndromic Surveillance Community.'
            }
            buttonTitle={'Go to test suite'}
            buttonLink={'https://hl7v2-ss-r2-testing.nist.gov/ss-r2/#/home'}
            buttonIcon={<ArrowForwardIcon />}
          />
          <CardWithBorder
            cardHeader={'NIST Electronic Laboratory Reporting (ELR) Validation Suite'}
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
