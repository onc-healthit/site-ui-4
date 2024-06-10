import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { styled, keyframes } from '@mui/material/styles'
import palette from '@/styles/palette'

interface CircularProgressWithLabelAndBackgroundProps {
  progressValue: number
  labelValue: number
  labelAndProgressColor: string
}
export default function CircularProgressWithLabelAndBackground(props: CircularProgressWithLabelAndBackgroundProps) {
  const baseCheckHeaderStyle = {
    fontWeight: 'bold',
    fontSize: 60,
    color: props.labelAndProgressColor,
  }
  const colorTransition = keyframes`
  0% {
    stroke: transparent;
  }
  100% {
    stroke: currentColor;
  }
`
  const CustomCircularProgress = styled(CircularProgress)(() => ({
    '& .MuiCircularProgress-circleDeterminate': {
      animation: `${colorTransition} 1.5s forwards`, // Adjust duration as needed
    },
  }))

  const circularProgressLabelStyle = {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }

  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CustomCircularProgress
        variant="determinate"
        value={props.progressValue}
        thickness={4.3}
        style={{
          color: props.labelAndProgressColor,
          width: '168px',
          height: '168px',
          borderRadius: '100%',
          boxShadow: `inset 0 0 0px 18px ${palette.greyLight}`,
        }}
      />
      <Box sx={circularProgressLabelStyle}>
        <Typography variant="caption" sx={baseCheckHeaderStyle}>
          {props.labelValue}
        </Typography>
      </Box>
    </Box>
  )
}
