import BannerBox from '@/components/shared/BannerBox'
import SubMenu, { menuProps } from '@/components/shared/SubMenu'
import styles from '@/components/shared/styles.module.css'
import { Container, Box, Card, CardContent, CardHeader, Divider, List, ListItem, Typography } from '@mui/material'
import Link from 'next/link'
import bulletedList from '../shared/BulletList'
import TrustAnchorExchange from './TrustAnchorExchange'
import SendMessageSITE from './SendMessageSITE'
import SendMessageDirect from './SendMessageDirect'
import ReceeiveMessageSITE from './ReceiveMessageSITE'

const menuItems: menuProps[] = [
  { heading: 'Overview', href: '#overview' },
  { heading: 'Trust Anchor Exchange Instructions', href: '#trustAnchor' },
  { heading: 'Send Direct Message using SITE Trust Anchor', href: '#sendMessageSITE' },
  { heading: 'Send Direct Message using Direct Trust Production Bundle', href: '#sendMessageDirect' },
  { heading: 'Receive Direct Message from SITE', href: '#receiveMessageSITE' },
]
function trackMenuItemClick(heading: string) {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'Click transport test tool sub menu', {
      event_category: 'Navigation',
      event_label: heading,
    })
  }
}
const TransportTestTool = () => {
  return (
    <>
      {/* Global Header */}
      <BannerBox
        breadcrumbs={[
          <Link color="inherit" href="/direct" key="1" className={styles.link}>
            Direct
          </Link>,
          <Link color="inherit" href="/direct/transporttool" key="2" className={styles.link}>
            Transport Test Tool
          </Link>,
        ]}
        heading={'Direct Transport Test Tool'}
        description={
          <>
            The goal of the SITE Direct Transport test tool is to provide a mechanism for Health IT developers and
            implementers to test their Direct implementation by sending and receiving messages to and from the SITE
            Direct test tools.
          </>
        }
      />

      {/* Main Content */}
      <Container>
        <Typography variant="h3" component={'h1'} sx={{ pt: 4 }}>
          Prepare to exchange Direct messages with the Sandbox
        </Typography>
        <Box pt={4} pb={4} gap={4} display={'flex'} flexDirection={'row'}>
          <SubMenu onClick={trackMenuItemClick} menuItems={menuItems} />
          <Box gap={4} display={'flex'} flexDirection={'row'} flexWrap={'wrap'}>
            {/* Overview */}
            <Card id="overview">
              <CardHeader title="Overview" titleTypographyProps={{ fontWeight: 'bold' }} />
              <Divider />
              <CardContent>
                <Typography variant="body1" pb={2}>
                  <strong>Directions</strong>
                </Typography>
                <List sx={bulletedList('number')}>
                  <ListItem
                    sx={{
                      display: 'list-item',
                    }}
                  >
                    <Typography variant="body2">
                      Publish your Direct certificates (Organization or Address bound) per the{' '}
                      <Link href="">Direct specifications</Link>.
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ display: 'list-item' }}>
                    <Typography variant="body2">
                      If you are a member of Direct Trust production bundle, you can exchange messages with
                      interop@direct.hhs.gov using instructions provided further below.
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ display: 'list-item' }}>
                    <Typography variant="body2">
                      If you are not a member of Direct Trust production bundle, exchange Trust Anchors with SITE
                      following Trust Anchor Exchange Instructions.
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ display: 'list-item' }}>
                    <Typography variant="body2">
                      {
                        'Use the instructions in the "Send Direct Message using SITE Trust Anchor" or "Send Direct Message using Direct Trust Production Bundle" features below to send messages and verify.'
                      }
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ display: 'list-item' }}>
                    <Typography variant="body2">
                      {
                        'Use the information in the "Receive Direct Message" feature below to receive messages from the sandbox to your system.'
                      }
                    </Typography>
                  </ListItem>
                </List>

                <Typography variant="caption">
                  If you encounter any issues using the SITE Direct Transport Sandbox send an email to{' '}
                  <Link color="#42A5F5" href="mailto:edge-test-tool@googlegroups.com">
                    edge-test-tool@googlegroups.com
                  </Link>
                </Typography>
              </CardContent>
            </Card>
            {/* Trust Anchor Exchange Instructions */}
            <Card id="trustAnchor">
              <CardHeader title="Trust Anchor Exchange Instructions" titleTypographyProps={{ fontWeight: 'bold' }} />
              <Divider />
              <CardContent>
                <TrustAnchorExchange />
              </CardContent>
            </Card>
            {/* Send Direct Message using SITE Trust Anchor */}
            <Card id="sendMessageSITE">
              <CardHeader
                title="Send Direct Message using SITE Trust Anchor"
                titleTypographyProps={{ fontWeight: 'bold' }}
              />
              <Divider />
              <CardContent>
                <SendMessageSITE />
              </CardContent>
            </Card>
            {/* Send Direct Message using SITE Trust Anchor */}
            <Card id="sendMessageDirect">
              <CardHeader
                title="Send Direct Message using Direct Trust Production Bundle"
                titleTypographyProps={{ fontWeight: 'bold' }}
              />
              <Divider />
              <CardContent>
                <SendMessageDirect />
              </CardContent>
            </Card>
            {/* Receive Direct Message from SITE */}
            <Card id="receiveMessageSITE">
              <CardHeader title="Receive Direct Message from SITE" titleTypographyProps={{ fontWeight: 'bold' }} />
              <Divider />
              <CardContent>
                <ReceeiveMessageSITE />
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default TransportTestTool
