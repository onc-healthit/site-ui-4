//'use client'
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
  textWrap: 'nowrap',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(6.4)} + 4px)`,
    overflowX: 'hidden!important',
  },
})

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  '& a': {
    textDecoration: 'none',
    color: 'inherit',
  },
  width: DRAWER_WIDTH,
  flexShrink: 0,
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': {
      ...openedMixin(theme),
    },
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': {
      ...closedMixin(theme),
    },
  }),
}))

interface SiteNavProps {
  open: boolean
  handleDrawerClose: () => void
  handleAuthChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}
export default function SiteNav({ open, handleDrawerClose, handleAuthChange }: SiteNavProps) {
  const theme = useTheme()

  return (
    <Drawer variant="permanent" open={open}>
      {/* Nav Header with SITE logo */}
      <NavHeader handleDrawerClose={handleDrawerClose} theme={theme} />

      {/* Expandable Nav List Categories:
        TODO: Consider matching FIGMA design exactly, or, allowing home to still be selected on drawer close */}
      <Box
        sx={{
          display: 'flex',
          height: '100vh',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <List
          disablePadding
          sx={{
            fontSize: '.8rem',
            width: '100%',
            maxWidth: 250,
            bgcolor: 'background.paper',
          }}
          component="nav"
        >
          <SiteNavOncCertTools />
          <SiteNavGeneralTools />
          <SiteNavIndustryTools />
          <SiteNavResources />
          <SiteNavArchived />
        </List>
        {/* <DevTools auth={auth} handleAuthChange={handleAuthChange} /> */}
        <NavFooter />
      </Box>
    </Drawer>
  )
}
