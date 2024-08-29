import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { styled, keyframes } from '@mui/material/styles'
import palette from '@/styles/palette'

interface CircularProgressWithLabelAndBackgroundProps {
  progressValue: number
  labelValue: string
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

  const scaleUp = keyframes`
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  `

  const checkMarkStyle = {
    fontSize: '164px',
    color: palette.success,
    animation: `${scaleUp} 0.5s ease-out`,
  }

  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      {props.progressValue === 0 ? (
        <CheckCircleIcon sx={checkMarkStyle} />
      ) : (
        <>
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
        </>
      )}
    </Box>
  )
}
