import palette from '@/styles/palette'
import { Typography, List, ListItem, Box, TextField, MenuItem, Button } from '@mui/material'
import TestCasePanel from './TestCasePanel'
import React, { useEffect, useState } from 'react'
import hostingTestCases from './HostingTestCases'
import { SiteList } from './DiscoveryTool'

const Hosting = () => {
  const [hostingCase, setHostingCase] = useState(hostingTestCases.filter((c) => c.code === ' '))
  const [openHostingCase, setOpenHostingCase] = useState(false)
  const [hostingDirectAddress, setHostingDirectAddress] = useState('')

  useEffect(() => {
    if (hostingCase[0].code !== ' ') {
      setOpenHostingCase(true)
    } else {
      setOpenHostingCase(false)
    }
  }, [hostingCase])

  const handleHostingCaseSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const testCase = hostingTestCases.filter((c) => c.code === event.target.value)
    setHostingCase(testCase)
  }

  const handleReset = () => {
    setHostingCase(hostingTestCases.filter((c) => c.code === ' '))
    setHostingDirectAddress('')
  }
  const handleSubmit = () => {
    //To-DO
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setHostingDirectAddress(value)
  }
  return (
    <>
      <Typography variant="body1">
        <strong>Directions</strong>
      </Typography>
      <List sx={SiteList}>
        <ListItem sx={{ display: 'list-item' }}>
          <Typography variant="body2">
            Determine the required test cases for your SUT (System Under Test). Notice that there are two options for
            storage of address-bound and domain-bound certificates.
          </Typography>
        </ListItem>
        <ListItem sx={{ display: 'list-item' }}>
          <Typography variant="body2">Select a test case that reflects the SUT from the dropdown.</Typography>
        </ListItem>
        <ListItem sx={{ display: 'list-item' }}>
          <Typography variant="body2">
            Read the Description and Instructions for the selected test case. Then enter the Direct address and submit.
            Your SUT configuration may require that you select more than one test case. If so, then select one test case
            at a time, following the instructions to execute the test after each selection.
          </Typography>
        </ListItem>
      </List>
      <Box p={2} component={'form'} onSubmit={handleSubmit}>
        <TextField
          fullWidth
          id="select-hosting-test-case"
          name="hostingTestCase"
          select
          label="Select a Hosting Test Case"
          helperText=""
          value={hostingCase[0].code}
          sx={{ pb: 2 }}
          onChange={handleHostingCaseSelect}
        >
          {hostingTestCases.map((option) => (
            <MenuItem key={option.code} value={option.code}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
        {openHostingCase && <TestCasePanel testCaseFields={hostingCase} />}
        <TextField
          fullWidth
          id="step1DirectAddress"
          name="step1DirectAddress"
          label="Enter your Direct Address"
          helperText=""
          required
          value={hostingDirectAddress}
          InputProps={{ type: 'email' }}
          onChange={handleChange}
        />

        <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} pt={2}>
          <Box display={'flex'} flexDirection={'row'} gap={1}>
            <Button variant="contained" sx={{ color: palette.white }} type="submit">
              SUBMIT
            </Button>
          </Box>
          <Button variant="outlined" sx={{ color: palette.primary }} onClick={handleReset}>
            RESET FIELDS
          </Button>
        </Box>
      </Box>
    </>
  )
}

export default Hosting
