'use client'
import React from 'react'
import { Container, Box, Button, Typography } from '@mui/material'
import palette from '@/styles/palette'
import { RawContent } from './ValidationReportTypes'
interface MessageTemplateProps {
  rawContent: RawContent
}
const MessageTemplate = ({ rawContent }: MessageTemplateProps) => {
  //revisit this to make it dynamic based on the download link
  const downloadLink = `https://ett.healthit.gov/ett/api/validationReport/download/${rawContent.downloadLink}`
  return (
    <>
      {/* Main Content */}
      <Container sx={{ py: 4 }} maxWidth="lg">
        <Box flexDirection={'row'} justifyContent={'space-between'} display={'flex'} pb={2}>
          <Typography variant="h3">Message</Typography>
          <Button variant="outlined" color="primary" href={downloadLink}>
            Download
          </Button>
        </Box>
        <Box
          display={'flex'}
          width="100%"
          gap={1}
          bgcolor={palette.greyLight}
          flexDirection={'column'}
          p={2}
          borderRadius={1}
          border={`1px solid ${palette.greyDark}`}
        >
          <pre>{rawContent.rawContent}</pre>
        </Box>
      </Container>
    </>
  )
}

export default MessageTemplate
