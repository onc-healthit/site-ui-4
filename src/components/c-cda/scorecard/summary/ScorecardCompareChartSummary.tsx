import SwitchWithLabel from '@/components/shared/SwitchWIthLabel'
import { Box, Typography } from '@mui/material'
import { BarChart } from '@mui/x-charts/BarChart'
import { useState } from 'react'
import { GradeEnum, gradeStyleMap } from '../types/ScorecardConstants'
import { ScorecardResultsType, TotalGradesGiven } from '../types/ScorecardJsonResponseType'

interface ScorecardCompareChartSummaryProps {
  results: ScorecardResultsType | undefined
}
export default function ScorecardCompareChartSummary({ results }: ScorecardCompareChartSummaryProps) {
  const initialGradeCategoryLabels = ['A+', 'A-', 'B+', 'B-', 'C', 'D']

  const totalGradesGiven: TotalGradesGiven | undefined = results?.totalGradesGiven

  // Set grade data for each bar based on index order
  // TODO: Consider if totalGradesGiven is undefined, don't show the chart instead of just setting to 0 as we are now.
  // Instead, display an inline error. This inline error is template is in the shared folder (see Register Direct Email)
  const initialGradeTotalCountData: number[] = [
    totalGradesGiven?.aPlusGrades ? totalGradesGiven.aPlusGrades : 0,
    totalGradesGiven?.aMinusGrades ? totalGradesGiven.aMinusGrades : 0,
    totalGradesGiven?.bPlusGrades ? totalGradesGiven.bPlusGrades : 0,
    totalGradesGiven?.bMinusGrades ? totalGradesGiven.bMinusGrades : 0,
    totalGradesGiven?.cGrades ? totalGradesGiven.cGrades : 0,
    totalGradesGiven?.dGrades ? totalGradesGiven.dGrades : 0,
  ]

  // Define the colors for each bar based on index order
  const initialGradeColors: string[] = [
    gradeStyleMap[GradeEnum.A_PLUS].backgroundColor,
    gradeStyleMap[GradeEnum.A_MINUS].backgroundColor,
    gradeStyleMap[GradeEnum.B_PLUS].backgroundColor,
    gradeStyleMap[GradeEnum.B_MINUS].backgroundColor,
    gradeStyleMap[GradeEnum.C].backgroundColor,
    gradeStyleMap[GradeEnum.D].backgroundColor,
  ]

  const [isGradeOrderFlipped, setIsGradeOrderFlipped] = useState(false)

  const gradeTotalCountData: number[] = isGradeOrderFlipped
    ? [...initialGradeTotalCountData].reverse()
    : initialGradeTotalCountData
  const gradeCategoryLabels: string[] = isGradeOrderFlipped
    ? [...initialGradeCategoryLabels].reverse()
    : initialGradeCategoryLabels
  const gradeColors: string[] = isGradeOrderFlipped ? [...initialGradeColors].reverse() : initialGradeColors

  const handleFlipGradeOrder = () => {
    setIsGradeOrderFlipped(!isGradeOrderFlipped)
  }

  return (
    <Box>
      <Box>
        <Box display={'flex'} flexDirection={'row'} justifyContent="space-between">
          <Typography variant="h3" sx={{ fontWeight: 'bold', pt: 2, pb: 2 }}>
            Compare
          </Typography>
          <SwitchWithLabel
            isChecked={isGradeOrderFlipped}
            handleToggleSwitch={handleFlipGradeOrder}
            labelText="Toggle Sort Order"
            labelOnRight={false}
          />
        </Box>
        <Typography variant="h6">
          The following chart displays the total count for each possible grade received when compared with all C-CDA
          Scorecard validations run since we started tracking data. It is intended to give a general idea of how your
          grade compares to others, as well as to provide an assessment of the community as a whole.
          <br />
          <b>Note</b>: To view exact total count data, please hover over a relevant grade bar.
        </Typography>
      </Box>

      <Box>
        {/* TODO: Make labels more bold? */}
        <BarChart
          // width={1400}
          sx={{ width: '100%' }} // Use '100%' for dynamic width
          height={400}
          series={[
            {
              // label: 'Total Count per Grade Received',
              data: gradeTotalCountData,
            },
          ]}
          // X-axis for the values (numerical)
          xAxis={[
            {
              label: 'Total Count Per Grade Received',
              scaleType: 'linear',
            },
          ]}
          // Y-axis for the grades (strings)
          yAxis={[
            {
              label: 'Grade Received',
              data: gradeCategoryLabels,
              scaleType: 'band',
              colorMap: {
                type: 'ordinal',
                colors: gradeColors,
              },
            },
          ]}
          layout="horizontal"
        />
      </Box>
    </Box>
  )
}
