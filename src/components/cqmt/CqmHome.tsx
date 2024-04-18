// MUI Imports
import BannerBox from '../shared/BannerBox'
import { Box, Container, Divider, Typography } from '@mui/material'
// Global Imports
import Link from 'next/link'
// MUI Icons
import GitHubIcon from '@mui/icons-material/GitHub'
import LoginIcon from '@mui/icons-material/Login'
import CardWithImage from '@shared/CardWithImage'
import TrackChangesIcon from '@mui/icons-material/TrackChanges'
import { AnnouncementOutlined, ArrowForward, TipsAndUpdatesOutlined } from '@mui/icons-material'
// import cypressKnowledgeBaseImagery from '@public/cqm-qrda/Cypress-Knowledge-Base1.svg'
import cypressImagery from '@public/cqm-qrda/Cypress.svg'
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
          <Link color={palette.secondary} href={'/cqmt'}>
            Clinical Quality Measure Testing
          </Link>
        }
        heading={'Clinical Quality Measure Testing'}
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
          <Box display={'flex'} gap={4} justifyContent={'space-between'} alignItems={'flex-start'}>
            {/* <CardWithImage
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
            /> */}
            <CardWithImage
              title={'Cypress'}
              cardImage={cypressImagery}
              cardHeader={'Rigorous & repeatable testing of Electronic Health Records'}
              description={
                'Cypress is the rigorous and repeatable testing tool of Electronic Health Records (EHR) and EHR modules in calculating eCQMs used by CMS’s Quality Reporting Programs. The Cypress tool is open source and freely available for use or adoption by the health IT community including EHR vendors and testing labs. Cypress serves as the official testing tool for the EHR Certification program supported by the Office of the National Coordinator for Health IT (ONC).'
              }
              pathname={'https://www.healthit.gov/cypress/'}
              maxWidth={900}
              imageWidth={'100%'}
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
        <Box gap={4} display={'flex'} flexDirection={'row'} width={'100%'} mb={4}>
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
          <Box
            border={`1px solid ${palette.grey}`}
            borderRadius={2}
            padding={8}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-between'}
            flexDirection={'row'}
            width={'50%'}
          >
            <Typography align="center" variant="body2" color={palette.greyDark}>
              <TipsAndUpdatesOutlined color="primary" />
              <br />
              Stay tuned for future releases where additional resources for Clinical Quality Measure Testing Tools may
              be available on this page.
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default CqmHome
