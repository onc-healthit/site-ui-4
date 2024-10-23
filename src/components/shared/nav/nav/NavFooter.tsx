'use client'
import { fetchSanitizedMarkdownData } from '@/services/markdownToHTMLService'
import { Box, Button, Dialog, DialogActions, DialogContent } from '@mui/material'
import { useEffect, useState } from 'react'
import eventTrack from '@/services/analytics'

export default function NavFooter() {
  const [openDialog, setOpenDialog] = useState(false)

  const handleOpenDialog = () => {
    setOpenDialog(true)
    eventTrack('Open Release Notes', 'Release Notes', 'User clicks open release notes thru navigation')
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    eventTrack('Close Release Notes', 'Release Notes', 'User clicks close release')
  }

  // const [releaseVersionHTML, setReleaseVersionHTML] = useState<string | undefined>()
  // const [releaseDateHTML, setReleaseDateHTML] = useState<string | undefined>()
  const [releaseNotesHTML, setReleaseNotesHTML] = useState<string | undefined>()
  const [historicalReleaseNotesHTML, setHistoricalReleaseNotesHTML] = useState<string | undefined>()

  // const releaseVersionURL = 'https://raw.githubusercontent.com/onc-healthit/site-content/master/site-ui-4/version.md'
  // const releaseDateURL = 'https://raw.githubusercontent.com/onc-healthit/site-content/master/site-ui-4/release-date.md'
  const releaseNotesURL =
    'https://raw.githubusercontent.com/onc-healthit/site-content/master/site-ui-4/latest-release-notes.md'
  const historicalReleaseNotesURL =
    'https://raw.githubusercontent.com/onc-healthit/site-content/master/site-ui-4/historical-release-notes.md'

  useEffect(() => {
    ;(async () => {
      try {
        // setReleaseVersionHTML(await fetchSanitizedMarkdownData(releaseVersionURL))
        // setReleaseDateHTML(await fetchSanitizedMarkdownData(releaseDateURL))
        setReleaseNotesHTML(await fetchSanitizedMarkdownData(releaseNotesURL))
        setHistoricalReleaseNotesHTML(await fetchSanitizedMarkdownData(historicalReleaseNotesURL))
      } catch (e) {
        console.error(e)
      }
    })()
  }, [])

  return (
    <>
      {/* Release Notes and Version */}
      <Button sx={{ maxWidth: '132px' }} color="secondary" variant="text" size="small" onClick={handleOpenDialog}>
        Release Notes
      </Button>
      {/* <Box>{releaseVersionHTML && <div dangerouslySetInnerHTML={{ __html: releaseVersionHTML }} />}</Box>
        <Box>{releaseDateHTML && <div dangerouslySetInnerHTML={{ __html: releaseDateHTML }} />}</Box> */}
      {/* TODO: Limit to debug mode only */}
      {/* <Box>Debug Version: {SITE_DEBUG_VERSION}</Box> */}
      {/* Dialog Box */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth={true} maxWidth="lg">
        {/* <DialogTitle typography={'h4'}>
          <strong>Release Notes</strong>
        </DialogTitle> */}
        <DialogContent>
          <Box>{releaseNotesHTML && <div dangerouslySetInnerHTML={{ __html: releaseNotesHTML }} />}</Box>
          <Box>
            {historicalReleaseNotesHTML && <div dangerouslySetInnerHTML={{ __html: historicalReleaseNotesHTML }} />}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
