import { Box, Typography } from '@mui/material'
import React from 'react'

interface VideoItemProps {
  fileName: string
  fileDate: string
  fileUrl: string
  showFileType?: boolean
}

const VideoItem: React.FC<VideoItemProps> = ({ fileName, fileDate, fileUrl, showFileType = true }) => {
  const getFileAge = (dateString: string): string => {
    const fileDate = new Date(dateString)
    const now = new Date()
    const differenceInMilliseconds = now.getTime() - fileDate.getTime()
    const differenceInYears = differenceInMilliseconds / (1000 * 60 * 60 * 24 * 365)

    if (differenceInYears < 1) {
      const differenceInMonths = differenceInMilliseconds / (1000 * 60 * 60 * 24 * 30)
      if (differenceInMonths < 1) {
        const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24)
        return `${Math.floor(differenceInDays)} days ago`
      }
      return `${Math.floor(differenceInMonths)} months ago`
    }
    return `${Math.floor(differenceInYears)} years ago`
  }

  return (
    <div>
      <Box
        sx={{
          px: '16px',
          py: '32px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          lineHeight: '1.3',
          borderRight: '.5px solid #eee',
          borderLeft: '.5px solid #eee',
          borderBottom: '1px solid #eee',
        }}
      >
        <a href={fileUrl} download={fileName}>
          {fileName}
        </a>{' '}
        {showFileType && <span></span>}
        <Typography variant="body2">{getFileAge(fileDate)}</Typography>
      </Box>
    </div>
  )
}

export default VideoItem
