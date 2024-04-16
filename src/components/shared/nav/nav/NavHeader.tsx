import { Box, Divider, IconButton } from '@mui/material'
import { Theme } from '@mui/material/styles'

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

import Image from 'next/image'
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
          paddingX: '8px',
          paddingY: '8px',
        }}
      >
        <a href="/">
          <Image
            src="/shared/site-nav-logo.svg"
            width={250}
            height={42}
            alt="SITE logo with text: The hub for testing tools & resources"
            priority
          />
        </a>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </Box>
      <Divider sx={{ borderWidth: NAV_THICKER_DIVIDER }} />
    </>
  )
}
