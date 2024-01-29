import MenuIcon from '@mui/icons-material/Menu'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import { styled } from '@mui/material/styles'

/* Custom Imports */
import Auth from '@/components/shared/nav/app-bar/Auth'
import { DRAWER_WIDTH } from '@/constants/navConstants'
import Search from '@/components/shared/nav/app-bar/Search'

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
  auth: boolean
}
export default function SiteAppBar({ open, handleDrawerOpen, auth }: SiteAppBarProps) {
  return (
    <StyledAppBar position="fixed" sx={{ top: 0, height: 'fit-content' }} open={open}>
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
        <Search />

        {/* Login */}
        <Auth auth={auth} />
      </Toolbar>
    </StyledAppBar>
  )
}
