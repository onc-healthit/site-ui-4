import palette from '@/styles/palette'
import { Check } from '@mui/icons-material'
import { Box, Divider, Typography } from '@mui/material'
import { ContentProps } from './XDMResults'
import ErrorIcon from '@mui/icons-material/Error'
interface XDMResultsTemplateProps {
  response: ContentProps
}
const XDMResultsTemplate = ({ response }: XDMResultsTemplateProps) => {
  return (
    <Box py={2}>
      <Divider />
      <Typography variant="h3" component={'h1'} sx={{ p: 4, pl: 0 }}>
        Validator Results
      </Typography>
      {response.pass && (
        <Box borderRadius={1} border={`1px solid ${palette.success}`}>
          <Box sx={{ width: '100%', flexDirection: 'row', gap: '16px', display: 'flex', alignItems: 'center', p: 2 }}>
            <Check
              fontSize="large"
              sx={{
                color: palette.success,
                transition: 'transform 0.3s ease-in-out',
                transform: 'scale(1)',
                '&:hover': {
                  transform: 'scale(1.2)',
                },
              }}
            />
            <Typography variant="h4">Validation Passed</Typography>
          </Box>
          <Box>
            <pre>{response.report}</pre>
          </Box>
        </Box>
      )}
      {!response.pass && (
        <Box borderRadius={1} border={`1px solid ${palette.error}`}>
          <Box sx={{ width: '100%', flexDirection: 'row', gap: '16px', display: 'flex', alignItems: 'center', p: 2 }}>
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
            <Typography variant="h4">Validation Failed</Typography>
          </Box>
          <Box>
            <pre>{response.report}</pre>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default XDMResultsTemplate
