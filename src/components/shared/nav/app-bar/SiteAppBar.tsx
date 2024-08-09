import MenuIcon from '@mui/icons-material/Menu'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Image from 'next/image'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import { styled } from '@mui/material/styles'
import SITELogo from '@public/shared/SITEWhiteLogo.svg'
import Grow from '@mui/material/Grow'

/* Custom Imports */
import Auth from '@/components/shared/nav/app-bar/Auth'
import { DRAWER_WIDTH } from '@/constants/navConstants'
import { Container, Box, Tooltip } from '@mui/material'
// import Search from '@/components/shared/nav/app-bar/Search'

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}
const StyledAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: DRAWER_WIDTH,
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

interface SiteAppBarProps {
  open: boolean
  handleDrawerOpen: () => void
}
export default function SiteAppBar({ open, handleDrawerOpen }: SiteAppBarProps) {
  return (
    <StyledAppBar sx={{ top: 0, height: 'fit-content' }} open={open}>
      <Toolbar
        sx={{
          minHeight: '58px!important',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        {/* Toggle Drawer Elipses Menu Button */}
        <Box display={'flex'} width={'100%'} flexDirection={'row'}>
          <Tooltip arrow placement="right" title="Open navigation">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginLeft: -2,
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
          </Tooltip>
          <Container
            maxWidth={'lg'}
            disableGutters
            sx={{ pr: 0, pl: 4, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <div>
              {/* Will turn search on in later versions */}
              <Grow timeout={500} in={!open}>
                <a href="/">
                  <Image
                    style={{
                      backgroundSize: 'contain',
                      overflowX: 'clip',
                      width: 'auto',
                      paddingTop: '4px',
                      marginLeft: '12px',
                      height: '42px',
                      objectFit: 'contain',
                    }}
                    src={SITELogo}
                    alt="ONC Logo"
                  />
                </a>
              </Grow>
            </div>
            <Auth />
          </Container>
        </Box>
      </Toolbar>
    </StyledAppBar>
  )
}
