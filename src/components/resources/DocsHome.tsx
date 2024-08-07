import { Typography, Container, List, ListItemButton } from '@mui/material'
import Box from '@mui/material/Box'
import DocsCard from './DocsCard'
import BannerBox from '@shared/BannerBox'
import DocsSubMenu from './DocsSubMenu'
import VideoItem from './VideoItem'

export default function DocsHome() {
  return (
    <div>
      <BannerBox
        breadcrumbs={undefined}
        heading={'Documents & Videos'}
        subHeading={'A hub of valuable resources'}
        isTourButton={false}
        description={
          "In this dedicated area of our website, you'll find a treasure trove of valuable resources designed to enhance your understanding of ONC SITE (Office of the National Coordinator for Health Information Technology - Strategic Interoperability Testing and Evaluation). Whether you're a healthcare professional, a developer, an industry stakeholder, or simply someone interested in the world of health information technology, this section has something for everyone."
        }
      />
      <Container>
        <Box pt={4} pb={4} gap={4} display={'flex'} flexDirection={'row'}>
          <DocsSubMenu />
          <Box gap={4} display={'flex'} flexDirection={'row'} flexWrap={'wrap'}>
            <DocsCard
              header="Documents & Videos"
              content={
                <div>
                  <Typography id="docs" variant="body1" sx={{ mb: 1.5 }}>
                    {
                      "Our document library is a comprehensive repository of whitepapers, research reports, guidelines, and informative articles related to ONC SITE. Whether you're looking to stay up-to-date with the latest regulatory changes, delve into technical specifications, or gain insights into the broader landscape of health IT, you'll find a wealth of knowledge at your fingertips."
                    }
                  </Typography>
                  <List>
                    <ListItemButton href="https://www.healthit.gov/topic/certification-ehrs/onc-health-it-certification-program-test-method">
                      Access Testing Procedures and Companion Guides
                    </ListItemButton>
                    <ListItemButton href="/local-install">Local Installation Guide</ListItemButton>
                    <ListItemButton href="https://www.healthit.gov/topic/certification-ehrs/2015-edition-cures-update-test-method">
                      Installing using the AMI (Amazon Machine Image)
                    </ListItemButton>
                    <ListItemButton href="https://github.com/onc-healthit/ett/raw/resources/documentation/guides/ETT%20Endpoints.docx">
                      Endpoints for ETT.HealthIT.Gov testing
                    </ListItemButton>
                  </List>
                </div>
              }
            />
            <DocsCard
              header="Videos"
              content={
                <div>
                  <Typography id="vids" variant="body1" sx={{ mb: 4 }}>
                    For those who prefer visual learning, our video collection offers an engaging way to absorb
                    information
                  </Typography>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                      gap: '20px',
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
                  </div>
                </div>
              }
            />
          </Box>
        </Box>
      </Container>
    </div>
  )
}
