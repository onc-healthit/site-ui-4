import { Typography } from '@mui/material'
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
      <Typography sx={{ lineHeight: '.25' }}>
        <p>{getFileAge(fileDate)}</p>
        <p>
          <a href={fileUrl} download={fileName}>
            {fileName}
          </a>{' '}
          {showFileType && <span> (File)</span>}
        </p>
      </Typography>
    </div>
  )
}

export default VideoItem
