import { Typography, Container, Link } from '@mui/material'
import Box from '@mui/material/Box'
import DocsCard from './DocsCard'
import BannerBox from '@shared/BannerBox'
import Divider from '@mui/material/Divider'
import DocsSubMenu from './DocsSubMenu'

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
                  <Typography sx={{ mb: 5 }}>
                    <Typography variant="body1" sx={{ mb: 1.5 }}>
                      <strong>
                        {
                          "Our document library is a comprehensive repository of whitepapers, research reports, guidelines, and informative articles related to ONC SITE. Whether you're looking to stay up-to-date with the latest regulatory changes, delve into technical specifications, or gain insights into the broader landscape of health IT, you'll find a wealth of knowledge at your fingertips."
                        }
                      </strong>
                    </Typography>
                    <ul>
                      <li>
                        <strong>
                          {'2015 Test Procedures and Companion Guides '}
                          <Link href="https://www.healthit.gov/topic/certification-ehrs/2015-edition-cures-update-test-method">
                            External Link
                          </Link>
                        </strong>
                      </li>
                      <li>
                        <strong>
                          <Link href="https://ett.healthit.gov/ett/#/edge/localinstall">Local Installation Guide</Link>
                        </strong>
                      </li>
                      <li>
                        <strong>
                          {'Installing using the AMI (Amazon Machine Image) '}
                          <Link href="https://www.healthit.gov/topic/certification-ehrs/2015-edition-cures-update-test-method">
                            Download
                          </Link>
                        </strong>
                      </li>
                      <li>
                        <strong>
                          {'2015 Test Procedures and Companion Guides '}
                          <Link href="https://www.figma.com/file/PIVBcpFNsNOcWdmuRw66IQ/SITE-Design-System?type=design&node-id=1184-48443&mode=design&t=p6NeMDXKYiJY3Aor-4">
                            Download
                          </Link>
                        </strong>
                      </li>
                    </ul>
                  </Typography>
                </div>
              }
            />
            <DocsCard
              header="Videos"
              content={
                <div>
                  <Typography sx={{ mb: 5 }}>
                    <Typography variant="body1" sx={{ mb: 1.5 }}>
                      <strong>
                        {
                          'For those who prefer visual learning, our video collection offers an engaging way to absorb information'
                        }
                      </strong>
                      <Divider sx={{ mb: 2, mt: 4 }} />
                    </Typography>
                  </Typography>
                </div>
              }
            />
          </Box>
        </Box>
      </Container>
    </div>
  )
}
