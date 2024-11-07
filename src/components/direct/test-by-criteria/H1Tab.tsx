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
import React, { useState, useContext } from 'react'
import Profile from '../shared/Profile'
import palette from '@/styles/palette'
import TestCard from '../hisp/TestCard'
import testCases from '../../../assets/SMTPTestCases'
import { ProfileContext } from '../hisp/context'
import eventTrack from '@/services/analytics'

const H1Component = () => {
  const [option, setOption] = useState('')
  const { hostname, email, password, tls, username } = useContext(ProfileContext)

  const dropdownOptions = [
    {
      value: 'directHome',
      label: 'Paragraph (i) Direct Home - Certificates',
      link: '/direct#certification-download',
    },
    {
      value: 'certificateDiscovery',
      label: 'Paragraph (i) Certificate Discovery / Hosting',
      link: '/direct/dcdt#hosting',
    },
    { value: 'registerDirect', label: 'Paragraph (i) Register Direct', link: '/direct/register' },
    { value: 'sendDirectMessage', label: 'Paragraph (i) Send Direct Message', link: '/direct/senddirect' },
    {
      value: 'receiveMessageStatus',
      label: 'Paragraph (i) Receive - Message Status',
      link: '/direct/senddirect#message-status',
    },
    { value: 'deliveryNotifications', label: 'Paragraph (ii) Delivery Notifications', testCard: true },
  ]

  const h1Criteria = testCases.tests.filter((test) => test.criteria?.includes('h1-1'))

  const selectedTestCases = () => {
    switch (option) {
      default:
        return h1Criteria
    }
  }

  const handleChange = (event: SelectChangeEvent) => {
    const selectedOption = dropdownOptions.find((option) => option.value === event.target.value)
    if (selectedOption?.testCard) {
      setOption(event.target.value)
      eventTrack(`Selected: ${selectedOption.label}`, 'Test By Criteria - H1', 'User selects criteria on h1 tab')
    } else if (selectedOption?.link) {
      window.location.href = selectedOption.link
      eventTrack(`Selected: ${selectedOption.link}`, 'Test By Criteria - H1', 'User selects criteria on h1 tab')
    }
  }

  const showTestCard = option === 'deliveryNotifications'

  return (
    <Container>
      <Box sx={{ display: 'flex', width: '100%', py: 4, gap: 4 }}>
        {/* Left-side UI (Sub-Criteria Selection) */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            maxWidth: '35%',
            position: 'sticky',
            top: '75px',
            zIndex: '801',
            height: '100%',
            mb: 16,
          }}
        >
          <Card sx={{ position: 'relative', border: '.5px solid #BCBCBC', minHeight: 'fit-content' }}>
            <CardContent>
              <Box component="form" sx={{ backgroundColor: palette.white }}>
                <Typography fontWeight={'600'} variant="h5" component="h2" gutterBottom pb={2}>
                  Use the menu to select what
                  <br /> sub criteria you want to test for.
                </Typography>
                <Box>
                  <FormControl fullWidth>
                    <InputLabel id="h1-select-label">Choose a sub category</InputLabel>
                    <Select
                      labelId="h1-select-label"
                      id="h1-select"
                      value={option}
                      label="Choose a sub category"
                      onChange={handleChange}
                    >
                      {dropdownOptions.map((item) => (
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
          <Profile />
        </Box>
        {/* Right-side Content (Test Cards) */}
        <Box width={'60%'}>
          {!showTestCard && (
            <Box
              border={`1px solid ${palette.grey}`}
              borderRadius={2}
              padding={2}
              display={'flex'}
              alignItems={'center'}
            >
              <p>Waiting for sub criteria to be selected...</p>
            </Box>
          )}
          {showTestCard &&
            selectedTestCases().map((test, i) => (
              <Box key={i} sx={{ mb: 2 }}>
                <TestCard
                  test={test}
                  hostname={hostname}
                  email={email}
                  username={username}
                  password={password}
                  tlsRequired={tls}
                  receive={false}
                />
              </Box>
            ))}
        </Box>
      </Box>
    </Container>
  )
}

export default H1Component
