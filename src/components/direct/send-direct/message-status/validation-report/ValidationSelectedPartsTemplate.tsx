'use client'
import React from 'react'
import { Card, CardContent, Box, Typography, Divider } from '@mui/material'
import palette from '@/styles/palette'
import { ValidationReport } from './ValidationReportTypes'
interface SelectedPartsTemplateProps {
  selectedNode: ValidationReport | null
}
const SelectedPartsTemplate = ({ selectedNode }: SelectedPartsTemplateProps) => {
  return (
    <>
      {/* Main Content */}
      <Box display={'flex'} width="50%" gap={4} flexDirection={'column'}>
        <Card sx={{ width: '100%' }}>
          <CardContent>
            <Typography variant="h4" sx={{ pb: 1 }}>
              Selected Parts
            </Typography>
            <Divider sx={{ mb: 2 }} />
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
                Content-Type: {selectedNode?.contentType}
              </Typography>
              <Typography fontFamily={'monospace'} variant="body1">
                Content-Disposition: {selectedNode?.contentDisposition}
              </Typography>
              <Typography fontFamily={'monospace'} variant="body1">
                Content-Transfer: {selectedNode?.contentTransferEncoding}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  )
}

export default SelectedPartsTemplate
