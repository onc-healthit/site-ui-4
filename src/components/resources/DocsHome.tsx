'use client'
import { Box, Container, Link, Typography, Divider } from '@mui/material'
import BannerBox from '../shared/BannerBox'
import SubMenu, { menuProps } from '@/components/shared/SubMenu'
import palette from '@/styles/palette'
import DocsCard from './DocsCard'
import { SxProps, Theme } from '@mui/system'
import { useTheme } from '@mui/material/styles'
import ForwardToInboxOutlinedIcon from '@mui/icons-material/ForwardToInboxOutlined'
import React from 'react'
import eventTrack from '@/services/analytics'

const DocsHome = () => {
  const menuItems: menuProps[] = [
    { heading: 'Document Library', href: '#document-library' },
    { heading: 'GitHub', href: '#github' },
    {
      heading: 'Contact Us',
      href: 'mailto:edge-test-tool@googlegroups.com',
      icon: <ForwardToInboxOutlinedIcon color="primary" fontSize="small" />,
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
  const trackMenuItemClick = (heading: string) => {
    eventTrack('Click Documentation sub menu', 'Documentation', heading)
  }
  return (
    <Box>
      {/* Global Header */}
      <BannerBox
        breadcrumbs={
          <Link color={palette.secondary} href={'/docs'}>
            Docs
          </Link>
        }
        heading={'Documentation'}
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
            <Box gap={2} display={'flex'} flexDirection={'column'} flexWrap={'wrap'}>
              <Typography fontWeight={'600'} mb={0} component="h2" variant="h4">
                Document Library
              </Typography>
              <Typography>
                Our document library offers a growing collection of resources relevant to SITE. It will be updated to
                build a comprehensive repository of relevant materials.
              </Typography>
              <Box
                id="document-library"
                sx={{ scrollMarginTop: '200px' }}
                display={'flex'}
                flexDirection={'row'}
                gap={4}
                width="100%"
              >
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
              <Divider sx={{ my: 2, borderBottomWidth: 2 }} />
              <Box gap={2} display={'flex'} flexDirection={'column'} flexWrap={'wrap'}>
                <Typography fontWeight={'600'} mb={0} component="h2" variant="h4">
                  Github
                </Typography>
                <Typography>The following GitHub repositories are part of SITE releases.</Typography>
              </Box>

              <Box
                id="github"
                sx={{ scrollMarginTop: '200px' }}
                display={'flex'}
                flexDirection={'row'}
                flexWrap="wrap"
                gap={4}
                width="100%"
              >
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
                  description={'Source code for the C-CDA Validator API'}
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
                {/* Although the GitHub repo still exists - removed as per ASTP request for 2025-01-06 SITE Release */}
                {/* <DocsCard
                  cardHeader="FHIR® Tools"
                  description={'Set of FHIR® tools for SITE '}
                  buttonLink="https://github.com/onc-healthit/fhir-tools"
                /> */}
                <DocsCard
                  cardHeader="Direct Transport Message Sender"
                  description={'Source code for Direct transport sender service'}
                  buttonLink="https://github.com/onc-healthit/direct-transport-message-sender"
                />
                <DocsCard
                  cardHeader="Trust Anchor Uploader"
                  description={
                    'Upload trust anchors so they can be added to the trust bundle used for Direct Transport'
                  }
                  buttonLink="https://github.com/onc-healthit/trustanchor-uploader"
                />
                <DocsCard
                  cardHeader="XDR Message Sender"
                  description={'Source code for the XDR Message Sender service'}
                  buttonLink="https://github.com/onc-healthit/xdr-message-sender"
                />
                <DocsCard
                  cardHeader="Scorecard Results Mailer Job"
                  description={'Source code for Scorecard Results Mailer Job'}
                  buttonLink="https://github.com/onc-healthit/scorecard-results-mailer-job"
                />
                <DocsCard
                  cardHeader=" Direct Certificate Discovery Tool (DCDT)"
                  description={'The open code repository for the Direct Certificate Discovery Tool (DCDT). '}
                  buttonLink="https://github.com/onc-healthit/dcdt"
                />
                <DocsCard
                  cardHeader="ETT"
                  description={'Source code for the Edge Testing Tool'}
                  buttonLink="https://github.com/onc-healthit/ett"
                />
                <DocsCard
                  cardHeader="SITE UI"
                  description={'Source code for SITE UI'}
                  buttonLink="https://github.com/onc-healthit/site-ui"
                />
                <DocsCard
                  cardHeader="C-CDA Parser"
                  description={'Source code for the C-CDA Parser'}
                  buttonLink="https://github.com/onc-healthit/ccda-parser"
                />
                <DocsCard
                  cardHeader="C-CDA USCDI Certification Test Data"
                  description={'Source code for C-CDA USCDI Certification Test Data '}
                  buttonLink="https://github.com/onc-healthit/ccda-uscdi-certification-testdata"
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
