import React, { FC, ReactNode } from 'react'
import { IconButton, Box, Dialog, DialogContent, DialogTitle } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import palette from '@/styles/palette'

interface DialogTemplateProps {
  open: boolean
  handleClose: () => void
  title: ReactNode
  menuContent: ReactNode
  resultsContent: ReactNode
  actionsContent: ReactNode
}

interface DialogTitleProps {
  children: ReactNode
  handleClose: () => void
}

const CustomDialogTitle: FC<DialogTitleProps> = ({ children, handleClose }) => (
  <DialogTitle sx={{ borderBottom: `1px solid ${palette.divider}` }} fontWeight={600}>
    {children}
    <IconButton
      aria-label="Close Dialog"
      sx={{ position: 'absolute', right: 8, top: 8 }}
      onClick={(e) => {
        e.stopPropagation()
        handleClose()
      }}
    >
      <CloseIcon />
    </IconButton>
  </DialogTitle>
)

const DialogTemplate: FC<DialogTemplateProps> = ({
  open,
  handleClose,
  title,
  menuContent,
  resultsContent,
  actionsContent,
}) => {
  return (
    <Dialog disableScrollLock maxWidth="xl" open={open}>
      <CustomDialogTitle handleClose={handleClose}>{title}</CustomDialogTitle>
      <DialogContent
        sx={{ display: 'flex', borderColor: palette.divider, alignItems: 'stretch', flexDirection: 'row' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Menu */}
        <Box top={'0px'} position={'sticky'} borderRight={`1px solid ${palette.divider} `}>
          {menuContent}
        </Box>
        {/* Results */}
        {resultsContent}
      </DialogContent>
      {/* Actions */}
      {actionsContent}
    </Dialog>
  )
}

export default DialogTemplate
