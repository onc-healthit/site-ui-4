import Box from '@mui/material/Box'
import BannerBox from '@shared/BannerBox'
import CriteriaCard from '@shared/CardWithImage'
import b1 from '@public/direct/b1.svg'
import h1 from '@public/direct/h1.svg'
import h2 from '@public/direct/h2.svg'
import { Container, Divider } from '@mui/material'
import CategoryCard from '@shared/CardWithBorder'
import CertificateCard from './shared/CertificateCard'
import publicCert from '@public/direct/publicCert.svg'
import trustAnchor from '@public/direct/trustAnchor.svg'
import invalidTrustAnchor from '@public/direct/invalidTrustAnchor.svg'
import rootCA from '@public/direct/rootCA.svg'
import Link from 'next/link'
import styles from '@shared/styles.module.css'
import SectionHeader from '../shared/SectionHeader'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

const DirectHome = () => {
  const cardMaxWidth = 345
  const cardImageWidth = '345px'
  const flexibleBox = { display: 'flex', gap: 4, flexDirection: 'row', width: '100%', justifyContent: 'space-between' }
  return (
    <>
      {/* Global Header */}
      <BannerBox
        breadcrumbs={
          <Link color="inherit" href="/direct" className={styles.link}>
            Direct
          </Link>
        }
        heading={'Direct Project Tooling'}
        description={
          <>
            This area provides capabilities to validate your Direct implementation to applicable
            standards-specifications. To verify basic Direct send capabilities of your system send a message to:
            <span>
              <Link color="#42A5F5" href="mailto:testing@ett.healthit.gov">
                testing@ett.healthit.gov
              </Link>
            </span>
          </>
        }
      />
      {/* Main Content */}
      <Container>
        <SectionHeader header={'Test By Criteria'} subHeader={'A deep dive with one click away'} />
        <Box display={'flex'} width={'100%'} justifyContent={'space-between'}>
          <CriteriaCard
            title={'B1'}
            cardImage={b1}
            cardHeader={'Transitions of Care'}
            cardSubheader={'170.315 (b)(1):'}
            description={'Sender Or Receiver. We have group all the test regarding this... to help user ... do this.'}
            pathname={'/direct/testbycriteria/B1'}
            maxWidth={cardMaxWidth}
            imageWidth={cardImageWidth}
          />

          <CriteriaCard
            title={'H1'}
            cardImage={h1}
            cardHeader={'Direct Project'}
            cardSubheader={'§ 170.315(h)(1)'}
            description={'Sender Or Receiver. We have group all the test regarding this... to help user ... do this.'}
            pathname={'/direct/testbycriteria/H1'}
            maxWidth={cardMaxWidth}
            imageWidth={cardImageWidth}
          />

          <CriteriaCard
            title={'H2'}
            cardImage={h2}
            cardHeader={'Direct Project, Edge Protocol, and XDR/XDM'}
            cardSubheader={'§ 170.315(h)(2)'}
            description={'Sender Or Receiver. We have group all the test regarding this... to help user ... do this.'}
            pathname={'/direct/testbycriteria/H2'}
            maxWidth={cardMaxWidth}
            imageWidth={cardImageWidth}
          />
        </Box>
        <Divider sx={{ p: 2, borderBottomWidth: 2 }} />
        <SectionHeader
          header={'Select a category to start your direct project tooling.'}
          subHeader={'All Direct in One Place'}
        />
        <Box sx={{ ...flexibleBox }} paddingBottom={4}>
          <CategoryCard
            cardHeader="Register for Direct Email"
            description={
              'Enter your Direct (From) email address, this will be used to send a validation report to a normal email account. The validation reports are sent back to the email account for review by the user during testing.'
            }
            buttonTitle={'GO'}
            buttonLink={'/direct/register'}
            buttonIcon={<ArrowForwardIcon />}
          />
          <CategoryCard
            cardHeader="Send Direct Email"
            description={
              'Enter your Direct (From) email address, this will be used to send a validation report to a normal email account. The validation reports are sent back to the email account for review by the user during testing.'
            }
            buttonTitle={'GO'}
            buttonLink={'/direct/senddirect'}
            buttonIcon={<ArrowForwardIcon />}
          />
          <CategoryCard
            cardHeader="Validate Direct Email"
            description={
              'Enter your Direct (From) email address, this will be used to send a validation report to a normal email account. The validation reports are sent back to the email account for review by the user during testing.'
            }
            buttonTitle={'GO'}
            buttonLink={'/direct/validate'}
            buttonIcon={<ArrowForwardIcon />}
          />
        </Box>
        <Box sx={{ ...flexibleBox }}>
          <CategoryCard
            cardHeader="Discovery Test Tool"
            description={
              'Enter your Direct (From) email address, this will be used to send a validation report to a normal email account. The validation reports are sent back to the email account for review by the user during testing.'
            }
            buttonTitle={'GO'}
            buttonLink={'/direct/dcdt'}
            buttonIcon={<ArrowForwardIcon />}
          />
          <CategoryCard
            cardHeader="Transport Test Tool"
            description={
              'Enter your Direct (From) email address, this will be used to send a validation report to a normal email account. The validation reports are sent back to the email account for review by the user during testing.'
            }
            buttonTitle={'GO'}
            buttonLink={''}
            buttonIcon={<ArrowForwardIcon />}
          />
          <CategoryCard
            cardHeader="HISP Testing Portal"
            description={
              'Enter your Direct (From) email address, this will be used to send a validation report to a normal email account. The validation reports are sent back to the email account for review by the user during testing.'
            }
            buttonTitle={'GO'}
            buttonLink={''}
            buttonIcon={<ArrowForwardIcon />}
          />
        </Box>
        <Divider sx={{ p: 2, borderBottomWidth: 2 }} />
        <SectionHeader header={'Certification for Download'} subHeader={'Tagline'} />
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
    </>
  )
}

export default DirectHome
