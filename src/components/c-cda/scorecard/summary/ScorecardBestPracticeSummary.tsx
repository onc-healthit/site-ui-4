import palette from '@/styles/palette'
import { ScorecardResultsType } from '@/components/c-cda/scorecard/types/ScorecardJsonResponseType'
import { Box, Divider, Typography } from '@mui/material'
import CountUp from 'react-countup'

interface ScorecardBestPracticeSummaryProps {
  results: ScorecardResultsType | undefined
}

export default function ScorecardBestPracticeSummary({ results }: ScorecardBestPracticeSummaryProps) {
  const totalIssuesCount: number = results?.numberOfIssues ? results.numberOfIssues : -1
  const totalIssuesChecks: number | string = results?.totalElementsChecked ? results.totalElementsChecked : '?'

  const uniqueIssuesCount: number = results?.numberOfFailedRules ? results.numberOfFailedRules : -1
  const uniqueIssuesChecks: number | string = results?.numberOfRules ? results.numberOfRules : '?'

  const grade: string = results?.finalGrade ? results.finalGrade : '?'
  const numericalGrade: number = results?.finalNumericalGrade ? results.finalNumericalGrade : -1

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
            <CountUp end={totalIssuesCount} duration={2} />
          </Typography>
          <Typography align="center" variant="h6">
            <b>Total Issues out of {totalIssuesChecks}</b> Checks
          </Typography>
        </Box>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Box width="33%">
          <Typography align="center" variant="h1" sx={bestPracticeHeaderStyle}>
            <CountUp end={uniqueIssuesCount} duration={2} />
          </Typography>
          <Typography align="center" variant="h6">
            <b>Unique Issues out of {uniqueIssuesChecks}</b> Rules
          </Typography>
        </Box>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Box width="33%">
          <Typography align="center" variant="h1" sx={{ ...bestPracticeHeaderStyle, color: palette.success }}>
            {grade}
          </Typography>
          <Typography align="center" variant="h6">
            Grade{' '}
            <b>
              <CountUp end={numericalGrade} duration={2} /> out of 100
            </b>
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
