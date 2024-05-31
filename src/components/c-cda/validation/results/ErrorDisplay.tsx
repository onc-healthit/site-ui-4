import { Dialog, DialogTitle, IconButton, DialogContent, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
interface ErrorDisplayCardProps {
  open: boolean
  handleClose: () => void
  response: { error?: string; errorStatus?: number }
}
const ErrorDisplayCard = ({ open, handleClose, response }: ErrorDisplayCardProps) => {
  return (
    <>
      {response ? (
        <Dialog open={open} maxWidth="sm">
          <DialogTitle typography={'h3'} sx={{ fontWeight: '600', pb: 0 }} id="validating-dialog-title">
            {'Error Status '} {response.errorStatus!}
          </DialogTitle>
          <IconButton aria-label="Close Dialog" sx={{ position: 'absolute', right: 8, top: 8 }} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
          <DialogContent>
            <Typography>{response.error}</Typography>
          </DialogContent>
        </Dialog>
      ) : null}
    </>
  )
}

export default ErrorDisplayCard
