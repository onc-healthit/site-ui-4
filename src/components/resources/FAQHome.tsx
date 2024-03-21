import { Container } from '@mui/material'
import Box from '@mui/material/Box'
import Overview from '@/components/resources/FAQCards/OverviewCard'
import Direct from '@/components/resources/FAQCards/DirectCard'
import BannerBox from '@shared/BannerBox'
import SubMenu, { menuProps } from '@/components/shared/SubMenu'

export default function FAQHome() {
  const menuItems: menuProps[] = [
    { heading: 'Overview', href: '#overview' },
    { heading: 'C-CDA', href: '' },
    { heading: 'Direct', href: '#direct' },
    { heading: 'Edge', href: '' },
    { heading: 'XDM', href: '' },
    { heading: 'Other', href: '' },
    { heading: 'Contact Us', href: '' },
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
            <Box id="direct">
              <Direct />
            </Box>
          </Box>
        </Box>
      </Container>
    </div>
  )
}
