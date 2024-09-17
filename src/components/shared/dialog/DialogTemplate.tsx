import { lightThemeOptions } from '@/styles/lightThemeOptions'
import palette from '@/styles/palette'
import CloseIcon from '@mui/icons-material/Close'
import { Box, Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material'
import { FC, ReactNode } from 'react'

interface DialogTemplateProps {
  open: boolean
  handleClose: () => void
  title: ReactNode
  menuContent?: ReactNode
  resultsContent: ReactNode
  actionsContent: ReactNode
}

interface DialogTitleProps {
  children: ReactNode
  handleClose: () => void
}

const CustomDialogTitle: FC<DialogTitleProps> = ({ children, handleClose }) => (
  <DialogTitle sx={{ borderBottom: `1px solid ${palette.divider}` }} fontWeight={600} variant="h2">
    {children}
    <IconButton
      aria-label="Close Dialog"
      sx={{ position: 'absolute', right: 8, top: 8 }}
      onClick={(e: { stopPropagation: () => void }) => {
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
    <Dialog disableScrollLock disableEnforceFocus maxWidth="xl" open={open} onClose={handleClose}>
      <CustomDialogTitle handleClose={handleClose}>{title}</CustomDialogTitle>
      <DialogContent
        sx={{ display: 'flex', borderColor: palette.divider, alignItems: 'stretch', flexDirection: 'row' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Menu */}
        {menuContent && (
          <Box
            sx={{
              minWidth: '275px',
              scrollBehavior: 'smooth',
              overflowY: 'scroll',
              [`@media (min-width: ${lightThemeOptions?.breakpoints?.values?.lg}px)`]: {
                // Use theme breakpoint value
                overflowY: 'auto',
              },
            }}
            top={'0px'}
            position={'sticky'}
            borderRight={`1px solid ${palette.divider} `}
          >
            {menuContent}
          </Box>
        )}
        {/* Results */}
        {resultsContent}
      </DialogContent>
      {/* Actions */}
      {actionsContent}
    </Dialog>
  )
}

export default DialogTemplate
