'use client'
import { Card, CardContent, CardHeader, Container, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Overview from '@/components/resources/FAQCards/OverviewCard'
import Direct from '@/components/resources/FAQCards/DirectCard'
import CCDA from '@components/resources/FAQCards/CCDACard'
import XDM from '@components/resources/FAQCards/XDMCard'
import XDR from '@components/resources/FAQCards/XDRCard'
import SMTP from '@components/resources/FAQCards/SMTPCard'
import OTHER from '@components/resources/FAQCards/OtherCard'

import BannerBox from '@shared/BannerBox'
import SubMenu, { menuProps } from '@/components/shared/SubMenu'

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
          <SubMenu menuItems={menuItems} />
          <Box gap={4} display={'flex'} flexDirection={'column'}>
            <Box id="overview">
              <Overview />
            </Box>
            <Box id="ccda">
              <CCDA />
            </Box>
            <Box id="direct">
              <Direct />
            </Box>
            <Box id="xdm">
              <XDM />
            </Box>
            <Box id="xdr">
              <XDR />
            </Box>
            <Box id="smtp">
              <SMTP />
            </Box>
            <Box id="other">
              <OTHER />
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
