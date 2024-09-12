'use client'
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
import { useTheme } from '@mui/material/styles'
import { SxProps, Theme } from '@mui/system'

const DirectHome = () => {
  const cardMaxWidth = 345
  const cardImageWidth = '345px'
  const theme = useTheme()
  const flexibleBox: SxProps<Theme> = {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '32px',
    flexDirection: 'row',
    width: '100%',
    mb: 4,
    [theme.breakpoints.only('lg')]: {
      width: '100%',
      justifyContent: 'space-between',
      gap: '32px',
      flexWrap: 'nowrap',
      flexDirection: 'row',
    },
    [theme.breakpoints.between('lg', 'md')]: {
      width: '100%',
      justifyContent: 'space-between',
      gap: '4px',
      flexWrap: 'wrap',
      flexDirection: 'row',
    },
    [theme.breakpoints.down('md')]: {
      width: '100%',
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: '32px',
    },
  }
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
            The ONC Direct Tool, built on the foundation of the Direct Standard®, provides a comprehensive testing
            platform for developers and implementers to validate their Direct implementations. With a suite of testing
            capabilities and essential certificates, the ONC Direct Tool empowers organizations to ensure compliance
            with applicable standards and specifications, facilitating secure, interoperable exchange of sensitive
            healthcare information over the open internet. Verify your system&apos;s basic Direct send capabilities by
            sending a message to{' '}
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
        <SectionHeader header={'Test By Criteria'} subHeader={'All-Inclusive Criterion Testing'} />
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'stretch',
            [theme.breakpoints.down('lg')]: {
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'flex-start',
              gap: 4,
              overflowX: 'hidden',
            },
          }}
        >
          <CriteriaCard
            title={'B1'}
            cardImage={b1}
            cardHeader={'Transitions of Care'}
            cardSubheader={'170.315 (b)(1):'}
            description={
              'Ensure your system meets the certification criteria for managing transitions of care. This includes the capability to create and receive transition of care/referral summaries that adhere to the Direct Standard®. By passing this test, you validate that your system can securely transport sensitive healthcare information during patient transitions between different care settings and providers.'
            }
            pathname={'/direct/testbycriteria/B1'}
            maxWidth={cardMaxWidth}
            imageWidth={cardImageWidth}
            buttonTitle={'BEGIN B1 TESTING'}
          />

          <CriteriaCard
            title={'H1'}
            cardImage={h1}
            cardHeader={'Direct Project'}
            cardSubheader={'§ 170.315(h)(1)'}
            description={
              'Verify your implementation of the Direct Project Transport standard. This criterion focuses on the secure, interoperable exchange of healthcare information using Direct secure messaging. Testing against this criterion ensures that your system can reliably send and receive encrypted healthcare information, maintaining privacy and security over the open internet.'
            }
            pathname={'/direct/testbycriteria/H1'}
            maxWidth={cardMaxWidth}
            imageWidth={cardImageWidth}
            buttonTitle={'BEGIN H1 TESTING'}
          />

          <CriteriaCard
            title={'H2'}
            cardImage={h2}
            cardHeader={'Direct Project, Edge Protocol, and XDR/XDM'}
            cardSubheader={'§ 170.315(h)(2)'}
            description={
              'Test your system’s ability to support queries using the Direct Project standards.This criterion involves verifying that your implementation can correctly handle query requests and responses, enabling secure, standards-compliant communication between disparate healthcare systems.'
            }
            pathname={'/direct/testbycriteria/H2'}
            maxWidth={cardMaxWidth}
            imageWidth={cardImageWidth}
            buttonTitle={'BEGIN H2 TESTING'}
          />
        </Box>
        <Divider sx={{ p: 2, borderBottomWidth: 2 }} />
        <SectionHeader
          header={'Select a category to start your direct project tooling.'}
          subHeader={'Jumpstart Your Direct Project Journey: Select a Testing Category'}
        />
        <Box sx={flexibleBox}>
          <CategoryCard
            cardHeader="Register for Direct Email"
            description={
              'Register and link one or more Direct accounts to your regular contact email address for comprehensive reporting.'
            }
            buttonTitle={'Register'}
            buttonLink={'/direct/register'}
            buttonIcon={<ArrowForwardIcon />}
            cardWidthPercent={100}
          />
          <CategoryCard
            cardHeader="Send Direct Email"
            description={'Send a Direct message to a HISP of your choosing.'}
            buttonTitle={'Create Message'}
            buttonLink={'/direct/senddirect'}
            buttonIcon={<ArrowForwardIcon />}
            cardWidthPercent={100}
          />
          <CategoryCard
            cardHeader="XDM Validator"
            description={'Upload your XDM file to validate its authenticity.'}
            buttonTitle={'validate'}
            buttonLink={'/direct/xdm'}
            buttonIcon={<ArrowForwardIcon />}
            cardWidthPercent={100}
          />
        </Box>
        <Box sx={flexibleBox}>
          <CategoryCard
            cardHeader="Discovery Test Tool"
            description={`Test your systems compliance with the Direct Project's Certificate Discovery and Provider Directory Implementation Guide. Validate your implementation's ability to correctly discover, host, and validate certificates, ensuring secure and interoperable exchange of health information.`}
            buttonTitle={'BEGIN DISCOVERY'}
            buttonLink={'/direct/dcdt'}
            buttonIcon={<ArrowForwardIcon />}
            cardWidthPercent={100}
          />
          <CategoryCard
            cardHeader="Transport Test Tool"
            description={`Test your Direct implementation's ability to send and receive messages securely by exchanging Trust Anchors with SITE or using the Direct Trust production bundle, ensuring reliable and compliant communication within the Direct ecosystem.`}
            buttonTitle={'TEST TRANSPORT'}
            buttonLink={'/direct/transporttool'}
            buttonIcon={<ArrowForwardIcon />}
            cardWidthPercent={100}
          />
          <CategoryCard
            cardHeader="HISP Testing Portal"
            description={`Simulate Health Information Service Provider (HISP) functionality and validate your system's compatibility with SMTP, IMAP, and POP3 protocols through comprehensive test cases and message tracking, ensuring seamless integration with Direct messaging providers.`}
            buttonTitle={'Simulate HISP'}
            buttonLink={'/direct/hisp'}
            buttonIcon={<ArrowForwardIcon />}
            cardWidthPercent={100}
          />
        </Box>
        <Divider sx={{ p: 2, borderBottomWidth: 2 }} />
        <div id="certification-download">
          <SectionHeader
            header={'Certification for Download'}
            subHeader={'Empower Your Testing with Essential Certificates'}
          />
        </div>
        <Box sx={{ ...flexibleBox }}>
          <CertificateCard
            title={'Public Cert'}
            cardImage={publicCert}
            cardHeader={'ETT Public Cert'}
            description={`The ETT Public Cert is used for signing Direct messages, allowing you to test your system's ability to validate and trust the ETT as a message sender.`}
            href={
              'https://github.com/onc-healthit/ett/raw/resources/certificates/ett.healthit.gov/ett.healthit.gov.der'
            }
          />
          <CertificateCard
            title={'Trust Anchor'}
            cardImage={trustAnchor}
            cardHeader={'Trust Anchor'}
            description={`The Trust Anchor establishes a trusted relationship between your HISP and the ETT by linking the certificate authority's (CA) certificate to the ETT's HISP certificates`}
            href={
              'https://github.com/onc-healthit/ett/raw/resources/certificates/ett.healthit.gov/intermediate.healthit.gov.der'
            }
          />
          <CertificateCard
            title={'Invalid Trust Achor'}
            cardImage={invalidTrustAnchor}
            cardHeader={'Invalid Trust Anchor'}
            description={`The Invalid Trust Anchor simulates an incorrect association between the CA's certificate and the ETT, enabling you to test your system's handling of invalid trust relationships in negative testing scenarios.`}
            href={
              'https://github.com/onc-healthit/ett/raw/resources/certificates/common/sitenv.org/invalid_trust_rel.direct.sitenv.org_ca.der'
            }
          />
          <CertificateCard
            title={'Root CA'}
            cardImage={rootCA}
            cardHeader={'Public Root CA'}
            description={`The ETT Public Root CA is a self-signed certificate that identifies the trusted authority responsible for issuing certificates, allowing you to verify the authenticity of the Trust Anchor and the ETT's HISP certificate.`}
            href={'https://github.com/onc-healthit/ett/raw/resources/certificates/ett.healthit.gov/healthit.gov.der'}
          />
        </Box>
      </Container>
    </>
  )
}

export default DirectHome
