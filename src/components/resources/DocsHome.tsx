'use client'
import { Box, Container, Link } from '@mui/material'
import BannerBox from '../shared/BannerBox'
import SubMenu, { menuProps } from '@/components/shared/SubMenu'
import palette from '@/styles/palette'
import DocsCard from './DocsCard'
import { SxProps, Theme } from '@mui/system'
import { useTheme } from '@mui/material/styles'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import React from 'react'

const DocsHome = () => {
  const menuItems: menuProps[] = [
    { heading: 'Documents', href: '#documents' },
    { heading: 'GitHub', href: '#github' },
    {
      heading: 'Contact Us',
      href: 'mailto:edge-test-tool@googlegroups.com',
      icon: <MailOutlineIcon />,
    },
  ]

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
  function trackMenuItemClick(heading: string) {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'Click archive sub menu', {
        event_category: 'Navigation',
        event_label: heading,
      })
    }
  }
  return (
    <Box>
      {/* Global Header */}
      <BannerBox
        breadcrumbs={
          <Link color={palette.secondary} href={'/docs'}>
            Documents
          </Link>
        }
        heading={'Documents'}
        description={
          <>
            Explore a collection of documents and GitHub repositories on this page, designed to enhance your
            understanding of the ONC Standards Implementation & Testing Environment (SITE). Whether you&apos;re looking
            for technical documentation or ready-to-use code, these resources will support your efforts in testing and
            implementing health IT standards.
          </>
        }
      />
      <Container>
        <Box sx={flexibleBox}>
          <Box pt={4} pb={4} display={'flex'} flexDirection={'row'} gap={4}>
            <Box display={'flex'} flexDirection={'column'} gap={4}>
              <SubMenu onClick={trackMenuItemClick} menuItems={menuItems} />
            </Box>

            <Box gap={4} display={'flex'} flexDirection={'row'} flexWrap={'wrap'}>
              <BannerBox
                heading={'Documents'}
                description={
                  <>
                    Our document library is a comprehensive repository of whitepapers, research reports, guidelines, and
                    informative articles related to ONC SITE. Whether you are looking to stay up-to-date with the latest
                    regulatory changes, delve into technical specifications, or gain insights into the broader landscape
                    of health IT, you will find a wealth of knowledge at your fingertips.
                  </>
                }
              />
              <Box id="documents" display={'flex'} flexDirection={'row'} gap={4} width="100%">
                <DocsCard
                  cardHeader="Access Testing Procedures and Companion Guides"
                  description={''}
                  buttonLink="https://www.healthit.gov/topic/certification-ehrs/onc-health-it-certification-program-test-method"
                />
                <DocsCard
                  cardHeader="Endpoints for ETT.HealthIT.Gov testing"
                  description={' '}
                  buttonLink="https://github.com/onc-healthit/ett/raw/resources/documentation/guides/ETT%20Endpoints.docx"
                />
              </Box>
              <BannerBox
                heading={'GitHub'}
                description={<>The following GitHub repositories are part of SITE releases.</>}
              />
              <Box id="github" display={'flex'} flexDirection={'row'} flexWrap="wrap" gap={4} width="100%">
                <DocsCard
                  cardHeader="Reference C-CDA Validator"
                  description={'Reference C-CDA Configuration and Deployment'}
                  buttonLink="https://github.com/onc-healthit/reference-ccda-validator"
                />
                <DocsCard
                  cardHeader="Code Validator API"
                  description={
                    'This project does vocabulary validation of C-CDAs against a configured repository of codesystem and valueset files.'
                  }
                  buttonLink="https://github.com/onc-healthit/code-validator-api"
                />
                <DocsCard
                  cardHeader="Content Validator API"
                  description={' '}
                  buttonLink="https://github.com/onc-healthit/content-validator-api"
                />
                <DocsCard
                  cardHeader="C-CDA Scorecard"
                  description={'This application contains the C-CDA Scorecard service.  '}
                  buttonLink="https://github.com/onc-healthit/ccda-scorecard"
                />
                <DocsCard
                  cardHeader="XDR Message Validator"
                  description={'This tool supports testing XDR implementation over SOAP protocal. '}
                  buttonLink="https://github.com/onc-healthit/xdr-message-validator"
                />
                <DocsCard
                  cardHeader="SITE IHE XDR Test Tool Implementation"
                  description={
                    'XDRValidator is a XDR Edge protocol test tool. This tool takes a soap request of XDR message to validates it and return validation results. '
                  }
                  buttonLink="https://github.com/onc-healthit/soap"
                />
                <DocsCard
                  cardHeader="FHIR Tools"
                  description={'Set of FHIR tools for SITE '}
                  buttonLink="https://github.com/onc-healthit/fhir-tools"
                />
                <DocsCard
                  cardHeader="Direct Transport Message Sender"
                  description={' '}
                  buttonLink="https://github.com/onc-healthit/direct-transport-message-sender"
                />
                <DocsCard
                  cardHeader="Trust Anchor Uploader"
                  description={' '}
                  buttonLink="https://github.com/onc-healthit/trustanchor-uploader"
                />
                <DocsCard
                  cardHeader="XDR Message Sender"
                  description={' '}
                  buttonLink="https://github.com/onc-healthit/xdr-message-sender"
                />
                <DocsCard
                  cardHeader="Scorecard Results Mailer Job"
                  description={' '}
                  buttonLink="https://github.com/onc-healthit/scorecard-results-mailer-job"
                />
                <DocsCard
                  cardHeader=" Direct Certificate Discovery Tool (DCDT)"
                  description={'The open code repository for the Direct Certificate Discovery Tool (DCDT). '}
                  buttonLink="https://github.com/onc-healthit/dcdt"
                />
                <DocsCard cardHeader="ETT" description={' '} buttonLink="https://github.com/onc-healthit/ett" />
                <DocsCard cardHeader="SITE UI" description={' '} buttonLink="https://github.com/onc-healthit/site-ui" />
                <DocsCard
                  cardHeader="C-CDA Parser"
                  description={' '}
                  buttonLink="https://github.com/onc-healthit/ccda-parser"
                />
                <DocsCard
                  cardHeader="C-CDA USCDI Certification Testdata"
                  description={' '}
                  buttonLink="https://github.com/onc-healthit/ccda-uscdi-certification-testdata"
                />
                <DocsCard
                  cardHeader="2015 Edition Cures Update Data"
                  description={'Repository for the test data supporting the 2015 Cures Update final rule. '}
                  buttonLink="https://github.com/onc-healthit/2015-edition-cures-update-data"
                />
                <DocsCard
                  cardHeader="2015 Edition Cures Update USCDI V2 Data"
                  description={' '}
                  buttonLink="https://github.com/onc-healthit/2015-edition-cures-update-uscdi-v2-testdata"
                />
                <DocsCard
                  cardHeader="2015 Edition Cures Update USCDI V3 Data"
                  description={' '}
                  buttonLink="https://github.com/onc-healthit/2015-edition-cures-update-uscdi-v3-testdata"
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default DocsHome
