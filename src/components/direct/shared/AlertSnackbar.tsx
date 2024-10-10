import { Snackbar, Alert } from '@mui/material'

const AlertSnackbar = ({
  message,
  severity,
  open,
  onClose,
}: {
  message: string
  severity: 'success' | 'error' | 'warning' | 'info'
  open: boolean
  onClose: () => void
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert onClose={onClose} severity={severity} variant="filled" sx={{ width: '100%', minWidth: '300px' }}>
        {message}
      </Alert>
    </Snackbar>
  )
}
export default AlertSnackbar
