'use client'
import React from 'react'
import { Container, Box, Button, Typography } from '@mui/material'
import palette from '@/styles/palette'

const MessageTemplate = () => {
  return (
    <>
      {/* Main Content */}
      <Container sx={{ pt: 0, pb: 8 }} maxWidth="lg">
        <Box flexDirection={'row'} justifyContent={'space-between'} display={'flex'} pb={2}>
          <Typography variant="h3">Message</Typography>
          <Button variant="outlined" color="primary">
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
          <Typography fontFamily={'monospace'} variant="body1">
            ExtrinsicObjectID, URI, HashAttribute, SizeAttribute, URIAttribute, DocumentStatus, FileType,
            SubmissionDate, ApprovalStatus, Comments 655883d1-54a6-4dbb-a616-48e71e46b3e2, CCDAAMB.XML, Hash attribute
            found, Size attribute found, URI attribute found, Document found for uri, XML, 2024-06-20, Approved,
            Document meets all the required attributes and is approved for use.ExtrinsicObjectID, URI, HashAttribute,
            SizeAttribute, URIAttribute, DocumentStatus, FileType, SubmissionDate, ApprovalStatus, Comments
            655883d1-54a6-4dbb-a616-48e71e46b3e2, CCDAAMB.XML, Hash attribute found, Size attribute found, URI attribute
            found, Document found for uri, XML, 2024-06-20, Approved, Document meets all the required attributes and is
            approved for use.{' '}
          </Typography>
          <Typography>Approved, Document meets all the required attributes and is approved for use.</Typography>
        </Box>
      </Container>
    </>
  )
}

export default MessageTemplate
