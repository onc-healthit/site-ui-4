import React, { useState } from 'react'
import { Divider, Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material'

/* Custom Imports */
import { SITE_VERSION } from '@/constants/navConstants'

export default function NavFooter() {
  const [openDialog, setOpenDialog] = useState(false)

  const handleOpenDialog = () => {
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  return (
    <>
      {/* Release Notes and Version */}
      <Button
        disableElevation
        sx={{ width: '220px' }}
        color="secondary"
        variant="text"
        size="small"
        onClick={handleOpenDialog}
      >
        Release Notes v{SITE_VERSION}
      </Button>

      {/* Dialog Box */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle typography={'h4'}>
          <strong>Release Notes v{SITE_VERSION}</strong>
        </DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            Our commitment to transparency and keeping you informed about the latest updates is at the heart of this
            section. Whether you're a developer, an IT professional, or a healthcare stakeholder, our release notes
            provide valuable insights into the evolution of our platform.
          </Typography>
          <Typography variant="body2">
            <strong>Version v4.0 - March 1, 2024</strong>
          </Typography>
          <ol>
            1. Reference C-CDA: Removed SHALL constraint for Nonexistent id Requirement in Section Time Range
            Observation{' '}
          </ol>
          <ol>2. Reference C-CDA: Fixed incorrect error for Informant RelatedEntity </ol>
          <ol>3. SITE Content: Updated SITE/test-tools section to remove non functional links </ol>
          <ol>4. C-CDA: Update scenario files language in word document to match pdf scenarios</ol>
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
