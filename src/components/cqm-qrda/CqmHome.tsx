// MUI Imports
import BannerBox from '../shared/BannerBox'
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Typography,
} from '@mui/material'
// Global Imports
import Link from 'next/link'
// MUI Icons
import GitHubIcon from '@mui/icons-material/GitHub'
import LoginIcon from '@mui/icons-material/Login'
import StartIcon from '@mui/icons-material/Start'
import CheckIcon from '@mui/icons-material/Check'
import TrackChangesIcon from '@mui/icons-material/TrackChanges'
import { ArrowDownward, ArrowForward } from '@mui/icons-material'
// Styles
import palette from '@/styles/palette'
import SectionHeader from '../shared/SectionHeader'
import VerticalCard from './VerticalCard'
import CardWithBorder from '../shared/CardWithBorder'
// Images
const cypressKnowledgeBaseImagery = '/cqm-qrda/Cypress-Knowledge-Base1.svg'
const cypressValidatorImagery = '/cqm-qrda/Cypress-QRDA-Validator.svg'

// * Will bring in at a different time
// const hoverGrow = {
//
// }

const cypressCardWithImage = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  transition: 'transform 0.15s ease-in-out',
  '&:hover': {
    transform: 'scale3d(1.05, 1.05, 1)',
    boxShadow: '0px 0px 16px 8px rgba(0,0,0,0.1)',
  },
}

const cypressContentWithImage = {
  display: 'flex',
  flexDirection: 'column',
  flex: '1 auto',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  textAlign: 'left',
}

const cypressCardImage = {
  minWidth: '-webkit-fill-available',
  height: '175px',
}

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
          alignItems={'stretch'}
          gap={4}
        >
          {/* Cypress Card With Images */}
          <Box display={'flex'} flexDirection={'row'} height={'100%'} width={'60%'} gap={4}>
            <Box
              sx={{
                transition: 'transform 0.15s ease-in-out',
                width: '50%',
                '&:hover': {
                  transform: 'scale3d(1.05, 1.05, 1)',
                  boxShadow: '0px 0px 16px 8px rgba(0,0,0,0.1)',
                },
              }}
            >
              <CardActionArea aria-label="button" sx={{ height: '100%' }}>
                <Card
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <Link style={{ color: 'black', textDecoration: 'none' }} href="http://www.projectcypress.org/">
                    <Box minHeight={'150px'}>
                      <CardMedia sx={{ ...cypressCardImage }} image={cypressKnowledgeBaseImagery} />
                    </Box>
                    <Box minHeight={'150px'} sx={{ paddingX: 2, pt: 2 }}>
                      <Typography gutterBottom variant="h4" component="h3" color="default">
                        <strong>Cypress Knowledge Base</strong>
                      </Typography>
                      <Typography variant="body1" color="default">
                        The Cypress Knowledge Base is a starting point for vendors and Authorized Testing Labs
                        responsible for testing EHR technologies. The Knowledge Base has Frequently Asked Questions, as
                        well as links to additional eCQM resources.
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', pt: 4, pb: 2 }}>
                        <Typography sx={{ marginRight: 1 }} color="secondary">
                          Start Here
                        </Typography>
                        <ArrowDownward fontSize="small" color="secondary" />
                      </Box>
                    </Box>
                  </Link>
                </Card>
              </CardActionArea>
            </Box>
            <Box
              sx={{
                transition: 'transform 0.15s ease-in-out',
                width: '50%',
                '&:hover': {
                  transform: 'scale3d(1.05, 1.05, 1)',
                  boxShadow: '0px 0px 16px 8px rgba(0,0,0,0.1)',
                },
              }}
            >
              <CardActionArea aria-label="button" sx={{ height: '100%' }}>
                <Card
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <Link
                    style={{ color: 'black', textDecoration: 'none' }}
                    href="https://cypressvalidator.healthit.gov/"
                  >
                    <CardMedia sx={{ ...cypressCardImage }} image={cypressValidatorImagery} />
                    <Box minHeight={'160px'} sx={{ paddingX: 2, pt: 2 }}>
                      <Typography gutterBottom variant="h4" component="h3" color="default">
                        <strong>Cypress QRDA Validator</strong>
                      </Typography>
                      <Typography variant="body1" color="default">
                        The CYPRESS QRDA Validator provides implementers with the ability to validate the conformance of
                        QRDA Category I and Category III documents to the published CMS and HL7 implementation guides.
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', pt: 6, pb: 2 }}>
                        <Typography sx={{ marginRight: 1 }} color="secondary">
                          Validate
                        </Typography>
                        <ArrowDownward fontSize="small" color="secondary" />
                      </Box>
                    </Box>
                  </Link>
                </Card>
              </CardActionArea>
            </Box>
          </Box>
          {/* Vertical Cypress Resources */}
          <Box display={'flex'} flexDirection={'column'} width={'40%'} justifyContent={'space-between'} gap={2}>
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
