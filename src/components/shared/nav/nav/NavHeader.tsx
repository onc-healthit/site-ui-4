import { Box, Divider, IconButton, Tooltip } from '@mui/material'
import { Theme } from '@mui/material/styles'

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

import Image from 'next/image'
import SITELogo from '@public/shared/site-nav-logo.svg'
import { NAV_THICKER_DIVIDER } from '@/constants/navConstants'

// const DrawerHeader = styled('div')(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'flex-end',
//   padding: theme.spacing(0, 1),
//   // necessary for content to be below app bar
//   ...theme.mixins.toolbar,
// }))

interface SiteNavHeaderProps {
  handleDrawerClose: () => void
  theme: Theme
}
export default function NavHeader({ handleDrawerClose, theme }: SiteNavHeaderProps) {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingX: '16px',
        }}
      >
        <a href="/">
          <Image
            src={SITELogo}
            width={193}
            height={50}
            alt="SITE logo with text: The hub for testing tools & resources"
            priority
          />
        </a>
        <Tooltip arrow placement="right" title="Close Navigation">
          <IconButton size="small" aria-label="Toggle Navigation" onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon aria-label="Open Navigation" />
            ) : (
              <ChevronLeftIcon aria-label="Close Navigation" />
            )}
          </IconButton>
        </Tooltip>
      </Box>
      <Divider sx={{ borderWidth: NAV_THICKER_DIVIDER }} />
    </>
  )
}
