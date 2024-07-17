import CircularProgressWithLabelAndBackground from '@shared/CircularProgressWithLabelAndBackground'
import { Box, Divider, Typography } from '@mui/material'
import palette from '@/styles/palette'
import { ScorecardReferenceResultType, ScorecardJsonResponseType } from '@/types/ScorecardJsonResponseType'

interface ScorecardBaseCheckInterface {
  json: ScorecardJsonResponseType | undefined
  igResults: ScorecardReferenceResultType
  vocabResults: ScorecardReferenceResultType
}

export default function ScorecardBaseCheck({ json, igResults, vocabResults }: ScorecardBaseCheckInterface) {
  const igErrorCount: number = igResults.totalErrorCount
  const igChecksCount: number | undefined = json?.results?.totalConformanceErrorChecks

  const vocabErrorCount: number = vocabResults.totalErrorCount
  const vocabChecksCount: number | undefined = json?.results?.totalCertificationErrorChecks

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
              labelValue={igErrorCount.toString()}
              progressValue={igErrorCount * progressMultiple}
              labelAndProgressColor={labelAndProgressColor}
            ></CircularProgressWithLabelAndBackground>
          </Box>
          <Typography align="center" variant="h4" sx={{ fontWeight: 'bold' }}>
            C-CDA IG Conformance Errors
          </Typography>
          <Typography align="center" variant="h6">
            <b>{igErrorCount}</b> out of <b>{igChecksCount ? igChecksCount : '?'}</b> Checks
          </Typography>
        </Box>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Box width="50%">
          <Box pb={4} display="flex" sx={{ justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgressWithLabelAndBackground
              labelValue={vocabErrorCount.toString()}
              progressValue={vocabErrorCount * progressMultiple}
              labelAndProgressColor={labelAndProgressColor}
            ></CircularProgressWithLabelAndBackground>
          </Box>
          <Typography align="center" variant="h4" sx={{ fontWeight: 'bold' }}>
            Vocabulary Errors
          </Typography>
          <Typography align="center" variant="h6">
            <b>{vocabErrorCount}</b> out of <b>{vocabChecksCount ? vocabChecksCount : '?'}</b> Checks
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
