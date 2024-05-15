import React, { FC, ReactNode } from 'react'
import { IconButton, Box, Dialog, DialogContent, DialogTitle } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import palette from '@/styles/palette'

interface DialogTemplateProps {
  open: boolean
  handleClose: () => void
  title: string | ReactNode
  menuContent: ReactNode
  resultsContent: ReactNode
  actionsContent: ReactNode
}

const DialogTemplate: FC<DialogTemplateProps> = ({
  open,
  handleClose,
  title,
  menuContent,
  resultsContent,
  actionsContent,
}) => {
  return (
    <Dialog maxWidth="xl" open={open} onClick={handleClose}>
      {/* Title */}
      <DialogTitle sx={{ borderBottom: `1px solid ${palette.divider}` }} fontWeight={600}>
        {title}
        <IconButton aria-label="Close Dialog" sx={{ position: 'absolute', right: 8, top: 8 }} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
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
