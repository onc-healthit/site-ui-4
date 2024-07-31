'use client'
import palette from '@/styles/palette'
import { Typography, List, ListItem, Box, TextField, MenuItem, Button } from '@mui/material'
import TestCasePanel from './TestCasePanel'
import React, { useEffect, useState } from 'react'
import _ from 'lodash'
import Link from 'next/link'
import discoverTestCases from './DiscoverTestCases'
import bulletedList from '../shared/BulletList'
import { useFormState } from 'react-dom'
import { handleSubmitDiscover } from './actions'
import DiscoverResultsComponent from './DiscoverResults'

const DCDTCertificates = () => {
  const [discoverCase, setDiscoverCase] = React.useState(discoverTestCases.filter((c) => c.code === ' '))

  const [openDiscoverCase, setOpenDiscoverCase] = React.useState(false)
  const [directAddress, setDirectAddress] = useState('')
  const [resultsAddress, setResultsAddress] = useState('')
  const [data, handleSubmit] = useFormState(handleSubmitDiscover, { response: {} })

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
    setResultsAddress('')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (_.isEqual(name, 'step2DirectAddress')) {
      setDirectAddress(value)
    }
    if (_.isEqual(name, 'resultsAddr')) {
      setResultsAddress(value)
    }
  }
  const dcdtDomain = 'dcdt31.healthit.gov'
  return (
    <Box>
      <Typography variant="body1">
        <strong>Directions</strong>
      </Typography>
      <List sx={bulletedList('number')}>
        <ListItem sx={{ display: 'list-item' }}>
          <Typography variant="body2">
            {"Download the Testing Tool's trust anchor."}{' '}
            <Link href={'http://dcdt31.healthit.gov/dcdt/discovery/anchor'}>Download Trust Anchor</Link>
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
        <form action={handleSubmit}>
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
              id="resultsAddr"
              name="resultsAddr"
              label="Enter your Email Address"
              helperText="For Results"
              required
              value={resultsAddress}
              InputProps={{ type: 'email' }}
              onChange={handleChange}
            />
            <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
              <Box display={'flex'} flexDirection={'row'} gap={1}>
                <DiscoverResultsComponent response={data?.response} />
              </Box>
              <Button variant="outlined" sx={{ color: palette.primary }} onClick={handleReset}>
                RESET FIELDS
              </Button>
            </Box>
          </Box>
        </form>
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
                {discoverCase[0].Direct_address_2015?.replace('dcdt31prod.sitenv.org', dcdtDomain)}
              </Typography>
              <TestCasePanel testCaseFields={discoverCase} />
            </>
          )}
        </Box>
      </List>
    </Box>
  )
}

export default DCDTCertificates
