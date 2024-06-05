import palette from '@/styles/palette'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'

interface CircularProgressWithLabelAndBackgroundProps {
  labelValue: number
  progressValue: number
  labelAndProgressColor: string
}

export default function CircularProgressWithLabelAndBackground(props: CircularProgressWithLabelAndBackgroundProps) {
  const baseCheckHeaderStyle = {
    fontWeight: 'bold',
    fontSize: 60,
    color: props.labelAndProgressColor,
  }

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
      <CircularProgress
        variant="determinate"
        value={props.progressValue}
        thickness={6}
        style={{
          color: props.labelAndProgressColor,
          width: '170px',
          height: '170px',
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
