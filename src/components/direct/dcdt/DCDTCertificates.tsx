'use client'
import palette from '@/styles/palette'
import { Typography, List, ListItem, Box, TextField, MenuItem, Button } from '@mui/material'
import TestCasePanel from './TestCasePanel'
import React, { useEffect, useState } from 'react'
import _ from 'lodash'
import Link from 'next/link'
import discoverTestCases from './DiscoverTestCases'
import bulletedList from '../shared/BulletList'

const DCDTCertificates = () => {
  const [discoverCase, setDiscoverCase] = React.useState(discoverTestCases.filter((c) => c.code === ' '))

  const [openDiscoverCase, setOpenDiscoverCase] = React.useState(false)
  const [directAddress, setDirectAddress] = useState('')
  const [emailAddress, setEmailAddress] = useState('')

  useEffect(() => {
    if (discoverCase[0].code !== ' ') {
      setOpenDiscoverCase(true)
    } else {
      setOpenDiscoverCase(false)
    }
  }, [discoverCase])

  const handleDiscoverCaseSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const testCase = discoverTestCases.filter((c) => c.code === event.target.value)
    setDiscoverCase(testCase)
  }

  const handleReset = () => {
    setDiscoverCase(discoverTestCases.filter((c) => c.code === ' '))
    setDirectAddress('')
    setEmailAddress('')
  }

  const handleSubmit = () => {
    //TO-DO
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (_.isEqual(name, 'step2DirectAddress')) {
      setDirectAddress(value)
    }
    if (_.isEqual(name, 'emailAddress')) {
      setEmailAddress(value)
    }
  }

  return (
    <Box component={'form'} onSubmit={handleSubmit}>
      <Typography variant="body1">
        <strong>Directions</strong>
      </Typography>
      <List sx={bulletedList('number')}>
        <ListItem sx={{ display: 'list-item' }}>
          <Typography variant="body2">
            {"Download the Testing Tool's trust anchor."} <Link href={''}>Download Trust Anchor</Link>
          </Typography>
        </ListItem>
        <ListItem sx={{ display: 'list-item' }}>
          <Typography variant="body2">
            Upload the anchor to your Direct instance. This will allow you to send messages to our tool.
          </Typography>
        </ListItem>
        <ListItem sx={{ display: 'list-item' }}>
          <Typography variant="body2">
            Using the form below, map the Direct email address from which you will be sending messages to a non-Direct
            email address that will receive a regular email containing test results. This email address should be able
            to receive plain text messages. Make sure you have access to the recipient email address in order to verify
            the receipt of the messages.
          </Typography>
        </ListItem>
        <Box p={2}>
          <TextField
            fullWidth
            id="step2DirectAddress"
            name="step2DirectAddress"
            label="Enter your Direct Address"
            helperText=""
            required
            value={directAddress}
            InputProps={{ type: 'email' }}
            sx={{ pb: 2 }}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            id="emailAddress"
            name="emailAddress"
            label="Enter your Email Address"
            helperText="For Results"
            required
            value={emailAddress}
            InputProps={{ type: 'email' }}
            onChange={handleChange}
          />
        </Box>
        <ListItem sx={{ display: 'list-item' }}>
          <Typography variant="body2">
            {
              'Choose a test case from the drop down menu below. Read the test case description below the "Direct Address" field, copy the displayed Direct address and proceed to step 5. You should run all of the tests in order to verify that your system can correctly discover certificates in either DNS CERT records or LDAP servers. (Note: your system MUST NOT already contain a certificate for the address selected or the test case will not be valid).'
            }
          </Typography>
        </ListItem>
        <ListItem sx={{ display: 'list-item' }}>
          <Typography variant="body2">
            {
              "Attempt to send a message to the Direct address that you've just copied. Please only send to one address at a time. The test case results message will indicate the test case results. See the test case instructions for additional information."
            }
          </Typography>
        </ListItem>
        <Box p={2}>
          <TextField
            fullWidth
            id="select-discover-test-case"
            name="discoverTestCase"
            select
            label="Select a Discover Test Case"
            helperText=""
            value={discoverCase[0].code}
            onChange={handleDiscoverCaseSelect}
          >
            {discoverTestCases.map((option) => (
              <MenuItem key={option.code} value={option.code}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
          {openDiscoverCase && (
            <>
              <Typography variant="h4" p={2} pl={0}>
                <strong>Direct Address: </strong>
                {discoverCase[0].Direct_address_2015}
              </Typography>
              <TestCasePanel testCaseFields={discoverCase} />
            </>
          )}
        </Box>
      </List>

      <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} p={2}>
        <Box display={'flex'} flexDirection={'row'} gap={1}>
          <Button variant="contained" sx={{ color: palette.white }}>
            SUBMIT
          </Button>
        </Box>
        <Button variant="outlined" sx={{ color: palette.primary }} onClick={handleReset}>
          RESET FIELDS
        </Button>
      </Box>
    </Box>
  )
}

export default DCDTCertificates
