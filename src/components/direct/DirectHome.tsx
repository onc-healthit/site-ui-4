import Box from '@mui/material/Box'
import BannerBox from './BannerBox'
import Link from '@mui/material/Link'
import CriteriaCard from './CriteriaCard'
import b1 from '@public/direct/b1.svg'
import h1 from '@public/direct/h1.svg'
import h2 from '@public/direct/h2.svg'
import { Container, Divider, Typography } from '@mui/material'
import CategoryCard from './CategoryCard'
import CertificateCard from './CertificateCard'
import publicCert from '@public/direct/publicCert.svg'
import trustAnchor from '@public/direct/trustAnchor.svg'
import invalidTrustAnchor from '@public/direct/invalidTrustAnchor.svg'
import rootCA from '@public/direct/rootCA.svg'
import Ankle from '../shared/Ankle'
import Footer from '../shared/Footer'

const DirectHome = () => {
  return (
    <Box>
      {/* Global Header */}
      <BannerBox
        title={'Direct'}
        href={'/direct'}
        heading={'Direct Project Tooling'}
        description={
          <>
            This area provides capabilities to validate your Direct implementation to applicable
            standards-specifications. To verify basic Direct send capabilities of your system send a message to:
            <span>
              <Link underline="hover" color="#42A5F5" href="mailto:testing@ett.healthit.gov">
                testing@ett.healthit.gov
              </Link>
            </span>
          </>
        }
      />
      {/* Main Content */}
      <Container disableGutters>
        <Box paddingTop={4} paddingBottom={4}>
          <Typography variant="h4" component={'h2'}>
            <strong>Test By Criteria</strong>
          </Typography>
          <Typography variant="body1" color="secondary">
            <strong>A deep dive with one click away</strong>
          </Typography>
        </Box>
        <Box display={'flex'} width={'100%'} justifyContent={'space-between'}>
          <CriteriaCard
            title={'B1'}
            cardImage={b1}
            cardHeader={'Transitions of Care'}
            cardSubheader={'170.315 (b)(1):'}
            description={'Sender Or Receiver. We have group all the test regarding this... to help user ... do this.'}
          />

          <CriteriaCard
            title={'H1'}
            cardImage={h1}
            cardHeader={'Direct Project'}
            cardSubheader={'§ 170.315(h)(1)'}
            description={'Sender Or Receiver. We have group all the test regarding this... to help user ... do this.'}
          />

          <CriteriaCard
            title={'H2'}
            cardImage={h2}
            cardHeader={'Direct Project, Edge Protocol, and XDR/XDM'}
            cardSubheader={'§ 170.315(h)(2)'}
            description={'Sender Or Receiver. We have group all the test regarding this... to help user ... do this.'}
          />
        </Box>
        <Divider sx={{ p: 2, borderBottomWidth: 2 }} />
        <Box paddingTop={4} paddingBottom={4}>
          <Typography variant="h4" component={'h2'}>
            <strong>Select a category to start your direct project tooling.</strong>
          </Typography>
          <Typography variant="body1" color="secondary">
            <strong>All Direct in One Place</strong>
          </Typography>
        </Box>
        <Box display={'flex'} width={'100%'} justifyContent={'space-between'} paddingBottom={4}>
          <CategoryCard
            cardHeader="Register for Direct Email"
            description={
              'Enter your Direct (From) email address, this will be used to send a validation report to a normal email account. The validation reports are sent back to the email account for review by the user during testing.'
            }
          />
          <CategoryCard
            cardHeader="Send Direct Email"
            description={
              'Enter your Direct (From) email address, this will be used to send a validation report to a normal email account. The validation reports are sent back to the email account for review by the user during testing.'
            }
          />
          <CategoryCard
            cardHeader="Validate Direct Email"
            description={
              'Enter your Direct (From) email address, this will be used to send a validation report to a normal email account. The validation reports are sent back to the email account for review by the user during testing.'
            }
          />
        </Box>
        <Box display={'flex'} width={'100%'} justifyContent={'space-between'}>
          <CategoryCard
            cardHeader="Discovery Test Tool"
            description={
              'Enter your Direct (From) email address, this will be used to send a validation report to a normal email account. The validation reports are sent back to the email account for review by the user during testing.'
            }
          />
          <CategoryCard
            cardHeader="Transport Test Tool"
            description={
              'Enter your Direct (From) email address, this will be used to send a validation report to a normal email account. The validation reports are sent back to the email account for review by the user during testing.'
            }
          />
          <CategoryCard
            cardHeader="HISP Testing Portal"
            description={
              'Enter your Direct (From) email address, this will be used to send a validation report to a normal email account. The validation reports are sent back to the email account for review by the user during testing.'
            }
          />
        </Box>
        <Divider sx={{ p: 2, borderBottomWidth: 2 }} />
        <Box paddingTop={4} paddingBottom={4}>
          <Typography variant="h4" component={'h2'}>
            <strong>Certification for Download</strong>
          </Typography>
          <Typography variant="body1" color="secondary">
            <strong>Tagline</strong>
          </Typography>
        </Box>
        <Box paddingBottom={4} display={'flex'} width={'100%'} justifyContent={'space-between'}>
          <CertificateCard
            title={'Public Cert'}
            cardImage={publicCert}
            cardHeader={'ETT Public Cert'}
            description={'The ETT Public Cert is used for the signing of Direct messages.'}
          />
          <CertificateCard
            title={'Trust Anchor'}
            cardImage={trustAnchor}
            cardHeader={'Trust Anchor'}
            description={
              "The Trust Anchor establishes the relationship between the certificate authority's (CA) certificate and the HISP's (in this case, the ETT acting as a HISP) certificate.Invalid Trust Anchor"
            }
          />
          <CertificateCard
            title={'Invalid Trust Achor'}
            cardImage={invalidTrustAnchor}
            cardHeader={'Invalid Trust Anchor'}
            description={
              "The Invalid Trust Anchor is used for negative testing and establishes and invalid relationship between the certificate authority's (CA) certificate and the ETT for negative testing.ETT Public Root CA"
            }
          />
          <CertificateCard
            title={'Root CA'}
            cardImage={rootCA}
            cardHeader={'Public Root CA'}
            description={
              "The public root CA certificate is the self-signed certificate that identifies the root CA, i.e. the trusted authorit y that issues certificates. A HISP will need to download the root certificate to verify that the trust anchor is valid and that it correctly verifies the identity of the HISP's certificate."
            }
          />
        </Box>
      </Container>
      {/* Global Ankle */}
      <Ankle />
      {/* Global Footer */}
      <Footer />
    </Box>
  )
}

export default DirectHome
