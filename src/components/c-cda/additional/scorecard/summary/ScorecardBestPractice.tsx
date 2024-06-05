import palette from '@/styles/palette'
import { Box, Typography } from '@mui/material'

export default function ScorecardBestPractice() {
  const bestPracticeHeaderStyle = {
    fontWeight: 'bold',
    fontSize: 90,
    color: palette.primary,
  }

  return (
    <Box>
      <Typography variant="h3" sx={{ fontWeight: 'bold', pt: 2, pb: 2 }}>
        Best Practice
      </Typography>
      <Box display="flex">
        <Box width="33.33%">
          <Typography align="center" variant="h1" sx={bestPracticeHeaderStyle}>
            13
          </Typography>
          <Typography align="center" variant="h6">
            <b>Total Issues</b> out of <b>407</b> Checks
          </Typography>
        </Box>
        <Box width="33.33%">
          <Typography align="center" variant="h1" sx={bestPracticeHeaderStyle}>
            5
          </Typography>
          <Typography align="center" variant="h6">
            <b>Unique Issues</b> out of <b>54</b> Rules
          </Typography>
        </Box>
        <Box width="33.33%">
          <Typography align="center" variant="h1" sx={{ ...bestPracticeHeaderStyle, color: palette.success }}>
            A-
          </Typography>
          <Typography align="center" variant="h6">
            With a <b>Score</b> of <b>94</b> out of <b>100</b>
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
