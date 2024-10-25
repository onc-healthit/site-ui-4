// src/components/CommunicationFab.tsx
'use client'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Drawer,
  Fab,
  Tooltip,
  Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import InfoIcon from '@mui/icons-material/Info'
import SecurityIcon from '@mui/icons-material/Security'
import LinkButton from './LinkButton'
import { fetchReleaseData } from '@/assets/ReleaseService'
import palette from '@/styles/palette'
import websiteLaunch from '@public/shared/SITE_Website_Launch.svg'
import Image from 'next/image'
import ForwardToInboxOutlinedIcon from '@mui/icons-material/ForwardToInboxOutlined'
import eventTrack from '@/services/analytics'

const drawerWidth = 350

const CommunicationFab: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const handleDrawerOpen = () => {
    setDrawerOpen(true)
    eventTrack('Open Communication FAB', 'Communication Panel', 'User cllicks open communication panel')
  }

  const handleDrawerClose = () => {
    setDrawerOpen(false)
    eventTrack('Close Communication FAB', 'Communication Panel', 'User clicks close communication panel')
  }

  const [releaseVersionHTML, setReleaseVersionHTML] = useState<string | undefined>()
  const [releaseDateHTML, setReleaseDateHTML] = useState<string | undefined>()

  useEffect(() => {
    ;(async () => {
      try {
        const { releaseVersionHTML, releaseDateHTML } = await fetchReleaseData()
        setReleaseVersionHTML(releaseVersionHTML)
        setReleaseDateHTML(releaseDateHTML)
      } catch (e) {
        console.error(e)
      }
    })()
  }, [])

  return (
    <div>
      <Drawer
        variant="persistent"
        anchor="right"
        open={drawerOpen}
        PaperProps={{
          style: {
            width: drawerWidth,
            zIndex: 1400,
          },
        }}
      >
        <Box width={'auto'} p={2} mb={8} display={'flex'} flexDirection={'column'} gap={4}>
          <Card>
            <CardMedia sx={{ width: 'auto' }}>
              <Image style={{ width: '330px', height: 'auto' }} src={websiteLaunch} alt="Placeholder" />
            </CardMedia>
            <CardHeader
              sx={{ px: 1, pt: 1, pb: 0 }}
              titleTypographyProps={{ variant: 'body1', fontSize: '.85em', fontWeight: 'bold' }}
              title={process.env.NEXT_PUBLIC_ASTP_RELEASE_CONTENT_HEADER ?? ''}
            ></CardHeader>
            <Typography sx={{ px: 1, fontSize: '.75em' }} variant="body2">
              {process.env.NEXT_PUBLIC_ASTP_RELEASE_CONTENT ?? ''}
            </Typography>
            <CardActions>
              <Button
                href={process.env.NEXT_PUBLIC_ASTP_RELEASE_BLOG_URL ?? '/'}
                size="small"
                variant="text"
                color="secondary"
                target="_blank"
              >
                Read More...
              </Button>
            </CardActions>
          </Card>
          <LinkButton
            label="Access Forum"
            url="https://groups.google.com/g/edge-test-tool"
            icon={<ExitToAppIcon fontSize="small" htmlColor={palette.primaryDark} />}
          />
          <LinkButton
            label="Health Data Standards"
            url="https://www.healthit.gov/topic/interoperability/standards-and-technology"
            icon={<SecurityIcon fontSize="small" htmlColor={palette.primaryDark} />}
          />
          <LinkButton
            label="Questions or Inquiries"
            url="mailto:edge-test-tool@googlegroups.com"
            icon={<ForwardToInboxOutlinedIcon fontSize="small" htmlColor={palette.primaryDark} />}
          />
        </Box>
        <Box
          position={'fixed'}
          width={'-webkit-fill-available'}
          bottom={'0px'}
          padding={'0 16px 8px 16px'}
          bgcolor={palette.white}
        >
          <Tooltip arrow placement="left" title="Close Information Panel">
            <Fab
              onClick={handleDrawerClose}
              size="small"
              color="inherit"
              aria-label="Close Info"
              style={{ position: 'fixed', bottom: '8px', right: '20px' }}
            >
              <CloseIcon fontSize="small" htmlColor={palette.error} />
            </Fab>
          </Tooltip>
          <Typography
            sx={{
              fontSize: '12px',
            }}
            variant="caption"
            color={palette.greyDark}
          >
            {releaseVersionHTML && <div dangerouslySetInnerHTML={{ __html: releaseVersionHTML }} />}
            {releaseDateHTML && <div dangerouslySetInnerHTML={{ __html: releaseDateHTML }} />}
          </Typography>
        </Box>
      </Drawer>
      <Tooltip arrow placement="left" title="Open Information Panel">
        <Fab
          color="secondary"
          aria-label="Open Info"
          size="small"
          style={{ position: 'fixed', bottom: '20px', right: '20px' }}
          onClick={handleDrawerOpen}
        >
          <InfoIcon id="communication-Fab" fontSize="small" htmlColor={palette.white} />
        </Fab>
      </Tooltip>
    </div>
  )
}

export default CommunicationFab
