'use client'
// MUI Imports
import BannerBox from '../shared/BannerBox'
import { Box, Container, Typography } from '@mui/material'
// Global Imports
import Link from 'next/link'
// MUI Icons
import { ArrowForward } from '@mui/icons-material'
import palette from '@/styles/palette'
import SectionHeader from '../shared/SectionHeader'
import SubMenu, { menuProps } from '@/components/shared/SubMenu'
import VerticalCard from '../shared/VerticalCard'
import eventTrack from '@/services/analytics'

const menuItems: menuProps[] = [
  { heading: 'HL7', href: '#hl7' },
  { heading: 'Implementation Guides', href: '#ig' },
  { heading: 'MITRE Github', href: '#mg' },
]

const trackMenuItemClick = (heading: string) => {
  eventTrack('Click industry resources sub menu', 'Industry Resources', heading)
}

const IndustryResourcesHome = () => {
  return (
    <Box>
      {/* Global Header */}
      <BannerBox
        breadcrumbs={
          <Link color={palette.secondary} href={'/industry-resources'}>
            Industry Resources
          </Link>
        }
        heading={'Industry Resources'}
        description={
          <>
            {
              'Welcome to the Industry Resources Hub! Here, you will find valuable links to resources that can support your development, testing, and certification efforts in the ONC Certification program. Whether you are navigating technical requirements or seeking tools for interoperability testing, these resources can help guide your process.'
            }
          </>
        }
      />
      {/* Main Content */}
      <Container>
        {/* Resources Header*/}
        <SectionHeader
          header={'Key Resources for Your Testing and Certification Needs'}
          subHeader={'Industry Standards and Testing Tools Guidance'}
        />
        <Box pb={4} gap={4} display={'flex'} flexDirection={'row'}>
          <Box
            top={'80px'}
            position={'sticky'}
            height={'fit-content'}
            width={'15vw'}
            pb={4}
            gap={4}
            display={'flex'}
            flexDirection={'column'}
          >
            <SubMenu onClick={trackMenuItemClick} menuItems={menuItems} />
            <Box
              border={`1px solid ${palette.grey}`}
              borderRadius={2}
              padding={4}
              display={'flex'}
              alignItems={'center'}
              justifyContent={'space-between'}
              flexDirection={'row'}
              width={'100%'}
            >
              {/* <Typography align="center" variant="body2" color={palette.greyDark}>
                <TipsAndUpdatesOutlined color="primary" />
                <br />
                Stay tuned for future releases where additional resources may be available on this page.
              </Typography> */}
            </Box>
          </Box>

          {/* Resources*/}
          <Box display={'flex'} gap={4} flexDirection={'column'} width={'100%'}>
            <Box id="hl7" sx={{ scrollMarginTop: '6em' }}>
              <VerticalCard
                title={'HL7'}
                description={
                  <Box sx={{ borderTop: `1px solid ${palette.divider}` }}>
                    <Typography pt={2} gutterBottom variant="body2" fontWeight={600}>
                      Assess the conformance, interoperability, and functionality of healthcare information systems
                      implementing HL7 standards.
                    </Typography>
                    <Typography gutterBottom variant="body2">
                      This page describes the FHIR® tooling ecosystem and the vision for its future development,
                      including the FHIR® community&apos;s collective view of what types of tooling are needed, how
                      those tools might best interact with each other and how the tooling community itself will interact
                      and collaborate to maximize the benefit of its collective investment. It also serves as an entry
                      point for those who are new to the FHIR® tooling community and are interested in what tooling is
                      available and/or how they might best contribute to the community.
                    </Typography>
                    <Typography variant="caption">
                      This is a living document. It will evolve as the needs and vision of the community change.
                    </Typography>
                  </Box>
                }
                buttonTitle={'Access HL7 FHIR Tooling'}
                buttonIcon={<ArrowForward />}
                buttonHref={'https://confluence.hl7.org/display/FHIR/FHIR+Tooling+Ecosystem'}
              />
            </Box>
            <Box id="ig" sx={{ scrollMarginTop: '6em' }}>
              <VerticalCard
                title={'Implementation Guides'}
                description={
                  <Box sx={{ borderTop: `1px solid ${palette.divider}` }}>
                    <Typography pt={2} gutterBottom variant="body2" fontWeight={600}>
                      Implementation guides in healthcare serve as comprehensive documents outlining the specific rules,
                      standards, and protocols for implementing interoperable health information systems.
                    </Typography>
                    <Typography gutterBottom variant="body2">
                      The FHIR® community publishes Implementation Guides that build on the specification and detail
                      how FHIR® is used in a particular context. An implementation guide is a combination of human
                      readable documentation and computer processable content published as a FHIR® NPM package.
                    </Typography>
                  </Box>
                }
                buttonTitle={'Access FHIR Implementation Guides'}
                buttonIcon={<ArrowForward />}
                buttonHref={
                  'https://confluence.hl7.org/display/FHIR/Authoring+FHIR+Implementation+Guides+-+Introduction'
                }
              />
            </Box>
            <Box id="mg" sx={{ scrollMarginTop: '6em' }}>
              <VerticalCard
                title={'HL7 GitHub'}
                description={
                  <Box sx={{ borderTop: `1px solid ${palette.divider}` }}>
                    <Typography pt={2} gutterBottom variant="body2" fontWeight={600}>
                      Multiple repositories for Health Level Seven International
                    </Typography>
                  </Box>
                }
                buttonTitle={'Visit HL7 GitHub Repositories'}
                buttonIcon={<ArrowForward />}
                buttonHref={'https://github.com/HL7'}
              />
            </Box>
            <Box id="mg" sx={{ scrollMarginTop: '6em' }}>
              <VerticalCard
                title={'HL7 Zulip Chat'}
                description={
                  <Box sx={{ borderTop: `1px solid ${palette.divider}` }}>
                    <Typography pt={2} gutterBottom variant="body2" fontWeight={600}>
                      Join the ongoing conversations about various HL7 topics
                    </Typography>
                  </Box>
                }
                buttonTitle={'Acces HL7 Zulip Chat'}
                buttonIcon={<ArrowForward />}
                buttonHref={'https://chat.fhir.org'}
              />
            </Box>
            <Box id="mg" sx={{ scrollMarginTop: '6em' }}>
              <VerticalCard
                title={'MITRE GitHub'}
                description={
                  <Box sx={{ borderTop: `1px solid ${palette.divider}` }}>
                    <Typography pt={2} gutterBottom variant="body2" fontWeight={600}>
                      Open Source Software from the MITRE Corporation
                    </Typography>
                    <Typography gutterBottom variant="body2">
                      Visit MITRE&apos;s GitHub page to explore a wealth of open-source repositories. MITRE, a leader in
                      innovative research and technology, offers a variety of projects that span cybersecurity,
                      artificial intelligence, healthcare, and more. By accessing their GitHub, you&apos;ll gain
                      insights into advanced solutions and tools crafted by experts.
                    </Typography>
                  </Box>
                }
                buttonTitle={'Visit MITRE GitHub Repositories'}
                buttonIcon={<ArrowForward />}
                buttonHref={'https://github.com/mitre'}
              />
            </Box>
            <Box id="mg" sx={{ scrollMarginTop: '6em' }}>
              <VerticalCard
                title={'HAPI'}
                description={
                  <Box sx={{ borderTop: `1px solid ${palette.divider}` }}>
                    <Typography pt={2} gutterBottom variant="body2" fontWeight={600}>
                      The foremost open-source server for FHIR
                    </Typography>
                  </Box>
                }
                buttonTitle={'Access HAPI FHIR'}
                buttonIcon={<ArrowForward />}
                buttonHref={'https://hapifhir.io'}
              />
            </Box>
            <Box id="mg" sx={{ scrollMarginTop: '6em' }}>
              <VerticalCard
                title={'BCH'}
                description={
                  <Box sx={{ borderTop: `1px solid ${palette.divider}` }}>
                    <Typography pt={2} gutterBottom variant="body2" fontWeight={600}>
                      SMART BCH Platform developed the original tools for SMART
                    </Typography>
                  </Box>
                }
                buttonTitle={'Access BCH resources'}
                buttonIcon={<ArrowForward />}
                buttonHref={'https://smarthealthit.org/developer-resources'}
              />
            </Box>
            <Box id="mg" sx={{ scrollMarginTop: '6em' }}>
              <VerticalCard
                title={'Microsoft'}
                description={
                  <Box sx={{ borderTop: `1px solid ${palette.divider}` }}>
                    <Typography pt={2} gutterBottom variant="body2" fontWeight={600}>
                      Microsoft Azure FHIR healthcare API documentation
                    </Typography>
                  </Box>
                }
                buttonTitle={'Access Microsoft FHIR API documentation'}
                buttonIcon={<ArrowForward />}
                buttonHref={'https://learn.microsoft.com/en-us/azure/healthcare-apis/fhir/'}
              />
            </Box>
            <Box id="mg" sx={{ scrollMarginTop: '6em' }}>
              <VerticalCard
                title={'Google'}
                description={
                  <Box sx={{ borderTop: `1px solid ${palette.divider}` }}>
                    <Typography pt={2} gutterBottom variant="body2" fontWeight={600}>
                      Google Cloud FHIR healthcare API documentation
                    </Typography>
                  </Box>
                }
                buttonTitle={'Access Google FHIR API documentation'}
                buttonIcon={<ArrowForward />}
                buttonHref={'https://cloud.google.com/healthcare-api/docs/how-tos/fhir'}
              />
            </Box>
            {/*
            <Box id="rd" sx={{ scrollMarginTop: '6em' }}>
              <VerticalCard
                title={'Reference Data'}
                description={
                  <Box sx={{ borderTop: `1px solid ${palette.divider}` }}>
                    <Typography pt={2} gutterBottom variant="body2" fontWeight={600}>
                      Values used to standardize and categorize data elements within a system, making it easier to
                      understand and compare data across different applications or processes.
                    </Typography>
                  </Box>
                }
                buttonTitle={'DOCUMENTATION'}
                buttonIcon={<ArrowForward />}
                buttonHref={'#'}
              />
            </Box>
            */}
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default IndustryResourcesHome
