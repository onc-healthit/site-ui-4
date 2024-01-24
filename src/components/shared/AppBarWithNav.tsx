// TODO:
// -Extract out components such as AppBar, Nav, Search, Authentication, etc.
// -Padding for page content open and close (Container)
'use client'
import * as React from 'react'
import { styled, useTheme, Theme, CSSObject, alpha } from '@mui/material/styles'
import Box from '@mui/material/Box'
import MuiDrawer from '@mui/material/Drawer'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import CssBaseline from '@mui/material/CssBaseline'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import Image from 'next/image'
import SearchIcon from '@mui/icons-material/Search'
import { Collapse, InputBase } from '@mui/material'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import Switch from '@mui/material/Switch'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import AccountCircle from '@mui/icons-material/AccountCircle'
import Link from 'next/link'
import {
  AddchartOutlined,
  AltRouteOutlined,
  ArchiveOutlined,
  Biotech,
  CheckCircleOutline,
  CloudOutlined,
  CompareArrows,
  ContentCopy,
  ExpandLess,
  ExpandMore,
  FireplaceOutlined,
  FolderSpecialOutlined,
  GroupsOutlined,
  HandymanOutlined,
  HealingOutlined,
  ImportantDevicesOutlined,
  IntegrationInstructionsOutlined,
  LocalFireDepartmentOutlined,
  MedicalInformationOutlined,
  MedicationOutlined,
  MenuBookOutlined,
  MonitorHeartOutlined,
  PageviewOutlined,
  PublishedWithChanges,
  QuestionAnswerOutlined,
  SquareFootOutlined,
} from '@mui/icons-material'

const drawerWidth = 300
const navPaddingLeft = 4
const genericLinkToReplace = 'https://www.healthit.gov'
const siteVersion = '4.0-static'

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}))

export default function AppBarWithNav() {
  const theme = useTheme()

  // START Nav
  const [open, setOpen] = React.useState(true)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const [openCertList, setOpenCertList] = React.useState(true)
  const [openGeneralTestingList, setOpenGeneralTestingList] = React.useState(false)
  const [openIndustryTestingList, setOpenIndustryTestingList] = React.useState(false)
  const [openResourcesList, setOpenResourcesList] = React.useState(false)

  const handleClickCertList = () => {
    setOpenCertList(!openCertList)
  }

  const handleClickGeneralTestingList = () => {
    setOpenGeneralTestingList(!openGeneralTestingList)
  }

  const handleClickIndustryTestingList = () => {
    setOpenIndustryTestingList(!openIndustryTestingList)
  }

  const handleClickResourcesList = () => {
    setOpenResourcesList(!openResourcesList)
  }

  // END Nav

  // START Auth
  const [auth, setAuth] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked)
  }

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  // END Auth

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <AppBar position="sticky" open={open}>
        <Toolbar
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          {/* Toggle Drawer Elipses Menu Button */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>

          {/* Search UI */}
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
          </Search>

          {/* Login */}
          <Box display="flex" flexDirection="row" alignItems="center">
            <Typography variant="h6" component="div">
              {auth ? 'LOGGED-IN-USER' : 'LOGIN'}
            </Typography>
            {auth ? (
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Account Info</MenuItem>
                  <MenuItem onClick={handleClose}>Change Password</MenuItem>
                </Menu>
              </div>
            ) : (
              <div>
                <IconButton
                  size="large"
                  aria-label="log in to an account"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  {/* TODO: This will have its own UI and won't be a basic menu */}
                  <MenuItem onClick={handleClose}>Sign In</MenuItem>
                  <MenuItem onClick={handleClose}>Create Account</MenuItem>
                </Menu>
              </div>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Nav */}
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Link href={'/'} passHref>
            <Image
              src="/shared/site-nav-logo.svg"
              width={242}
              height={42}
              alt="SITE logo with text: The hub for testing tools & resources"
              // style={{ width: 287, height: 'auto' }}
            />
          </Link>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>

        {/* Old Nav List */}
        {/* <Divider />
        <List>
          {[
            'ONC Certification Tools',
            'General Testing Tools',
            'Industry Testing Resources',
            'Resources',
            'Archived',
          ].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List> */}

        {/* New Expandable Nav List in progress,
        TODO:
        -Determine and add missing external links (defaulted to genericLinkToReplace const for now)
        -Export styles a bit vs repeating padding, navPaddingLeft, etc.
        -Modularize vs repeating code
        -Consider matching FIGMA design exactly, or, allowing home to still be selected on drawer close
        -'Industry Testing Resources' is overlapping: Change text, font size, or tighten padding */}
        <Divider />
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} component="nav">
          {/* ONC Certification Tools */}
          <ListItemButton onClick={handleClickCertList}>
            <ListItemIcon>
              <CheckCircleOutline />
            </ListItemIcon>
            <ListItemText primary="ONC Certification Tools" />
            {openCertList ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Divider />
          <Collapse in={openCertList} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link target="_blank" rel="noopener noreferrer" href="https://inferno.healthit.gov/">
                <ListItemButton sx={{ pl: navPaddingLeft }}>
                  <ListItemIcon>
                    <LocalFireDepartmentOutlined />
                  </ListItemIcon>
                  <ListItemText primary="FHIR Inferno Framework" />
                </ListItemButton>
              </Link>
            </List>
            <List component="div" disablePadding>
              <Link href="/c-cda" passHref>
                <ListItemButton sx={{ pl: navPaddingLeft }}>
                  <ListItemIcon>
                    <PublishedWithChanges />
                  </ListItemIcon>
                  <ListItemText primary="C-CDA Testing" />
                </ListItemButton>
              </Link>
            </List>
            <List component="div" disablePadding>
              <Link href="/direct" passHref>
                <ListItemButton sx={{ pl: navPaddingLeft }}>
                  <ListItemIcon>
                    <CompareArrows />
                  </ListItemIcon>
                  <ListItemText primary="Direct Project Tooling" />
                </ListItemButton>
              </Link>
            </List>
            <List component="div" disablePadding>
              <Link href="/cqm-qrda">
                <ListItemButton sx={{ pl: navPaddingLeft }}>
                  <ListItemIcon>
                    <AddchartOutlined />
                  </ListItemIcon>
                  <ListItemText primary="CQM QRDA Testing" />
                </ListItemButton>
              </Link>
            </List>
            <List component="div" disablePadding>
              <Link target="_blank" rel="noopener noreferrer" href={genericLinkToReplace}>
                <ListItemButton sx={{ pl: navPaddingLeft }}>
                  <ListItemIcon>
                    <MedicationOutlined />
                  </ListItemIcon>
                  <ListItemText primary="Electronic Prescribing (eRX) Tool" />
                </ListItemButton>
              </Link>
            </List>
            <List component="div" disablePadding>
              <Link target="_blank" rel="noopener noreferrer" href={genericLinkToReplace}>
                <ListItemButton sx={{ pl: navPaddingLeft }}>
                  <ListItemIcon>
                    <GroupsOutlined />
                  </ListItemIcon>
                  <ListItemText primary="Public Health Reporting" />
                </ListItemButton>
              </Link>
            </List>
            <List component="div" disablePadding>
              <Link target="_blank" rel="noopener noreferrer" href={genericLinkToReplace}>
                <ListItemButton sx={{ pl: navPaddingLeft }}>
                  <ListItemIcon>
                    <AltRouteOutlined />
                  </ListItemIcon>
                  <ListItemText primary="Alternative Test Methods" />
                </ListItemButton>
              </Link>
            </List>
          </Collapse>

          {/* General Testing Tools */}
          <ListItemButton onClick={handleClickGeneralTestingList}>
            <ListItemIcon>
              {/* <SpaceDashboardOutlined /> */}
              <HandymanOutlined />
            </ListItemIcon>
            <ListItemText primary="General Testing Tools" />
            {openGeneralTestingList ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Divider />
          <Collapse in={openGeneralTestingList} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link target="_blank" rel="noopener noreferrer" href={genericLinkToReplace}>
                <ListItemButton sx={{ pl: navPaddingLeft }}>
                  <ListItemIcon>
                    <ImportantDevicesOutlined />
                  </ListItemIcon>
                  <ListItemText primary="CPOE Evaluation Tool" />
                </ListItemButton>
              </Link>
            </List>
            <List component="div" disablePadding>
              <Link target="_blank" rel="noopener noreferrer" href={genericLinkToReplace}>
                <ListItemButton sx={{ pl: navPaddingLeft }}>
                  <ListItemIcon>
                    <HealingOutlined />
                  </ListItemIcon>
                  <ListItemText primary="IHE Testing Tools" />
                </ListItemButton>
              </Link>
            </List>
            <List component="div" disablePadding>
              <Link target="_blank" rel="noopener noreferrer" href={genericLinkToReplace}>
                <ListItemButton sx={{ pl: navPaddingLeft }}>
                  <ListItemIcon>
                    <FireplaceOutlined />
                  </ListItemIcon>
                  <ListItemText primary="Lantern Project" />
                </ListItemButton>
              </Link>
            </List>
            <List component="div" disablePadding>
              <Link target="_blank" rel="noopener noreferrer" href={genericLinkToReplace}>
                <ListItemButton sx={{ pl: navPaddingLeft }}>
                  <ListItemIcon>
                    <SquareFootOutlined />
                  </ListItemIcon>
                  <ListItemText primary="NIST Conformance Test" />
                </ListItemButton>
              </Link>
            </List>
          </Collapse>

          {/* Industry Testing Resources */}
          <ListItemButton onClick={handleClickIndustryTestingList}>
            <ListItemIcon>
              <CloudOutlined />
            </ListItemIcon>
            <ListItemText primary="Industry Testing Resources" />
            {openIndustryTestingList ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Divider />
          <Collapse in={openIndustryTestingList} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link target="_blank" rel="noopener noreferrer" href={genericLinkToReplace}>
                <ListItemButton sx={{ pl: navPaddingLeft }}>
                  <ListItemIcon>
                    <MonitorHeartOutlined />
                  </ListItemIcon>
                  <ListItemText primary="HL7 Tools" />
                </ListItemButton>
              </Link>
            </List>
            <List component="div" disablePadding>
              <Link target="_blank" rel="noopener noreferrer" href={genericLinkToReplace}>
                <ListItemButton sx={{ pl: navPaddingLeft }}>
                  <ListItemIcon>
                    <FolderSpecialOutlined />
                  </ListItemIcon>
                  <ListItemText primary="Reference Data" />
                </ListItemButton>
              </Link>
            </List>
            <List component="div" disablePadding>
              <Link target="_blank" rel="noopener noreferrer" href={genericLinkToReplace}>
                <ListItemButton sx={{ pl: navPaddingLeft }}>
                  <ListItemIcon>
                    <MenuBookOutlined />
                  </ListItemIcon>
                  <ListItemText primary="Implementation Guide Authoring Tools" />
                </ListItemButton>
              </Link>
            </List>
            <List component="div" disablePadding>
              <Link target="_blank" rel="noopener noreferrer" href="https://github.com/orgs/mitre">
                <ListItemButton sx={{ pl: navPaddingLeft }}>
                  <ListItemIcon>
                    <Biotech />
                  </ListItemIcon>
                  <ListItemText primary="MITRE Github" />
                </ListItemButton>
              </Link>
            </List>
          </Collapse>

          {/* SITE Resources */}
          <ListItemButton onClick={handleClickResourcesList}>
            <ListItemIcon>
              <ContentCopy />
            </ListItemIcon>
            <ListItemText primary="SITE Resources" />
            {openResourcesList ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Divider />
          <Collapse in={openResourcesList} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link href="/faqs">
                <ListItemButton sx={{ pl: navPaddingLeft }}>
                  <ListItemIcon>
                    <QuestionAnswerOutlined />
                  </ListItemIcon>
                  <ListItemText primary="FAQs" />
                </ListItemButton>
              </Link>
            </List>
            <List component="div" disablePadding>
              <Link href="/docs-and-vids" passHref>
                <ListItemButton sx={{ pl: navPaddingLeft }}>
                  <ListItemIcon>
                    <IntegrationInstructionsOutlined />
                  </ListItemIcon>
                  <ListItemText primary="Documentation & Videos" />
                </ListItemButton>
              </Link>
            </List>
          </Collapse>
          <Divider />

          {/* TODO: What is causing the grey text here vs the other list items?}
          {/* Archived */}
          <Link href="/archived" passHref>
            <ListItem>
              <ListItemIcon>
                <ArchiveOutlined />
                <ListItemText primary="Archived" sx={{ pl: navPaddingLeft }} />
              </ListItemIcon>
            </ListItem>
          </Link>
        </List>
        <Divider />

        {/* TODO:
        -Clean up the look of this, padding, style, etc.
        -Externalize version to github markdown or otherwise */}
        {/* Release Notes and Version */}
        <Divider />
        <Typography variant="h6" noWrap component="div">
          Release Notes v{siteVersion}
        </Typography>
        <Divider />

        {/* Debug */}
        <Typography variant="h6" noWrap component="h6">
          Debug Dev Controls
        </Typography>

        {/* Temp Debug Login toggle to test states */}
        <ol>
          <li>Toggle Auth State</li>
          <li>
            <FormGroup>
              <FormControlLabel
                control={<Switch checked={auth} onChange={handleChange} aria-label="login switch" />}
                label={auth ? 'Logout' : 'Login'}
              />
            </FormGroup>
          </li>
        </ol>
      </Drawer>
    </Box>
  )
}
