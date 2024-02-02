// MUI Imports
import BannerBox from '../shared/BannerBox'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Divider,
  Typography,
} from '@mui/material'
// Global Imports
import Link from 'next/link'
// MUI Icons
import ArrowForwardIcon from '@mui/icons-material/ArrowDownward'
import GitHubIcon from '@mui/icons-material/GitHub'
import LoginIcon from '@mui/icons-material/Login'
import StartIcon from '@mui/icons-material/Start'
import CheckIcon from '@mui/icons-material/Check'
import TrackChangesIcon from '@mui/icons-material/TrackChanges'
// Styles
import palette from '@/styles/palette'
// Images
const cypressKnowledgeBaseImagery = '/cqm-qrda/Cypress-Knowledge-Base1.svg'
const cypressValidatorImagery = '/cqm-qrda/Cypress-QRDA-Validator.svg'

// * Will bring in at a different time
// const hoverGrow = {
//   transition: 'transform 0.15s ease-in-out',
//   '&:hover': {
//     transform: 'scale3d(1.05, 1.05, 1)',
//     boxShadow: '0px 0px 16px 8px rgba(0,0,0,0.1)',
//   },
// }

const genericCardBlueBorder = {
  display: 'flex',
  width: '50%',
  borderTop: '16px solid #122953',
}

const cypressCardWithImage = {
  width: '50% ',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
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

const flexibleContent = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: 2,
  p: 2,
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
            Cypress, the official testing tool for EHR Certification under ONC's 2014 and 2015 Certification Editions,
            ensures precise evaluation of Clinical Quality Measures (CQM) in Electronic Health Records. Tailored for
            both EHR vendors and Authorized Testing Labs, Cypress, sponsored by the Office of the National Coordinator
            for Health IT and developed by The MITRE Corporation, facilitates rigorous and repeatable testing for
            accurate calculation of CQMs for Eligible Providers and Hospitals.
          </>
        }
      />
      {/* Main Content */}
      <Container>
        {/* Cypress Header*/}
        <Box paddingTop={4} paddingBottom={4}>
          <Typography variant="h4" component={'h2'}>
            <strong>Cypress</strong>
          </Typography>
          <Typography variant="body1" color="secondary">
            <strong>Elevating EHR Testing for CMS Quality Reporting – Open Source Excellence.</strong>
          </Typography>
        </Box>
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
          <Box display={'flex'} flexDirection={'row'} width={'60%'} gap={4}>
            <Card
              sx={{
                ...cypressCardWithImage,
              }}
              id=""
            >
              <CardMedia sx={{ ...cypressCardImage }} component="div" image={cypressKnowledgeBaseImagery} />
              <CardContent
                sx={{
                  ...cypressContentWithImage,
                }}
              >
                <Typography variant="h6" component="h3" color="default">
                  <strong>Cypress Knowledge Base</strong>
                </Typography>
                <Typography variant="body2" color="default">
                  The Cypress Knowledge Base is a starting point for vendors and Authorized Testing Labs responsible for
                  testing EHR technologies. The Knowledge Base has Frequently Asked Questions, as well as links to
                  additional eCQM resources.
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  disableRipple
                  href="http://www.projectcypress.org/"
                  size="small"
                  variant="text"
                  color="secondary"
                  endIcon={<StartIcon />}
                >
                  START HERE
                </Button>
              </CardActions>
            </Card>
            <Card sx={{ ...cypressCardWithImage }} id="">
              <CardMedia sx={{ ...cypressCardImage }} component="div" image={cypressValidatorImagery} />
              <CardContent
                sx={{
                  ...cypressContentWithImage,
                }}
              >
                <Typography variant="h6" component="h3" color="default">
                  <strong>Cypress QRDA Validator</strong>
                </Typography>
                <Typography variant="body2" color="default">
                  The CYPRESS QRDA Validator provides implementers with the ability to validate the conformance of QRDA
                  Category I and Category III documents to the published CMS and HL7 implementation guides.
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  disableRipple
                  href="https://cypressvalidator.healthit.gov/"
                  size="small"
                  variant="text"
                  color="secondary"
                  endIcon={<CheckIcon />}
                >
                  VALIDATE
                </Button>
              </CardActions>
            </Card>
          </Box>
          {/* Vertical Cypress Resources */}
          <Box display={'flex'} flexDirection={'column'} width={'40%'} justifyContent={'space-between'} gap={2}>
            <Card>
              <CardHeader
                sx={{ pb: 0 }}
                titleTypographyProps={{ fontSize: '1em', fontWeight: '600' }}
                title="Demo Cypress"
              ></CardHeader>
              <CardContent sx={{ pb: 1 }}>
                <Typography variant="body2">
                  Experiment with the current Cypress Baseline (Note: You will be prompted to log in with your NLM UMLS
                  credentials)
                </Typography>
              </CardContent>
              <Button
                disableRipple
                href="https://cypressdemo.healthit.gov/"
                sx={{ ml: 1, mb: 1 }}
                size="small"
                variant="text"
                color="secondary"
                endIcon={<LoginIcon />}
              >
                ACCESS LOGIN
              </Button>
            </Card>
            <Card>
              <CardHeader
                sx={{ pb: 0 }}
                titleTypographyProps={{ fontSize: '1em', fontWeight: '600' }}
                title="Install Cypress"
              ></CardHeader>
              <CardContent sx={{ pb: 1 }}>
                <Typography variant="body2">
                  Download your own instance of Cypress to test and experiment with prior to certification with an
                  Accredited Testing Laboratory.
                </Typography>
              </CardContent>
              <Button
                disableRipple
                href="https://github.com/projectcypress/cypress/wiki"
                sx={{ ml: 1, mb: 1 }}
                size="small"
                variant="text"
                color="secondary"
                endIcon={<GitHubIcon />}
              >
                Go to GitHub
              </Button>
            </Card>

            <Card>
              <CardHeader
                sx={{ pb: 0 }}
                titleTypographyProps={{ fontSize: '1em', fontWeight: '600' }}
                title="Cypress Issue Tracker"
              ></CardHeader>
              <CardContent sx={{ pb: 1 }}>
                <Typography variant="body2">Track questions and issue that Cypress supports </Typography>
              </CardContent>
              <Button
                href="https://jira.oncprojectracking.org/browse/CYPRESSef"
                sx={{ ml: 1, mb: 1 }}
                size="small"
                variant="text"
                color="secondary"
                disableRipple
                endIcon={<TrackChangesIcon />}
              >
                TRACK your question
              </Button>
            </Card>
          </Box>
        </Box>
        <Divider sx={{ p: 2, borderBottomWidth: 2 }} />
        {/* Other Tools & Resources Header */}
        <Box paddingTop={4} paddingBottom={4}>
          <Typography variant="h4" component={'h2'}>
            <strong>Other CQM Tools & Resources</strong>
          </Typography>
          <Typography variant="body1" color="secondary">
            <strong>Expanding Your Toolkit: Explore a Range of CQM Tools and Resources Beyond the Basics.</strong>
          </Typography>
        </Box>
        {/* Other Tools & Resources Content */}
        <Box gap={4} display={'flex'} justifyContent={'space-between'} flexDirection={'row'} width={'100%'}>
          {/* Bonnie Card */}
          <Card
            sx={{
              ...genericCardBlueBorder,
            }}
            id="category"
          >
            <CardContent
              sx={{
                ...flexibleContent,
              }}
            >
              <Typography variant="h6" component="h3" color="default">
                <strong>BONNIE</strong>
              </Typography>
              <Typography variant="body2" color="default">
                Bonnie is a tool for testing electronic clinical quality measures (eCQMs) designed to support
                streamlined and efficient pre-testing of eCQMs, particularly those used in the CMS Quality Reporting
                Programs.
              </Typography>
              <Button disableRipple size="small" variant="text" color="secondary" endIcon={<ArrowForwardIcon />}>
                ACCESS
              </Button>
            </CardContent>
          </Card>
          {/* eCQI Resource CenterCard */}
          <Card
            sx={{
              ...genericCardBlueBorder,
            }}
            id="category"
          >
            <CardContent
              sx={{
                ...flexibleContent,
              }}
            >
              <Typography variant="h6" component="h3" color="default">
                <strong>eCQI Resource Center</strong>
              </Typography>
              <Typography variant="body2" color="default">
                The one-stop shop for the most current resources to support electronic clinical quality improvement.
              </Typography>
              <Button disableRipple size="small" variant="text" color="secondary" endIcon={<ArrowForwardIcon />}>
                Go to center
              </Button>
            </CardContent>
          </Card>
        </Box>
        <Divider sx={{ p: 2, borderBottomWidth: 2 }} />
      </Container>
    </Box>
  )
}

export default CqmHome
