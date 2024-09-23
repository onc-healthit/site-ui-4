'use client'
import { Card, CardContent, CardHeader, Container, Typography, Link } from '@mui/material'
import Box from '@mui/material/Box'
import BannerBox from '@shared/BannerBox'
import SubMenu, { menuProps } from '@/components/shared/SubMenu'
import palette from '@/styles/palette'
import FAQCard from './ArchiveCard'
import faq from './data/FAQ.json'
import VideoItem from '../resources/VideoItem'

export default function ArchiveHome() {
  const menuItems: menuProps[] = [
    { heading: 'Overview', href: '#overview' },
    { heading: 'FAQs', href: '#faq' },
    { heading: 'C-CDA', href: '#ccda' },
    { heading: 'Direct', href: '#direct' },
    { heading: 'XDM', href: '#xdm' },
    { heading: 'XDR', href: '#xdr' },
    { heading: 'SMTP', href: '#smtp' },
    { heading: 'Other', href: '#other' },
    { heading: 'Videos', href: '#videos' },
    { heading: 'Contact Us', href: 'mailto:edge-test-tool@googlegroups.com' },
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
        breadcrumbs={
          <Link color={palette.secondary} href={'/archived'}>
            Archived
          </Link>
        }
        heading={'Archived tools, files and other additional content'}
        isTourButton={false}
        description={
          'Unearth a treasure trove of archived resources including tools, files, and more! Please be aware that these materials are no longer actively maintained. Despite this, they offer valuable insights and historical context. Dive into our curated collection to explore and discover valuable resources for your projects and endeavors!'
        }
      />
      <Container>
        <Box pt={4} pb={4} gap={4} display={'flex'} flexDirection={'row'}>
          <SubMenu onClick={trackMenuItemClick} menuItems={menuItems} />
          <Box gap={4} display={'flex'} flexDirection={'column'}>
            <Box>
              <Box id="faq">
                <Card>
                  <CardHeader
                    titleTypographyProps={{ fontWeight: 700 }}
                    title="Frequently Asked Questions"
                    subheader="Historical questions & answers"
                    subheaderTypographyProps={{ style: { marginTop: 0, color: '#333' } }}
                  />
                  <CardContent>
                    <Typography variant="body2">
                      The Frequently Asked Questions (FAQ) section of the SITE website compiles questions and inquiries
                      we have received in the past. You can search for answers by SITE&apos;s features and
                      functionality.
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </Box>
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
              <Box id="videos" sx={{ mb: 2 }}>
                <CardHeader
                  titleTypographyProps={{ fontWeight: 700, variant: 'h2', sx: { textAlign: 'left' } }}
                  title="Videos"
                />
                <CardContent>
                  <Typography variant="body2" sx={{ ml: -2 }}>
                    For those who prefer visual learning, our video collection offers an engaging way to absorb
                    information
                  </Typography>
                </CardContent>

                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '20px',
                    mt: 2,
                  }}
                >
                  <VideoItem
                    fileName="Intro_To_ETT.mp4"
                    fileDate="2016-12-12"
                    fileUrl="https://github.com/onc-healthit/ett/blob/resources/documentation/training/nist-training-videos/Intro_To_ETT.mp4"
                    showFileType
                  />
                  <VideoItem
                    fileName="MDHT.mp4"
                    fileDate="2016-12-12"
                    fileUrl="https://github.com/onc-healthit/ett/blob/resources/documentation/training/nist-training-videos/MDHT.mp4"
                    showFileType
                  />
                  <VideoItem
                    fileName="XDM_Validation.mp4"
                    fileDate="2016-12-12"
                    fileUrl="https://github.com/onc-healthit/ett/blob/resources/documentation/training/nist-training-videos/XDM_Validation.mp4"
                    showFileType
                  />
                  <VideoItem
                    fileName="Receiver Tests SMTP.mp4"
                    fileDate="2016-12-12"
                    fileUrl="https://github.com/onc-healthit/ett/blob/resources/documentation/training/nist-training-videos/Receiver%20Tests%20SMTP.mp4"
                    showFileType
                  />
                  <VideoItem
                    fileName="XDR_EDGE_RECEIVER.mp4"
                    fileDate="2016-12-12"
                    fileUrl="https://github.com/onc-healthit/ett/blob/resources/documentation/training/nist-training-videos/XDR_EDGE_RECEIVER.mp4"
                    showFileType
                  />
                  <VideoItem
                    fileName="XDR_EDGE_SENDER.mp4"
                    fileDate="2016-12-12"
                    fileUrl="https://github.com/onc-healthit/ett/blob/resources/documentation/training/nist-training-videos/XDR_EDGE_SENDER.mp4"
                    showFileType
                  />

                  <VideoItem
                    fileName="XDR_Validation.mp4"
                    fileDate="2016-12-12"
                    fileUrl="https://github.com/onc-healthit/ett/blob/resources/documentation/training/nist-training-videos/XDR_Validation.mp4"
                    showFileType
                  />
                  <VideoItem
                    fileName="readme.txt"
                    fileDate="2016-12-12"
                    fileUrl="https://github.com/onc-healthit/ett/blob/resources/documentation/training/nist-training-videos/readme.txt"
                    showFileType
                  />
                  <VideoItem
                    fileName="Update readme.txt"
                    fileDate="2016-12-12"
                    fileUrl="https://github.com/onc-healthit/ett/commit/b7f3e765747720b2d6a9b918e7137dd9ba5eeb3c"
                    showFileType
                  />
                  <VideoItem
                    fileName="video_demos.html"
                    fileDate="2016-12-12"
                    fileUrl="https://github.com/onc-healthit/ett/blob/resources/documentation/training/nist-training-videos/video_demos.html"
                    showFileType
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </div>
  )
}
