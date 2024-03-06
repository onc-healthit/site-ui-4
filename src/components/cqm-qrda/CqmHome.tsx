// MUI Imports
import BannerBox from '../shared/BannerBox'
import { Box, Container, Divider } from '@mui/material'
// Global Imports
import Link from 'next/link'
// MUI Icons
import GitHubIcon from '@mui/icons-material/GitHub'
import LoginIcon from '@mui/icons-material/Login'
import CardWithImage from '@shared/CardWithImage'
import TrackChangesIcon from '@mui/icons-material/TrackChanges'
import { ArrowForward } from '@mui/icons-material'
import cypressKnowledgeBaseImagery from '@public/cqm-qrda/Cypress-Knowledge-Base1.svg'
import cypressValidatorImagery from '@public/cqm-qrda/Cypress-QRDA-Validator.svg'
// Styles
import palette from '@/styles/palette'
import SectionHeader from '../shared/SectionHeader'
import VerticalCard from './VerticalCard'
import CardWithBorder from '../shared/CardWithBorder'
// Images
const maxWidth: number = 320

const CqmHome = () => {
  return (
    <Box>
      {/* Global Header */}
      <BannerBox
        breadcrumbs={
          <Link color={palette.secondary} href={'/cqm-qrda'}>
            CQM-QRDA
          </Link>
        }
        heading={'CQM QDRA Testing'}
        description={
          <>
            {
              "Cypress, the official testing tool for EHR Certification under ONC's 2014 and 2015 Certification Editions, ensures precise evaluation of Clinical Quality Measures (CQM) in Electronic Health Records. Tailored for both EHR vendors and Authorized Testing Labs, Cypress, sponsored by the Office of the National Coordinator for Health IT and developed by The MITRE Corporation, facilitates rigorous and repeatable testing for accurate calculation of CQMs for Eligible Providers and Hospitals."
            }
          </>
        }
      />
      {/* Main Content */}
      <Container>
        {/* Cypress Header*/}
        <SectionHeader
          header={'Cypress'}
          subHeader={'Elevating EHR Testing for CMS Quality Reporting – Open Source Excellence.'}
        />

        {/* Cypress Content*/}
        <Box
          display={'flex'}
          flexDirection={'row'}
          width={'100%'}
          justifyContent={'space-between'}
          gap={4}
          alignItems={'flex-start'}
        >
          {/* Cypress Card With Images */}
          <Box display={'flex'} width={'100%'} gap={4} justifyContent={'space-between'} alignItems={'flex-start'}>
            <CardWithImage
              title={'Cypress Knowledge Base'}
              cardImage={cypressKnowledgeBaseImagery}
              cardHeader={'Cypress Knowledge Base'}
              description={
                'The Cypress Knowledge Base is a starting point for vendors and Authorized Testing Lab responsible for testing EHR technologies. The Knowledge Base has Frequently Asked Questions, as well as eCQM resources.'
              }
              pathname={'http://www.projectcypress.org/'}
              maxWidth={maxWidth}
              imageWidth={maxWidth + 'px'}
              buttonTitle="Access"
            />
            <CardWithImage
              title={'Cypress QRDA Validator'}
              cardImage={cypressValidatorImagery}
              cardHeader={'Cypress QRDA Validator'}
              description={
                'The CYPRESS QRDA Validator provides implementers with the ability to validate the conformance of QRDA Category I and Category III documents to the published CMS and HL7 implementation guides.'
              }
              pathname={'https://cypressvalidator.healthit.gov/'}
              maxWidth={maxWidth}
              imageWidth={maxWidth + 'px'}
              buttonTitle="Validate"
            />
          </Box>
          {/* Vertical Cypress Resources */}
          <Box display={'flex'} flexDirection={'column'} width={'100%'} justifyContent={'space-between'} gap={2}>
            <VerticalCard
              title={'Demo Cypress'}
              description={
                'Experiment with the current Cypress Baseline (Note: You will be prompted to log in with your NLM UMLS credentials)'
              }
              buttonTitle={'ACCESS LOGIN'}
              buttonIcon={<LoginIcon />}
              buttonHref={'https://cypressdemo.healthit.gov/'}
            />
            <VerticalCard
              title={'Install Cypress'}
              description={
                'Download your own instance of Cypress to test and experiment with prior to certification with an Accredited Testing Laboratory.'
              }
              buttonTitle={'Go to GitHub'}
              buttonIcon={<GitHubIcon />}
              buttonHref={'https://github.com/projectcypress/cypress/wiki'}
            />
            <VerticalCard
              title={'Cypress Issue Tracker'}
              description={'Track questions and issue that Cypress supports'}
              buttonTitle={'TRACK your question'}
              buttonIcon={<TrackChangesIcon />}
              buttonHref={'https://jira.oncprojectracking.org/browse/CYPRESSef'}
            />
          </Box>
        </Box>
        <Divider sx={{ p: 2, borderBottomWidth: 2 }} />
        {/* Other Tools & Resources Header */}
        <SectionHeader
          header={'Other CQM Tools & Resources'}
          subHeader={'Expanding Your Toolkit: Explore a Range of CQM Tools and Resources Beyond the Basics.'}
        />
        {/* Other Tools & Resources Content */}
        <Box gap={4} display={'flex'} justifyContent={'space-between'} flexDirection={'row'} width={'100%'}>
          {/* Bonnie Card */}
          <CardWithBorder
            cardHeader={'BONNIE'}
            description={
              'Bonnie is a tool for testing electronic clinical quality measures (eCQMs) designed to support streamlined and efficient pre-testing of eCQMs, particularly those used in the CMS Quality Reporting Programs.'
            }
            buttonTitle={'ACCESS'}
            buttonLink={''}
            buttonIcon={<ArrowForward />}
          />

          {/* eCQI Resource CenterCard */}
          <CardWithBorder
            cardHeader={'eCQI Resource Center'}
            description={
              'The one-stop shop for the most current resources to support electronic clinical quality improvement.'
            }
            buttonTitle={'Go to center'}
            buttonLink={''}
            buttonIcon={<ArrowForward />}
          />
        </Box>
        <Divider sx={{ p: 2, borderBottomWidth: 2 }} />
      </Container>
    </Box>
  )
}

export default CqmHome
