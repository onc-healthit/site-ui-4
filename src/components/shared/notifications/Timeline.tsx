import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineOppositeContent,
  TimelineContent,
  TimelineDot,
} from '@mui/lab'
import { Box, Typography } from '@mui/material'
import palette from '@/styles/palette'

// TypeScript types for props
interface TimelineItemProps {
  title: string
  date: string
  description: string
}

interface TimelineProps {
  items: TimelineItemProps[]
}

// Timeline component
const CustomTimeline = ({ items }: TimelineProps) => (
  <Box width="100%" padding="0">
    <Timeline sx={{ padding: 0 }} position="right">
      {items.map((item, index) => (
        <TimelineItem key={index}>
          <TimelineOppositeContent
            sx={{
              flex: 0.1,
              maxWidth: 'min-content',
              paddingLeft: 0,
              paddingRight: 2,
            }}
          >
            <Typography variant="body2" color="textSecondary">
              {item.date}
            </Typography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot style={{ backgroundColor: palette.primary }} /> {/* Custom dot color */}
            {index < items.length - 1 && <TimelineConnector />} {/* Only add connector if not last item */}
          </TimelineSeparator>
          <TimelineContent sx={{ flex: 1 }}>
            <Box
              sx={{
                padding: '16px',
                marginBottom: '16px',
                width: '100%',
                bgcolor: '#F2D0A764',
                mb: 2,
                border: 1,
                borderRadius: 1,
              }}
            >
              <Typography fontWeight={'600'} gutterBottom variant="h5">
                {item.title}
              </Typography>
              <Typography variant="body1">{item.description}</Typography>
            </Box>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  </Box>
)

export default CustomTimeline
