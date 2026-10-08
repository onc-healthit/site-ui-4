'use client'
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
import { useTheme } from '@mui/material'

// const hoverGrow = {
//   transition: 'transform 0.15s ease-in-out',
//   '&:hover': {
//     transform: 'scale3d(1.05, 1.05, 1)',
//     boxShadow: '0px 0px 16px 8px rgba(0,0,0,0.1)',
//   },
// }

const PHRHome = () => {
  const theme = useTheme()

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
            programs in the Centers for Disease Control and Prevention.
          </>
        }
      />
      {/* Main Content */}
      <Container>
        {/* CDA Reporting Header */}
        <SectionHeader header={'CDA Reporting'} subHeader={'Ensuring CDA Compliance: Precision in Reporting'} />
        {/* Other Tools & Resources Content */}
        <Box
          sx={{
            gap: 4,
            pb: 8,
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            width: '100%',
            [theme.breakpoints.down('md')]: {
              flexDirection: 'column',
              gap: '16px',
            },
          }}
        >
          {/* HL7® CDA®*/}

          <CardWithBorder
            cardHeader={'Cancer Registry Validator'}
            subHeader="170.315(f)(4)"
            description={
              'The Cancer Report  (CRV) is an interactive tool for validating the content of electronic submissions of cancer-related medical information prior to a systems communication with a cancer registry.'
            }
            buttonTitle={'Go to validator'}
            buttonLink={'http://tools.valitheus.com/cda/'}
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
            cardHeader={'National Health Care Surveys Validators (CDA, versions 1.0 to 1.2)'}
            subHeader="170.315(f)(7)"
            description={
              'Facilitate testing of National Health Care Surveys CDA XML documents conformant to HL7 Implementation Guide for CDA® Release 2: National Health Care Surveys (NHCS)'
            }
            buttonTitle={'Go to validator'}
            buttonLink={'http://tools.valitheus.com/cda/'}
            buttonIcon={<ArrowForwardIcon />}
          />
          {/* HL7® CDA® National Health Care Surveys Validator */}
          <CardWithBorder
            cardHeader={'National Health Care Surveys Validators (CDA, versions 3.0 and 3.1): Available within GVT'}
            subHeader="170.315(f)(7)"
            description={
              'Facilitate testing of National Health Care Surveys CDA XML documents conformant to HL7 Implementation Guide for CDA® Release 2: National Health Care Surveys (NHCS)'
            }
            buttonTitle={'Go to validator'}
            buttonLink={'http://tools.valitheus.com/gvt/'}
            buttonIcon={<ArrowForwardIcon />}
          />          
        </Box>
        <Divider sx={{ p: 2, borderBottomWidth: 2 }} />
        {/* Reporting Header */}
        <SectionHeader header={'Public Health Reporting'} subHeader={'Elevating Healthcare Data Integrity'} />
        {/* Other Tools & Resources Content */}
        <Box
          sx={{
            gap: 4,
            pb: 8,
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            width: '100%',
            [theme.breakpoints.down('md')]: {
              flexDirection: 'column',
              gap: '16px',
            },
          }}
        >
          {' '}
          {/*  HL7® v2 Immunization Test Suite Card */}
          <CardWithBorder
            cardHeader={'HL7® v2 Immunization Test Suite Edition 1'}
            subHeader="170.315(f)(1)"
            description={
              'The Immunization Test Suite supports a broad range of testing in support of the Immunization Community, including transport, messaging (content), and functional.'
            }
            buttonTitle={'Go to test suite'}
            buttonLink={'http://tools.valitheus.com/immunization-edition1/'}
            buttonIcon={<ArrowForwardIcon />}
          />
          {/*  HL7® v2 Immunization Test Suite Card */}
          <CardWithBorder
            cardHeader={'HL7® v2 Immunization Test Suite Edition 2 (SVAP 2024)'}
            subHeader="170.315(f)(1)"
            description={
              'The Immunization Test Suite supports a broad range of testing in support of the Immunization Community, including transport, messaging (content), and functional.'
            }
            buttonTitle={'Go to test suite'}
            buttonLink={'https://tools.valitheus.com/immunization-edition2/'}
            buttonIcon={<ArrowForwardIcon />}
          />          
          {/* HL7® v2 Syndromic Surveillance Test Suite */}
          <CardWithBorder
            cardHeader={'HL7® v2 Syndromic Surveillance Test Suite Edition 1 '}
            subHeader="170.315(f)(2) "
            description={
              'The Syndromic Surveillance Test Suite supports the testing of HL7 v2.5.1 messages in support of the Syndromic Surveillance Community.'
            }
            buttonTitle={'Go to test suite'}
            buttonLink={'http://tools.valitheus.com/syndromic-edition1/'}
            buttonIcon={<ArrowForwardIcon />}
          />          
          {/* HL7® v2 Syndromic Surveillance Test Suite */}
          <CardWithBorder
            cardHeader={'HL7® v2 Syndromic Surveillance Test Suite Edition 2 ( SVAP 2024)'}
            subHeader="170.315(f)(2) "
            description={
              'The Syndromic Surveillance Test Suite supports the testing of HL7 v2.5.1 messages in support of the Syndromic Surveillance Community.'
            }
            buttonTitle={'Go to test suite'}
            buttonLink={'http://tools.valitheus.com/syndromic-edition2/'}
            buttonIcon={<ArrowForwardIcon />}
          />
          <CardWithBorder
            cardHeader={'Electronic Laboratory Reporting (ELR) Validation Tool (Electronic Laboratory Reporting)'}
            subHeader="170.315(f)(3)"
            description={
              'The Electronic Lab Reporting (ELR) Validation Suite is intended to be used for ONC Certification Program testing. The validation suite provides functionality to test HIT senders.'
            }
            buttonTitle={'Go to test suite'}
            buttonLink={'http://tools.valitheus.com/mu-elr/'}
            buttonIcon={<ArrowForwardIcon />}
          />
        </Box>
      </Container>
    </Box>
  )
}

export default PHRHome
