'use client'
import BannerBox from '@/components/shared/BannerBox'
import Link from 'next/link'
import styles from '@/components/shared/styles.module.css'
import SubMenu, { menuProps } from '@/components/shared/SubMenu'
import {
  Container,
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  List,
  ListItem,
  Button,
} from '@mui/material'
import palette from '@/styles/palette'
import Hosting from './Hosting'
import DCDTCertificates from './DCDTCertificates'
import bulletedList from '../shared/BulletList'

const menuItems: menuProps[] = [
  { heading: 'Overview', href: '#overview' },
  { heading: 'Hosting', href: '#hosting' },
  { heading: "Discover DCDT's Certificates", href: '#certificates' },
  { heading: 'Resources', href: '#resources' },
]
function trackMenuItemClick(heading: string) {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'Click discovery tool sub menu', {
      event_category: 'Navigation',
      event_label: heading,
    })
  }
}

type LinkButtonProps = {
  href: string
  title: string
}
const LinkButton = ({ href, title }: LinkButtonProps) => {
  return (
    <Link href={href} passHref style={{ textDecoration: 'none' }} target="_blank">
      <Button variant="outlined" sx={{ color: palette.primary }}>
        {title}
      </Button>
    </Link>
  )
}
const DiscoveryTool = () => {
  return (
    <>
      {/* Header */}
      <BannerBox
        breadcrumbs={[
          <Link color="inherit" href="/direct" key="1" className={styles.link}>
            Direct
          </Link>,
          <Link color="inherit" href="/direct/dcdt" key="2" className={styles.link}>
            Discovery Tool
          </Link>,
        ]}
        heading={'2015 Direct Certificate Discovery Tool'}
        description={
          <>
            The 2015 Direct Certificate Discovery Tool (DCDT) was created to support automated testing of systems that
            plan to enact the Certificate Discovery and Provider Directory Implementation Guide, approved as normative
            specification by the Direct community, as of July 9, 2012. It is based on the written test package and
            requirement traceability matrix created by the Modular Specifications project under the direction of the
            Office of the National Coordinator (ONC) and National Institute of Standards and Technology (NIST).
          </>
        }
      />
      {/* Main Content */}
      <Container>
        <Box pt={4} pb={4} gap={4} display={'flex'} flexDirection={'row'}>
          <SubMenu onClick={trackMenuItemClick} menuItems={menuItems} />
          <Box gap={4} display={'flex'} flexDirection={'row'} flexWrap={'wrap'}>
            {/* Overview */}
            <Card id="overview">
              <CardHeader title="Overview" titleTypographyProps={{ fontWeight: 'bold' }} />
              <Divider />
              <CardContent>
                <Typography variant="body1" pb={2}>
                  <strong>The tool is divided into two main testing areas:</strong>
                </Typography>
                <List sx={bulletedList('number')}>
                  <ListItem
                    sx={{
                      display: 'list-item',
                    }}
                  >
                    <Typography variant="body2">
                      Hosting allows a System Under Test (SUT) to verify that their certificates are hosted correctly,
                      and discoverable by other Direct implementations.
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ display: 'list-item' }}>
                    <Typography variant="body2">
                      Discovery allows a SUT to verify that they can discover certificates in other Direct
                      implementations by using them to send Direct messages.
                    </Typography>
                  </ListItem>
                </List>

                <Typography variant="caption">
                  Get information on how to report bugs, seek technical support, or contact our customer service team.
                </Typography>
              </CardContent>
            </Card>
            {/* Hosting */}
            <Card id="hosting">
              <CardHeader
                title="Hosting - Verify your certificate can be discovered"
                titleTypographyProps={{ fontWeight: 'bold' }}
              />
              <Divider />
              <CardContent>
                <Hosting />
              </CardContent>
            </Card>
            {/* Discover DCDT's Certificates */}
            <Card id="certificates">
              <CardHeader title="Discover DCDT's Certificates" titleTypographyProps={{ fontWeight: 'bold' }} />
              <Divider />
              <CardContent>
                <DCDTCertificates />
              </CardContent>
            </Card>
            {/* Resources */}
            <Card id="resources" sx={{ width: '100%' }}>
              <CardHeader title="Resources" titleTypographyProps={{ fontWeight: 'bold' }} />
              <Divider />
              <CardContent>
                <Typography variant="body1" pb={2}>
                  <strong>Direct Reference Information</strong>
                </Typography>
                <Box display={'flex'} flexDirection={'row'} gap={1} pb={2}>
                  <LinkButton href="https://wiki.directproject.org/wiki/Main_Page" title="PROJECT WIKI" />

                  <LinkButton
                    href="https://github.com/TransparentHealth/getdc"
                    title="DIRECT CERTIFICATE DOWNLOAD UTILITY"
                  />
                </Box>
                <Typography variant="body1" pb={2}>
                  <strong>DCDT Information</strong>
                </Typography>
                <Box display={'flex'} flexDirection={'row'} gap={1}>
                  <LinkButton href="https://dcdt31.healthit.gov/dcdt/version" title="VERSION" />
                  <LinkButton href="https://groups.google.com/g/directtesttool" title="FORUM" />
                  <LinkButton href="https://github.com/onc-healthit/dcdt/tree/master" title="PROJECT REPOSITORY" />
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default DiscoveryTool
