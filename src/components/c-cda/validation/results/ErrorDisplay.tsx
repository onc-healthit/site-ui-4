import React from 'react'
import { Box, Dialog, DialogTitle, IconButton, DialogContent, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { ErrorOutline } from '@mui/icons-material'
import palette from '@/styles/palette'
import ONCLogo from '@public/shared/ONCLogo-backgroundImage.png'
import Image from 'next/image'

interface ErrorDisplayCardProps {
  open: boolean
  handleClose: () => void
  response: { error?: string; errorStatus?: number }
}
const ErrorDisplayCard = ({ open, handleClose, response }: ErrorDisplayCardProps) => {
  return (
    <>
      {response ? (
        <Dialog open={open} maxWidth="sm" onClose={handleClose}>
          <IconButton
            aria-label="Close Dialog"
            sx={{ zIndex: '1000', position: 'absolute', right: 8, top: 8 }}
            onClick={handleClose}
          >
            <CloseIcon htmlColor={palette.white} />
          </IconButton>
          <Box px={4} py={3} alignItems={'flex-start'} display={'flex'} flexDirection={'row'} bgcolor={palette.warning}>
            <Image
              style={{
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                top: -80,
                left: -1,
                position: 'absolute',
                overflow: 'clip',
                width: '100%',
                height: '100%',
                objectFit: 'none',
              }}
              src={ONCLogo}
              alt="ONC Logo"
            />
            <ErrorOutline sx={{ mb: -1 }} fontSize={'large'} htmlColor={palette.white} />
            <Box>
              <DialogTitle
                textAlign={'left'}
                color={palette.white}
                sx={{ fontWeight: '600', px: 2, py: 1 }}
                id="validating-dialog-title"
                variant="h3"
              >
                Oh no!
                <br />
                Looks like there was an error.
              </DialogTitle>
              <Typography sx={{ px: 2 }} textAlign={'left'} color={palette.white}>
                Error Type: {response.errorStatus!}
              </Typography>
            </Box>
          </Box>
          <DialogContent sx={{ padding: '32px' }}>
            <Typography>{response.error}</Typography>
          </DialogContent>
        </Dialog>
      ) : null}
    </>
  )
}

export default ErrorDisplayCard
