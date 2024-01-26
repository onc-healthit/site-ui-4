import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import { Theme, styled } from '@mui/material/styles'
import Image from 'next/image'
import Link from 'next/link'

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

interface SiteNavHeaderProps {
  handleDrawerClose: () => void
  theme: Theme
}
export default function NavHeader({ handleDrawerClose, theme }: SiteNavHeaderProps) {
  return (
    <>
      <DrawerHeader sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Link href={'/'} passHref>
          <Image
            src="/shared/site-nav-logo.svg"
            width={250}
            height={42}
            alt="SITE logo with text: The hub for testing tools & resources"
            priority
            // style={{ width: 287, height: 'auto' }}
          />
        </Link>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />
    </>
  )
}
