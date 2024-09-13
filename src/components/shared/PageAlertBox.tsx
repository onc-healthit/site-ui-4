import palette from '@/styles/palette'
import { Box, Typography } from '@mui/material'
import ErrorIcon from '@mui/icons-material/Error'

type PageAlertBoxProps = {
  message: string
}

const PageAlertBox = (props: PageAlertBoxProps) => {
  const message = props.message || null
  return (
    <Box
      sx={{ width: '100%', flexDirection: 'row', gap: '16px', display: 'flex', alignItems: 'center', p: 2 }}
      borderRadius={1}
      border={`1px solid ${palette.error}`}
    >
      <ErrorIcon
        fontSize="large"
        sx={{
          color: palette.error,
          transition: 'transform 0.3s ease-in-out',
          transform: 'scale(1)',
          '&:hover': {
            transform: 'scale(1.2)',
          },
        }}
      />
      <Box>
        <Typography>{message}</Typography>
      </Box>
    </Box>
  )
}

export default PageAlertBox
