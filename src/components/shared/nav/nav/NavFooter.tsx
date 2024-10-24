import { fetchSanitizedMarkdownData } from '@/services/markdownToHTMLService'
import { Box, Button, Dialog, DialogActions, DialogContent } from '@mui/material'
import { useEffect, useState } from 'react'
import eventTrack from '@/services/analytics'
import { Notes } from '@mui/icons-material'

interface NavFooterProps {
  open: boolean
}

export default function NavFooter({ open }: NavFooterProps) {
  const [openDialog, setOpenDialog] = useState(false)

  const handleOpenDialog = () => {
    setOpenDialog(true)
    eventTrack('Open Release Notes', 'Release Notes', 'User clicks open release notes thru navigation')
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    eventTrack('Close Release Notes', 'Release Notes', 'User clicks close release')
  }
  const [releaseNotesHTML, setReleaseNotesHTML] = useState<string | undefined>()
  const [historicalReleaseNotesHTML, setHistoricalReleaseNotesHTML] = useState<string | undefined>()

  const releaseNotesURL =
    'https://raw.githubusercontent.com/onc-healthit/site-content/master/site-ui-4/latest-release-notes.md'
  const historicalReleaseNotesURL =
    'https://raw.githubusercontent.com/onc-healthit/site-content/master/site-ui-4/historical-release-notes.md'

  useEffect(() => {
    ;(async () => {
      try {
        setReleaseNotesHTML(await fetchSanitizedMarkdownData(releaseNotesURL))
        setHistoricalReleaseNotesHTML(await fetchSanitizedMarkdownData(historicalReleaseNotesURL))
      } catch (e) {
        console.error(e)
      }
    })()
  }, [])

  return (
    <>
      <Button
        color="secondary"
        variant="text"
        onClick={handleOpenDialog}
        startIcon={<Notes color="primary" />}
        sx={{ minWidth: open ? 'auto' : 0, justifyContent: open ? 'flex-start' : 'center' }}
      >
        {open && 'Release Notes'}
      </Button>
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth={true} maxWidth="lg">
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
