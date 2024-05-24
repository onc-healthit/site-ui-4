// MUI Imports
import BannerBox from '../shared/BannerBox'
import { Box, Container, Typography } from '@mui/material'
// Global Imports
import Link from 'next/link'
// MUI Icons
import { ArrowForward, TipsAndUpdatesOutlined } from '@mui/icons-material'
import palette from '@/styles/palette'
import SectionHeader from '../shared/SectionHeader'
import SubMenu, { menuProps } from '@/components/shared/SubMenu'
import VerticalCard from '../shared/VerticalCard'

const menuItems: menuProps[] = [
  { heading: 'HL7', href: '#hl7' },
  { heading: 'Implementation Guides', href: '#ig' },
  { heading: 'MITRE Github', href: '#mg' },
  { heading: 'Referenece Data', href: '#rd' },
]
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
              'Welcome to Your Ultimate Hub for Industry Resources, where professionals across various sectors find the tools, insights, and connections they need to excel. From comprehensive guides and research reports to the latest industry news and trends, we provide everything you need to stay ahead in your field. Join our community to access exclusive content, expert advice, and a network of like-minded professionals. Your journey to industry excellence starts here.'
            }
          </>
        }
      />
      {/* Main Content */}
      <Container>
        {/* Resources Header*/}
        <SectionHeader
          header={'Comprehensive Insights, Expert Advice, Unmatched Connections'}
          subHeader={'Empowering Your Success with Top-Tier Industry Resources'}
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
            <SubMenu menuItems={menuItems} />
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
              <Typography align="center" variant="body2" color={palette.greyDark}>
                <TipsAndUpdatesOutlined color="primary" />
                <br />
                Stay tuned for future releases where additional resources for Clinical Quality Measure Testing Tools may
                be available on this page.
              </Typography>
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
                      This page describes the FHIR tooling ecosystem and the vision for its future development,
                      including the FHIR community&apos;s collective view of what types of tooling are needed, how those
                      tools might best interact with each other and how the tooling community itself will interact and
                      collaborate to maximize the benefit of its collective investment. It also serves as an entry point
                      for those who are new to the FHIR tooling community and are interested in what tooling is
                      available and/or how they might best contribute to the community.
                    </Typography>
                    <Typography variant="caption">
                      This is a living document. It will evolve as the needs and vision of the community change.
                    </Typography>
                  </Box>
                }
                buttonTitle={'ACCESS MORE INFORMATION'}
                buttonIcon={<ArrowForward />}
                buttonHref={'https:/'}
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
                      The FHIR community publishes Implementation Guides that build on the specification and detail how
                      FHIR is used in a particular context. An implementation guide is a combination of human readable
                      documentation and computer processable content published as a FHIR NPM package.
                    </Typography>
                  </Box>
                }
                buttonTitle={'ACCESS GUIDES'}
                buttonIcon={<ArrowForward />}
                buttonHref={'https:/'}
              />
            </Box>
            <Box id="mg" sx={{ scrollMarginTop: '6em' }}>
              <VerticalCard
                title={'MITRE Github'}
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
                buttonTitle={'MITRE GitHub Repositories'}
                buttonIcon={<ArrowForward />}
                buttonHref={'https:/'}
              />
            </Box>
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
                buttonHref={'https:/'}
              />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default IndustryResourcesHome
