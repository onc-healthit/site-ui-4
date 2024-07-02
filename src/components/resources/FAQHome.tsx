'use client'
import { Card, CardContent, CardHeader, Container, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import BannerBox from '@shared/BannerBox'
import SubMenu, { menuProps } from '@/components/shared/SubMenu'
import FAQCard from './FAQCard'
import faq from './data/FAQ.json'

export default function FAQHome() {
  const menuItems: menuProps[] = [
    { heading: 'Overview', href: '#overview' },
    { heading: 'C-CDA', href: '#ccda' },
    { heading: 'Direct', href: '#direct' },
    { heading: 'XDM', href: '#xdm' },
    { heading: 'XDR', href: '#xdr' },
    { heading: 'SMTP', href: '#smtp' },
    { heading: 'Other', href: '#other' },
    { heading: 'Contact Us', href: '#contact' },
  ]
  function trackMenuItemClick(heading: string) {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'Click FAQs sub menu', {
        event_category: 'Navigation',
        event_label: heading,
      })
    }
  }

  return (
    <div>
      <BannerBox
        breadcrumbs={undefined}
        heading={'Frequently Asked Questions'}
        subHeading={'A hub of valuable questions & answers'}
        isTourButton={false}
        description={
          "Welcome to the Frequently Asked Questions (FAQ) section of the SITE website. Here, we've compiled a comprehensive list of common queries and inquiries to provide you with quick and informative answers to your most pressing questions about SITE. Whether you're a new visitor exploring our platform or a long-time user seeking clarification, this FAQ section aims to simplify your experience and provide valuable insights into SITE's features and functionalities."
        }
      />
      <Container>
        <Box pt={4} pb={4} gap={4} display={'flex'} flexDirection={'row'}>
          <SubMenu onClick={trackMenuItemClick} menuItems={menuItems} />
          <Box gap={4} display={'flex'} flexDirection={'column'}>
            <Box id="overview">
              <FAQCard header={'SITE Overview'} items={faq.Overview} />
            </Box>
            <Box id="ccda">
              <FAQCard header={'Consolidated Clinical Document Architecture (C-CDA) FAQs'} items={faq['C-CDA']} />
            </Box>
            <Box id="direct">
              <FAQCard header={'Direct Project Tooling FAQs'} items={faq.Direct} />
            </Box>
            <Box id="xdm">
              <FAQCard header={'XDM FAQs'} items={faq.XDM} />
            </Box>
            <Box id="xdr">
              <FAQCard header={'XDR FAQs'} items={faq.XDR} />
            </Box>
            <Box id="smtp">
              <FAQCard header={'SMTP/POP/IMAP FAQs'} items={faq.SMTP} />
            </Box>
            <Box id="other">
              <FAQCard header={'Other FAQs & Helpful Items'} items={faq.Other} />
              <Box sx={{ pt: 4 }}>
                <Card>
                  <CardHeader titleTypographyProps={{ fontWeight: 700 }} title="Helpful Links" />
                  <CardContent>
                    <Typography gutterBottom variant="body2">
                      A good cheat-sheet resource for XD* metadata is available at:
                      <a href="http://ihewiki.wustl.edu/wiki/index.php/Notes_on_XDS_Profile.">
                        http://ihewiki.wustl.edu/wiki/index.php/Notes_on_XDS_Profile.
                      </a>
                    </Typography>
                    <Typography gutterBottom variant="body2">
                      A helpful guide for navigating the XDR metadata. There are also example files in this directory:
                      <a href="ftp://ftp.ihe.net/%20TFImplementationMaterial/ITI/examples/XDS.b/">
                        ftp://ftp.ihe.net/%20TFImplementationMaterial/ITI/examples/XDS.b/ (see
                        ProvideAndRegisterDocument*)
                      </a>
                    </Typography>
                    <Typography gutterBottom variant="body2">
                      Here are some examples for XDR:
                      <a href="http://wiki.ihe.net/index.php/XDS.bImplementation#ExampleProvideandRegisterDocumentSet-btransaction.28withfullmetadata.29">
                        http://wiki.ihe.net/index.php/XDS.bImplementation#ExampleProvideandRegisterDocumentSet-btransaction.28withfullmetadata.29
                      </a>
                    </Typography>
                    <Typography gutterBottom variant="body2">
                      Provide and register examples. Some examples for XDM:
                      <a href="ftp://ftp.ihe.net/TFImplementationMaterial/ITI/examples/XDS.b/">
                        {' '}
                        ftp://ftp.ihe.net/Connectathon/samples/XDM_samples/
                      </a>
                    </Typography>
                    <Typography gutterBottom variant="body2">
                      A table showing the difference in optionality between the different XD* metadata is available in
                      Vol 3 of IHE ITI:
                      <a href="http://www.ihe.net/uploadedFiles/Documents/ITI/IHE_ITI_TF_Vol3.pdf">
                        http://www.ihe.net/uploadedFiles/Documents/ITI/IHE_ITI_TF_Vol3.pdf
                      </a>
                      . See table 4.3.1-3: Sending Actor Metadata Attribute Optionality starting on page 109.
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </Box>
            <Box>
              <Card>
                <CardHeader titleTypographyProps={{ fontWeight: 700 }} title="Still need help?" />
                <CardContent>
                  <Typography gutterBottom>
                    Contact us at <a href="mailto:edge-test-tool@googlegroups.com">edge-test-tool@googlegroups.com </a>
                    or <a href="https://groups.google.com/g/edge-test-tool">access our forum</a> for the lastest
                    questions & answers.
                  </Typography>
                  <Typography variant="body2">
                    Questions about the applicability of the initial set of standards, implementation specifications,
                    and certification criteria should be directed to ONC at{' '}
                    <a href="mailto:ONC.Certification@hhs.gov">ONC.Certification@hhs.gov</a>. Questions about functions
                    and activities of the ATCBs should be directed to ONC at ONC.Certification@hhs.gov.
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Box>
        </Box>
      </Container>
    </div>
  )
}
