import {
  Box,
  Card,
  CardContent,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material'
import Profile from '../shared/Profile'
import XDRTestCard from '../hisp/XDRTestCard'
import TestCard from '../hisp/TestCard'
import palette from '@/styles/palette'
import React, { useState } from 'react'
import testCases from '../../../assets/SMTPTestCases'
import xdrTestCases from '../../../assets/XDRTestCases'
import { useContext } from 'react'
import { ProfileContext } from '../hisp/context'
import DownloadXDRCert from '../shared/DownloadXDRCert'

const B1Component = () => {
  const [option, setOption] = useState('')
  const [showTestCard, setShowTestCard] = useState(false)
  const { hostname, email, password, tls, username } = useContext(ProfileContext)
  const [isXDR, setIsXDR] = React.useState(false)

  const criteriaA = xdrTestCases.filter((testXdr) => testXdr.criteria?.includes('b1-1'))
  const criteriaB = testCases.tests.filter((test) => test.criteria?.includes('b1-8'))
  const criteriaC = testCases.tests.filter((test) => test.criteria?.includes("['b1-2','su1-2']"))
  const criteriaD = xdrTestCases.filter((testXdr) => testXdr.criteria?.includes('b1-3'))
  const criteriaE = testCases.tests.filter((test) => test.criteria?.includes('b1-4'))
  const criteriaF = testCases.tests.filter((test) => test.criteria?.includes('b1-5'))
  const criteriaG = testCases.tests.filter((test) => test.criteria?.includes('b1-6'))
  const criteriaH = testCases.tests.filter((test) => test.criteria?.includes('b1-7'))

  const handleChange = (event: SelectChangeEvent) => {
    const newOption = event.target.value as string

    setShowTestCard(false)
    if (newOption === 'A' || newOption === 'D') {
      setIsXDR(true)
    } else {
      setIsXDR(false)
    }

    setTimeout(() => {
      setOption(newOption)
      setShowTestCard(true)
    }, 0)
  }

  const dropdown = [
    { value: 'A', label: 'Paragraph (i)(A) Send using Edge Protocol - XDR' },
    { value: 'B', label: 'Paragraph (i)(A) Send using Edge Protocol - SMTP' },
    { value: 'C', label: 'Paragraph (i)(A) Send using Edge Protocol - Delivery Notification' },
    { value: 'D', label: 'Paragraph (i)(B) Receive using Edge Protocol - XDR' },
    { value: 'E', label: 'Paragraph (i)(B) Receive using Edge Protocol - SMTP' },
    { value: 'F', label: 'Paragraph (i)(B) Receive using Edge Protocol - IMAP' },
    { value: 'G', label: 'Paragraph (i)(B) Receive using Edge Protocol - POP3' },
    { value: 'H', label: 'Paragraph (i)(C) XDM Processing Received via Edge Protocol' },
  ]

  const selectedTestCases = () => {
    switch (option) {
      case 'B':
        return criteriaB
      case 'C':
        return criteriaC
      case 'E':
        return criteriaE
      case 'F':
        return criteriaF
      case 'G':
        return criteriaG
      case 'H':
        return criteriaH
      default:
        return []
    }
  }

  const isReceiveOption = () => {
    return ['D', 'E', 'F', 'G'].includes(option)
  }

  const selectedXDRTestCases = () => {
    switch (option) {
      case 'A':
        return criteriaA
      case 'D':
        return criteriaD
      default:
        return []
    }
  }

  return (
    <Container>
      <Box sx={{ display: 'flex', width: '100%', pt: 4, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: '40%' }}>
          <Card>
            <CardContent>
              <Box component="form" sx={{ backgroundColor: palette.white }}>
                <Typography variant="body2" gutterBottom>
                  Use the menu to select what paragraph you want to test for.
                </Typography>
                <Box>
                  <FormControl fullWidth>
                    <InputLabel id="b1-select-label">Choose a sub category</InputLabel>
                    <Select
                      labelId="b1-select-label"
                      id="b1-select"
                      value={option}
                      label="Choose a sub category"
                      onChange={handleChange}
                    >
                      {dropdown.map((item) => (
                        <MenuItem key={item.value} value={item.value}>
                          {item.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            </CardContent>
          </Card>
          {!isXDR && (
            <Card>
              <Profile />
            </Card>
          )}
          {isXDR && <DownloadXDRCert />}
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          {showTestCard &&
            selectedTestCases().map((test, i) => (
              <Box key={i} sx={{ mb: 2 }}>
                {' '}
                <TestCard
                  test={test}
                  hostname={hostname}
                  email={email}
                  username={username}
                  password={password}
                  tlsRequired={tls}
                  receive={isReceiveOption()}
                />
              </Box>
            ))}
          {showTestCard &&
            selectedXDRTestCases().map((test, i) => (
              <Box key={i} sx={{ mb: 2 }}>
                {' '}
                <XDRTestCard key={i} test={test} receive={isReceiveOption()} />
              </Box>
            ))}
        </Box>
      </Box>
    </Container>
  )
}

export default B1Component
