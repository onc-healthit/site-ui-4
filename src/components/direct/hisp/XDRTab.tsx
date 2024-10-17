import React, { useState } from 'react'

import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material'
import XDRTestCard from '@components/direct/hisp/XDRTestCard'
import TestFilter from './TestFilter'
import testCases from '@/assets/XDRTestCases'
import DownloadXDRCert from '../shared/DownloadXDRCert'

const XDR = () => {
  const [option, setOption] = useState('')
  const xdrTestCasesSender = testCases.filter((test) => test.sutRole === 'sender' && test.sutHisp)
  const xdrTestCasesReceiver = testCases.filter((test) => test.sutRole === 'receiver' && test.sutHisp)
  const handleChange = (event: SelectChangeEvent) => {
    setOption(event.target.value as string)
  }

  const dropdown = [
    {
      value: 'sender',
      label: 'Sender',
    },
    {
      value: 'receiver',
      label: 'Receiver',
    },
  ]

  return (
    <Container>
      <Box pt={4}>
        <Typography variant="h3">
          Select sender or receiver for your system & fill in the additional fields to get started.{' '}
        </Typography>
      </Box>
      <Box display={'flex'} flexDirection={'row'} gap={4} py={4}>
        <Box
          sx={{ position: 'sticky', top: '80px', zIndex: 100, height: '100%', width: '40%' }}
          display={'flex'}
          gap={4}
          flexDirection={'column'}
        >
          <Card elevation={4}>
            <CardContent>
              <FormControl fullWidth>
                <InputLabel id="select-label">Choose your system as Sender or Receiver</InputLabel>
                <Select
                  labelId="select-label"
                  id="select"
                  value={option}
                  label="Choose your system as Sender or Receiver"
                  onChange={handleChange}
                >
                  {dropdown.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </CardContent>
          </Card>
          <DownloadXDRCert />
        </Box>
        <Box display={'flex'} flexDirection={'column'} width={'60%'} gap={4}>
          {option !== '' && (
            <Box>
              <TestFilter />
            </Box>
          )}
          {option === 'sender' && (
            <div>
              {xdrTestCasesSender.map((testcase, i) => {
                return (
                  <Box pb={4} key={i}>
                    <XDRTestCard test={testcase} />
                  </Box>
                )
              })}
            </div>
          )}
          {option === 'receiver' && (
            <div>
              {xdrTestCasesReceiver.map((testcase, i) => {
                return (
                  <Box pb={4} key={i}>
                    <XDRTestCard test={testcase} />
                  </Box>
                )
              })}
            </div>
          )}
        </Box>
      </Box>
    </Container>
  )
}

export default XDR
