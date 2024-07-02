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
import SMTPTestCard from '../shared/SMTPTestCard'
import TestCard from '../hisp/TestCard'
import palette from '@/styles/palette'
import React, { useEffect, useState } from 'react'
import testCases from '../hisp/data/SMTPTestCases'

const B1Component = () => {
  const [option, setOption] = useState('')
  const [showTestCard, setShowTestCard] = useState(false)

  // Pre-filtered lists for different criteria
  const criteriaA = testCases.tests.filter((test) => test.criteria?.includes('A'))
  const criteriaB = testCases.tests.filter((test) => test.criteria?.includes('B'))
  const criteriaC = testCases.tests.filter((test) => test.criteria?.includes('C'))
  const criteriaD = testCases.tests.filter((test) => test.criteria?.includes('b1-8'))

  const handleChange = (event: SelectChangeEvent) => {
    setOption(event.target.value as string)
    setShowTestCard(true)
  }

  const dropdown = [
    { value: 'A', label: 'Criteria (i)(A) Send using Edge Protocol - XDR' },
    { value: 'B', label: 'Criteria (i)(A) Send using Edge Protocol - SMTP' },
    { value: 'C', label: 'Criteria C' },
    { value: 'D', label: 'Criteria D' },
  ]

  // Select the right list based on the option
  const selectedTestCases = () => {
    switch (option) {
      case 'A':
        return criteriaA
      case 'B':
        return criteriaB
      case 'C':
        return criteriaC
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
                  Use the menu to select what sub criteria you want to test for.
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
          <Card>
            <Profile />
          </Card>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          {showTestCard && selectedTestCases().map((test, i) => <TestCard key={i} test={test} />)}
        </Box>
      </Box>
    </Container>
  )
}

export default B1Component
