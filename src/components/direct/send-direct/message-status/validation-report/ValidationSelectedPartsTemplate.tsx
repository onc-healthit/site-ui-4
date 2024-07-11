'use client'
import React from 'react'
import { Card, CardContent, Box, Typography, Divider } from '@mui/material'
import palette from '@/styles/palette'

const ValidationSolutions = () => {
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
                Content-Type: application/pks-mine; smime-type=envopleddata; name “smime.p7m”
              </Typography>
              <Typography fontFamily={'monospace'} variant="body1">
                Content-Disposition: placeholder
              </Typography>
              <Typography fontFamily={'monospace'} variant="body1">
                Content-Transfer: placeholder
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  )
}

export default ValidationSolutions
