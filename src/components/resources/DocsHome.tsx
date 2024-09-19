import { Typography, Container, List, ListItemButton, Link } from '@mui/material'
import Box from '@mui/material/Box'
import DocsCard from './DocsCard'
import BannerBox from '@shared/BannerBox'
import palette from '@/styles/palette'
import DocsSubMenu from './DocsSubMenu'

export default function DocsHome() {
  return (
    <div>
      <BannerBox
        breadcrumbs={
          <Link color={palette.secondary} href={'/docs'}>
            Documents
          </Link>
        }
        heading={'Documents'}
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
              header="Documents"
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

                    <ListItemButton href="https://github.com/onc-healthit/ett/raw/resources/documentation/guides/ETT%20Endpoints.docx">
                      Endpoints for ETT.HealthIT.Gov testing
                    </ListItemButton>
                  </List>
                </div>
              }
            />
            <DocsCard
              header="GitHub"
              content={
                <div>
                  <Typography id="github" variant="body1" sx={{ mb: 2 }}>
                    The following Github repositories are part of SITE releases.
                  </Typography>
                  <div
                    style={{
                      display: 'grid',
                      gap: '20px',
                    }}
                  >
                    <List>
                      <Typography style={{ marginBottom: 16 }}>
                        reference-ccda-validator:
                        <a href="https://github.com/onc-healthit/reference-ccda-validator" style={{ marginLeft: 4 }}>
                          https://github.com/onc-healthit/reference-ccda-validator
                        </a>
                      </Typography>
                      <Typography style={{ marginBottom: 16 }}>
                        code-validator-api:
                        <a href="https://github.com/onc-healthit/code-validator-api" style={{ marginLeft: 4 }}>
                          https://github.com/onc-healthit/code-validator-api
                        </a>
                      </Typography>
                      <Typography style={{ marginBottom: 16 }}>
                        content-validator-api:
                        <a href="https://github.com/onc-healthit/content-validator-api" style={{ marginLeft: 4 }}>
                          https://github.com/onc-healthit/content-validator-api
                        </a>
                      </Typography>
                      <Typography style={{ marginBottom: 16 }}>
                        ccda-scorecard:
                        <a href="https://github.com/onc-healthit/reference-ccda-validator" style={{ marginLeft: 4 }}>
                          https://github.com/onc-healthit/reference-ccda-validator
                        </a>
                      </Typography>
                      <Typography style={{ marginBottom: 16 }}>
                        xdr-message-validator:
                        <a href="https://github.com/onc-healthit/xdr-message-validator" style={{ marginLeft: 4 }}>
                          https://github.com/onc-healthit/xdr-message-validator
                        </a>
                      </Typography>
                      <Typography style={{ marginBottom: 16 }}>
                        SITE IHE XDR Test Tool Implementation:
                        <a href="https://github.com/onc-healthit/soap" style={{ marginLeft: 4 }}>
                          https://github.com/onc-healthit/soap
                        </a>
                      </Typography>
                      <Typography style={{ marginBottom: 16 }}>
                        Set of FHIR tools for SITE:
                        <a href="https://github.com/onc-healthit/fhir-tools" style={{ marginLeft: 4 }}>
                          https://github.com/onc-healthit/fhir-tools
                        </a>
                      </Typography>
                      <Typography style={{ marginBottom: 16 }}>
                        direct-transport-message-sender:
                        <a
                          href="https://github.com/onc-healthit/direct-transport-message-sender"
                          style={{ marginLeft: 4 }}
                        >
                          https://github.com/onc-healthit/direct-transport-message-sender
                        </a>
                      </Typography>
                      <Typography style={{ marginBottom: 16 }}>
                        trustanchor-uploader:
                        <a href="https://github.com/onc-healthit/trustanchor-uploader" style={{ marginLeft: 4 }}>
                          https://github.com/onc-healthit/trustanchor-uploader
                        </a>
                      </Typography>
                      <Typography style={{ marginBottom: 16 }}>
                        xdr-message-sender:
                        <a href="https://github.com/onc-healthit/xdr-message-sender" style={{ marginLeft: 4 }}>
                          https://github.com/onc-healthit/xdr-message-sender
                        </a>
                      </Typography>
                      <Typography style={{ marginBottom: 16 }}>
                        scorecard-results-mailer-job:
                        <a
                          href="https://github.com/onc-healthit/scorecard-results-mailer-job"
                          style={{ marginLeft: 4 }}
                        >
                          https://github.com/onc-healthit/scorecard-results-mailer-job
                        </a>
                      </Typography>
                      <Typography style={{ marginBottom: 16 }}>
                        Direct Certificate Discovery Tool (DCDT):
                        <a href="https://github.com/onc-healthit/dcdt" style={{ marginLeft: 4 }}>
                          https://github.com/onc-healthit/dcdt
                        </a>
                      </Typography>
                      <Typography style={{ marginBottom: 16 }}>
                        ETT:
                        <a href="https://github.com/onc-healthit/ett" style={{ marginLeft: 4 }}>
                          https://github.com/onc-healthit/ett
                        </a>
                      </Typography>
                      <Typography style={{ marginBottom: 16 }}>
                        SiteUi:
                        <a href="https://github.com/onc-healthit/site-ui" style={{ marginLeft: 4 }}>
                          https://github.com/onc-healthit/site-ui
                        </a>
                      </Typography>
                      <Typography style={{ marginBottom: 16 }}>
                        ccda-parser:
                        <a href="https://github.com/onc-healthit/ccda-parser" style={{ marginLeft: 4 }}>
                          https://github.com/onc-healthit/ccda-parser
                        </a>
                      </Typography>
                      <Typography style={{ marginBottom: 16 }}>
                        ccda-uscdi-certification-testdata:
                        <a
                          href="https://github.com/onc-healthit/ccda-uscdi-certification-testdata"
                          style={{ marginLeft: 4 }}
                        >
                          https://github.com/onc-healthit/ccda-uscdi-certification-testdata
                        </a>
                      </Typography>
                      <Typography style={{ marginBottom: 16 }}>
                        2015 Edition Cures Update Data:
                        <a
                          href="https://github.com/onc-healthit/2015-edition-cures-update-data"
                          style={{ marginLeft: 4 }}
                        >
                          https://github.com/onc-healthit/2015-edition-cures-update-data
                        </a>
                      </Typography>
                      <Typography style={{ marginBottom: 16 }}>
                        2015 Edition Cures Update USCDI V2 Data:
                        <a
                          href="https://github.com/onc-healthit/2015-edition-cures-update-uscdi-v2-testdata"
                          style={{ marginLeft: 4 }}
                        >
                          https://github.com/onc-healthit/2015-edition-cures-update-uscdi-v2-testdata
                        </a>
                      </Typography>
                      <Typography style={{ marginBottom: 16 }}>
                        2015 Edition Cures Update USCDI V3 Data:
                        <a
                          href="https://github.com/onc-healthit/2015-edition-cures-update-uscdi-v3-testdata"
                          style={{ marginLeft: 4 }}
                        >
                          https://github.com/onc-healthit/2015-edition-cures-update-uscdi-v3-testdata
                        </a>
                      </Typography>
                    </List>
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
