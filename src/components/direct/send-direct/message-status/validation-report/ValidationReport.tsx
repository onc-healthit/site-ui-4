'use client'
import React from 'react'
import { Card, CardContent, Container, Box, Button, Typography } from '@mui/material'
import TreeMenu from './TreeMenu'
import ValidationTable from './ValidationTable'
import palette from '@/styles/palette'

const ValidationReportHome = () => {
  return (
    <>
      {/* Main Content */}
      <Container sx={{ pt: 4, pb: 8 }} maxWidth="lg">
        <Box display={'flex'} gap={4} flexDirection={'row'}>
          <Card sx={{ width: '35%' }}>
            <CardContent>
              <Box display={'flex'} justifyContent={'space-between'} flexDirection={'row'}>
                <Typography variant="h3" sx={{ pb: 1 }}>
                  Summary
                </Typography>
                <Button variant="text" href="/direct/senddirect">
                  Go Back
                </Button>
              </Box>
              <TreeMenu />
            </CardContent>
          </Card>
          <Box display={'flex'} width="100%" gap={4} flexDirection={'column'}>
            <Card sx={{ width: '100%' }}>
              <CardContent>
                <Typography variant="h3" sx={{ pb: 1 }}>
                  Summary
                </Typography>
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
            <Card sx={{ width: '100%' }}>
              <CardContent>
                <Typography variant="h3" sx={{ pb: 1 }}>
                  Details
                </Typography>
                <ValidationTable />
                <Typography mt={4}>
                  Table will load depending on what part the nav a user selects. Delete later.
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default ValidationReportHome
