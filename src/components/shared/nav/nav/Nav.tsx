import { Box, List } from '@mui/material/'
import MuiDrawer from '@mui/material/Drawer'
import { CSSObject, Theme, styled, useTheme } from '@mui/material/styles'
import React from 'react'

/* Custom Imports */
import DevTools from '@/components/shared/nav/nav/DevTools'
import NavFooter from '@/components/shared/nav/nav/NavFooter'
import NavHeader from '@/components/shared/nav/nav/NavHeader'
import SiteNavArchived from '@/components/shared/nav/nav/categories/SiteNavArchived'
import SiteNavGeneralTools from '@/components/shared/nav/nav/categories/SiteNavGeneralTools'
import SiteNavIndustryTools from '@/components/shared/nav/nav/categories/SiteNavIndustryTools'
import SiteNavOncCertTools from '@/components/shared/nav/nav/categories/SiteNavOncCertTools'
import SiteNavResources from '@/components/shared/nav/nav/categories/SiteNavResources'
import { DRAWER_WIDTH } from '@/constants/navConstants'

const openedMixin = (theme: Theme): CSSObject => ({
  width: DRAWER_WIDTH,
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
    width: `calc(${theme.spacing(8)} + 4px)`,
  },
})

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  a: {
    textDecoration: 'none',
    color: 'inherit',
  },
  width: DRAWER_WIDTH,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    textWrap: 'wrap',
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    textWrap: 'nowrap',
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}))

interface SiteNavProps {
  open: boolean
  handleDrawerClose: () => void
  auth: boolean
  handleAuthChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}
export default function SiteNav({ open, handleDrawerClose, auth, handleAuthChange }: SiteNavProps) {
  const theme = useTheme()

  return (
    <Drawer variant="permanent" open={open}>
      {/* Nav Header with SITE logo */}
      <NavHeader handleDrawerClose={handleDrawerClose} theme={theme} />

      {/* Expandable Nav List Categories:
        TODO: Consider matching FIGMA design exactly, or, allowing home to still be selected on drawer close */}
      <Box display={'flex'} height={'100vh'} flexDirection={'column'} justifyContent={'space-between'}>
        <List disablePadding sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} component="nav">
          <SiteNavOncCertTools />
          <SiteNavGeneralTools />
          <SiteNavIndustryTools />
          <SiteNavResources />
          <SiteNavArchived />
        </List>
        <DevTools auth={auth} handleAuthChange={handleAuthChange} />
        <NavFooter />
      </Box>
    </Drawer>
  )
}
