import { useEffect, useState } from 'react'
import { Box, Divider, IconButton, Tooltip } from '@mui/material'
import { Theme } from '@mui/material/styles'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import Image from 'next/image'
import SITELogo from '@public/shared/site-nav-logo.svg'
import { NAV_THICKER_DIVIDER } from '@/constants/navConstants'

interface SiteNavHeaderProps {
  handleDrawerClose: () => void
  theme: Theme
}

export default function NavHeader({ handleDrawerClose, theme }: SiteNavHeaderProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => {
      if (prev) {
        handleDrawerClose() // Close drawer if it was open
      }
      return !prev // Toggle the state
    })
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 900 && isDrawerOpen) {
        handleDrawerClose()
        setIsDrawerOpen(false) // Update local state to closed
      } else if (window.innerWidth >= 900 && !isDrawerOpen) {
        setIsDrawerOpen(true) // Optionally open if above 900px
      }
    }

    window.addEventListener('resize', handleResize) // Attach resize listener
    handleResize() // Initial check on render

    return () => {
      window.removeEventListener('resize', handleResize) // Clean up listener on unmount
    }
  }, [handleDrawerClose, isDrawerOpen]) // Include isDrawerOpen in the dependency array

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
        <Tooltip arrow placement="right" title="Toggle Navigation">
          <IconButton size="small" aria-label="Toggle Navigation" onClick={toggleDrawer}>
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
