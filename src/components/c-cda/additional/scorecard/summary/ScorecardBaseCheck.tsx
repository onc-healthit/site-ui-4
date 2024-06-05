import CircularProgressWithLabelAndBackground from '@shared/CircularProgressWithLabelAndBackground'
import { Box, Typography } from '@mui/material'
import palette from '@/styles/palette'

export default function ScorecardBaseCheck() {
  const igErrorCount: number = 7
  const vocabErrorCount: number = 3
  const progressMultiple: number = 10
  const labelAndProgressColor: string = palette.errorDark

  return (
    <Box>
      <Typography variant="h3" sx={{ fontWeight: 'bold', pt: 3, pb: 3 }}>
        Base Check
      </Typography>
      <Box display="flex">
        <Box width="50%">
          <Box pb={4} display="flex" sx={{ justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgressWithLabelAndBackground
              labelValue={igErrorCount}
              progressValue={igErrorCount * progressMultiple}
              labelAndProgressColor={labelAndProgressColor}
            ></CircularProgressWithLabelAndBackground>
          </Box>
          <Typography align="center" variant="h4" sx={{ fontWeight: 'bold' }}>
            C-CDA IG Conformance Errors
          </Typography>
          <Typography align="center" variant="h6">
            <b>2</b> out of <b>4,777</b> Checks
          </Typography>
        </Box>
        <Box width="50%">
          <Box pb={4} display="flex" sx={{ justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgressWithLabelAndBackground
              labelValue={vocabErrorCount}
              progressValue={vocabErrorCount * progressMultiple}
              labelAndProgressColor={labelAndProgressColor}
            ></CircularProgressWithLabelAndBackground>
          </Box>
          <Typography align="center" variant="h4" sx={{ fontWeight: 'bold' }}>
            Vocabulary Errors
          </Typography>
          <Typography align="center" variant="h6">
            <b>1</b> out of <b>121</b> Checks
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
