import palette from '@/styles/palette'
import { Box, Divider, Typography } from '@mui/material'
import CountUp from 'react-countup'

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
      <Box display="flex" flexDirection={'row'} justifyContent={'center'} py={2}>
        <Box width="33%">
          <Typography align="center" variant="h1" sx={bestPracticeHeaderStyle}>
            <CountUp end={13} duration={2} />
          </Typography>
          <Typography align="center" variant="h6">
            <b>Total Issues out of 407</b> Checks
          </Typography>
        </Box>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Box width="33%">
          <Typography align="center" variant="h1" sx={bestPracticeHeaderStyle}>
            <CountUp end={5} duration={2} />
          </Typography>
          <Typography align="center" variant="h6">
            <b>Unique Issues out of 54</b> Rules
          </Typography>
        </Box>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Box width="33%">
          <Typography align="center" variant="h1" sx={{ ...bestPracticeHeaderStyle, color: palette.success }}>
            A-
          </Typography>
          <Typography align="center" variant="h6">
            Grade{' '}
            <b>
              <CountUp end={94} duration={2} /> out of 100
            </b>
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
