'use client'
import { Card, CardContent, CardHeader, Container, Typography, Link, Divider } from '@mui/material'
import Box from '@mui/material/Box'
import BannerBox from '@shared/BannerBox'
import SubMenu, { menuProps } from '@/components/shared/SubMenu'
import palette from '@/styles/palette'
import FAQCard from './ArchiveCard'
import faq from './data/FAQ.json'
import VideoItem from '../resources/VideoItem'
import ForwardToInboxOutlinedIcon from '@mui/icons-material/ForwardToInboxOutlined'
import eventTrack from '@/services/analytics'

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
    {
      heading: 'Contact Us',
      href: 'mailto:edge-test-tool@googlegroups.com',
      icon: <ForwardToInboxOutlinedIcon color="primary" fontSize="small" />,
    },
  ]

  const trackMenuItemClick = (heading: string) => {
    eventTrack('Click archived sub menu', 'Archived', heading)
  }

  return (
    <div>
      <BannerBox
        breadcrumbs={
          <Link color={palette.secondary} href={'/archived'}>
            Archived
          </Link>
        }
        heading={'Archived Content'}
        isTourButton={false}
        description={
          'This section contains archived materials. While these items are no longer actively maintained, they may provide useful insights and historical context. Feel free to explore the collection for reference and background information.'
        }
      />
      <Container>
        <Box pt={4} pb={4} gap={4} display={'flex'} flexDirection={'row'}>
          <SubMenu onClick={trackMenuItemClick} menuItems={menuItems} />
          <Box gap={4} display={'flex'} flexDirection={'column'}>
            <Box>
              <Box sx={{ scrollMarginTop: '200px' }} id="overview">
                <FAQCard header={'SITE Overview'} items={faq.Overview} />
              </Box>
            </Box>
            <Box sx={{ scrollMarginTop: '200px' }} id="faq">
              <Card>
                <CardHeader
                  titleTypographyProps={{ fontWeight: 700 }}
                  title="Frequently Asked Questions"
                  subheader="Historical questions & answers"
                  subheaderTypographyProps={{ style: { marginTop: 0, color: '#333' } }}
                />
                <Divider />
                <CardContent>
                  <Typography variant="body2">
                    The Frequently Asked Questions (FAQ) section of the SITE website compiles questions and inquiries we
                    have received in the past. You can search for answers by SITE&apos;s features and functionality.
                  </Typography>
                </CardContent>
              </Card>
            </Box>
            <Box sx={{ scrollMarginTop: '200px' }} id="ccda">
              <FAQCard header={'Consolidated Clinical Document Architecture (C-CDA) FAQs'} items={faq['C-CDA']} />
            </Box>
            <Box sx={{ scrollMarginTop: '200px' }} id="direct">
              <FAQCard header={'Direct Tooling FAQs'} items={faq.Direct} />
            </Box>
            <Box sx={{ scrollMarginTop: '200px' }} id="xdm">
              <FAQCard header={'XDM FAQs'} items={faq.XDM} />
            </Box>
            <Box sx={{ scrollMarginTop: '200px' }} id="xdr">
              <FAQCard header={'XDR FAQs'} items={faq.XDR} />
            </Box>
            <Box sx={{ scrollMarginTop: '200px' }} id="smtp">
              <FAQCard header={'SMTP/POP/IMAP FAQs'} items={faq.SMTP} />
            </Box>
            <Box sx={{ scrollMarginTop: '200px' }} id="other">
              <FAQCard header={'Other FAQs & Helpful Items'} items={faq.Other} />
              <Box id="videos" sx={{ scrollMarginTop: '200px', my: 4 }}>
                <Card>
                  <CardHeader
                    titleTypographyProps={{ fontWeight: 700, variant: 'h2', sx: { textAlign: 'left' } }}
                    title="Videos"
                    subheader="While our archived videos do not reflect the current user interface, they may still offer valuable insights into using SITE."
                  />
                  <Divider />
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
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
                </Card>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </div>
  )
}
