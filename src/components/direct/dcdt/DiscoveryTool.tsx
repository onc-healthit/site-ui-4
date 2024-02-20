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
  MenuItem,
  TextField,
  Button,
} from '@mui/material'
import palette from '@/styles/palette'
import React, { useEffect } from 'react'

const SiteList = {
  listStyleType: 'number',
  ml: 4,
  [`& li.MuiListItem-root::marker`]: {
    width: '1em',
    fontSize: '14px',
    color: palette.primary,
  },
}

const menuItems: menuProps[] = [
  { heading: 'Overview', href: '#overview' },
  { heading: 'Hosting', href: '#hosting' },
  { heading: "Discover DCDT's Certificates", href: '#certificates' },
  { heading: 'Resources', href: '#resources' },
]

const hostingTestCases = [
  {
    value: ' ',
    label: '--No testcase selected--',
  },
  {
    value: 'H1_DNS_AB_Normal',
    label: 'H1 - Normal address-bound certificate search in DNS',
  },
  {
    value: 'H2_DNS_DB_Normal',
    label: 'H2 - Normal domain-bound certificate search in DNS',
  },
  {
    value: 'H3_LDAP_AB_Normal',
    label: 'H3 - Normal address-bound certificate search in LDAP',
  },
  {
    value: 'H4_LDAP_DB_Normal',
    label: 'H4 - Normal domain-bound certificate search in LDAP',
  },
]

const discoveryTestCases = [
  {
    value: ' ',
    label: '--No testcase selected--',
  },
  {
    value: 'D1_DNS_AB_Valid',
    label: 'D1 - Valid address-bound certificate discovery in DNS',
  },
  {
    value: 'D2_DNS_DB_Valid',
    label: 'D2 - Valid domain-bound certificate discovery in DNS',
  },
  {
    value: 'D3_LDAP_AB_Valid',
    label: 'D3 - Valid address-bound certificate discovery in LDAP',
  },
  {
    value: 'D4_LDAP_DB_Valid',
    label: 'D4 - Valid domain-bound certificate discovery in LDAP',
  },
  {
    value: 'D5_DNS_AB_Invalid',
    label: 'D5 - Invalid address-bound certificate discovery in DNS',
  },
  {
    value: 'D6_DNS_DB_Invalid',
    label: 'D6 - Invalid domain-bound certificate discovery in DNS',
  },
  {
    value: 'D7_LDAP_AB_Invalid',
    label: 'D7 - Invalid address-bound certificate discovery in LDAP',
  },
  {
    value: 'D8_LDAP_DB_Invalid',
    label: 'D8 - Invalid domain-bound certificate discovery in LDAP',
  },
  {
    value: 'D9_DNS_AB_SelectValid',
    label: 'D9 - Select valid address-bound certificate over invalid certificate in DNS',
  },
  {
    value: 'D10_LDAP_AB_UnavailableLDAPServer',
    label: 'D10 - Certificate discovery in LDAP with one unavailable LDAP server',
  },
  {
    value: 'D11_DNS_NB_NoDNSCertsorSRV',
    label: 'D11 - No certificates discovered in DNS CERT records and no SRV records',
  },
  {
    value: 'D12_LDAP_NB_UnavailableLDAPServer',
    label: 'D12 - No certificates found in DNS CERT records and no available LDAP servers',
  },
  {
    value: 'D13_LDAP_NB_NoCerts',
    label: 'D13 - No certificates discovered in DNS CERT records or LDAP servers',
  },
  {
    value: 'D14_DNS_AB_TCPLargeCert',
    label: 'D14 - Discovery of certificate larger than 512 bytes in DNS',
  },
  {
    value: 'D15_LDAP_AB_SRVPriority',
    label: 'D15 - Certificate discovery in LDAP based on SRV priority value',
  },
  {
    value: 'D16_LDAP_AB_SRVWeight',
    label: 'D16 - Certificate discovery in LDAP based on SRV weight value',
  },
  {
    value: 'D17_DNS_AB_CRLRevocation',
    label: 'D17 - CRL-based revocation checking for address-bound certificate discovery in DNS',
  },
  {
    value: 'D18_DNS_AB_AIAIntermediateIssuer',
    label: 'D18 - AIA-based intermediate issuer certificate retrieval for address-bound certificate discovery in DNS',
  },
]
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
  const [hostingCase, setHostingCase] = React.useState(' ')
  const [discoverCase, setDiscoverCase] = React.useState(' ')
  const [openHostingCase, setOpenHostingCase] = React.useState(false)
  const [openDiscoverCase, setOpenDiscoverCase] = React.useState(false)

  const handleHostingCaseSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHostingCase(event.target.value as string)
  }

  const handleDiscoverCaseSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDiscoverCase(event.target.value as string)
  }

  useEffect(() => {
    if (hostingCase !== ' ') {
      setOpenHostingCase(true)
    } else {
      setOpenHostingCase(false)
    }
    if (discoverCase !== ' ') {
      setOpenDiscoverCase(true)
    } else {
      setOpenDiscoverCase(false)
    }
  }, [discoverCase, hostingCase])
  return (
    <>
      {/* Header */}
      <BannerBox
        breadcrumbs={[
          <Link color="inherit" href="/direct" key="1" className={styles.link}>
            Direct
          </Link>,
          <Link color="inherit" href="/direct/dcdt" key="2" className={styles.link}>
            Direct Message
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
          <SubMenu menuItems={menuItems} />
          <Box gap={4} display={'flex'} flexDirection={'row'} flexWrap={'wrap'}>
            {/* Overview */}
            <Card id="overview">
              <CardHeader title="Overview" titleTypographyProps={{ fontWeight: 'bold' }} />
              <Divider />
              <CardContent>
                <Typography variant="body1" pb={2}>
                  <strong>The tool is divided into two main testing areas:</strong>
                </Typography>
                <List sx={SiteList}>
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
                <Typography variant="body1">
                  <strong>Directions</strong>
                </Typography>
                <List sx={SiteList}>
                  <ListItem sx={{ display: 'list-item' }}>
                    <Typography variant="body2">
                      Determine the required test cases for your SUT (System Under Test). Notice that there are two
                      options for storage of address-bound and domain-bound certificates.
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ display: 'list-item' }}>
                    <Typography variant="body2">Select a test case that reflects the SUT from the dropdown.</Typography>
                  </ListItem>
                  <ListItem sx={{ display: 'list-item' }}>
                    <Typography variant="body2">
                      Read the Description and Instructions for the selected test case. Then enter the Direct address
                      and submit. Your SUT configuration may require that you select more than one test case. If so,
                      then select one test case at a time, following the instructions to execute the test after each
                      selection.
                    </Typography>
                  </ListItem>
                </List>
                <Box p={2}>
                  <TextField
                    fullWidth
                    id="select-hosting-test-case"
                    name="hostingTestCase"
                    select
                    label="Select a Hosting Test Case"
                    helperText=""
                    value={hostingCase}
                    sx={{ pb: 2 }}
                    onChange={handleHostingCaseSelect}
                  >
                    {hostingTestCases.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  {openHostingCase && (
                    <Box>
                      <Typography>TBD</Typography>
                    </Box>
                  )}
                  <TextField
                    fullWidth
                    id="step1DirectAddress"
                    name="step1DirectAddress"
                    label="Enter your Direct Address"
                    helperText=""
                    required
                    InputProps={{ type: 'email' }}
                  />
                </Box>
                <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} p={2}>
                  <Box display={'flex'} flexDirection={'row'} gap={1}>
                    <Button variant="contained" sx={{ color: palette.white }}>
                      SUBMIT
                    </Button>
                  </Box>
                  <Button variant="outlined" sx={{ color: palette.primary }}>
                    RESET FIELDS
                  </Button>
                </Box>
              </CardContent>
            </Card>
            {/* Discover DCDT's Certificates */}
            <Card id="certificates">
              <CardHeader title="Discover DCDT's Certificates" titleTypographyProps={{ fontWeight: 'bold' }} />
              <Divider />
              <CardContent>
                <Typography variant="body1">
                  <strong>Directions</strong>
                </Typography>
                <List sx={SiteList}>
                  <ListItem sx={{ display: 'list-item' }}>
                    <Typography variant="body2">
                      {"Download the Testing Tool's trust anchor."} <Link href={''}>Download Trust Anchor</Link>
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ display: 'list-item' }}>
                    <Typography variant="body2">
                      Upload the anchor to your Direct instance. This will allow you to send messages to our tool.
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ display: 'list-item' }}>
                    <Typography variant="body2">
                      Using the form below, map the Direct email address from which you will be sending messages to a
                      non-Direct email address that will receive a regular email containing test results. This email
                      address should be able to receive plain text messages. Make sure you have access to the recipient
                      email address in order to verify the receipt of the messages.
                    </Typography>
                  </ListItem>
                  <Box p={2}>
                    <TextField
                      fullWidth
                      id="step2DirectAddress"
                      name="step2DirectAddress"
                      label="Enter your Direct Address"
                      helperText=""
                      required
                      InputProps={{ type: 'email' }}
                      sx={{ pb: 2 }}
                    />
                    <TextField
                      fullWidth
                      id="emailAddress"
                      name="emailAddress"
                      label="Enter your Email Address"
                      helperText="For Results"
                      required
                      InputProps={{ type: 'email' }}
                    />
                  </Box>
                  <ListItem sx={{ display: 'list-item' }}>
                    <Typography variant="body2">
                      {
                        'Choose a test case from the drop down menu below. Read the test case description below the "Direct Address" field, copy the displayed Direct address and proceed to step 5. You should run all of the tests in order to verify that your system can correctly discover certificates in either DNS CERT records or LDAP servers. (Note: your system MUST NOT already contain a certificate for the address selected or the test case will not be valid).'
                      }
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ display: 'list-item' }}>
                    <Typography variant="body2">
                      {
                        "Attempt to send a message to the Direct address that you've just copied. Please only send to one address at a time. The test case results message will indicate the test case results. See the test case instructions for additional information."
                      }
                    </Typography>
                  </ListItem>
                  <Box p={2}>
                    <TextField
                      fullWidth
                      id="select-discover-test-case"
                      name="discoverTestCase"
                      select
                      label="Select a Discover Test Case"
                      helperText=""
                      value={discoverCase}
                      onChange={handleDiscoverCaseSelect}
                    >
                      {discoveryTestCases.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    {openDiscoverCase && (
                      <Box>
                        <Typography>TBD</Typography>
                      </Box>
                    )}
                  </Box>
                </List>

                <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} p={2}>
                  <Box display={'flex'} flexDirection={'row'} gap={1}>
                    <Button variant="contained" sx={{ color: palette.white }}>
                      SUBMIT
                    </Button>
                  </Box>
                  <Button variant="outlined" sx={{ color: palette.primary }}>
                    RESET FIELDS
                  </Button>
                </Box>
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
