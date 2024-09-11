import {
  Box,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  Card,
  CardContent,
  Container,
} from '@mui/material'
import React, { useState } from 'react'
import Profile from '../shared/Profile'
import palette from '@/styles/palette'
import TestCard from '../hisp/TestCard'
import testCases from '../../../assets/SMTPTestCases'

const H1Component = () => {
  const [option, setOption] = useState('')
  const [hostname, setHostname] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [tlsRequired, setTlsRequired] = useState(false)

  const dropdownOptions = [
    {
      value: 'directHome',
      label: 'Criteria (i) Direct Home - Certificates',
      link: '/direct#certification-download',
    },
    {
      value: 'certificateDiscovery',
      label: 'Criteria (i) Certificate Discovery / Hosting',
      link: '/direct/dcdt#hosting',
    },
    { value: 'registerDirect', label: 'Criteria (i) Register Direct', link: '/direct/register' },
    { value: 'sendDirectMessage', label: 'Criteria (i) Send Direct Message', link: '/direct/senddirect' },
    {
      value: 'receiveMessageStatus',
      label: 'Criteria (i) Receive - Message Status',
      link: '/direct/senddirect#message-status',
    },
    { value: 'deliveryNotifications', label: 'Criteria (ii) Delivery Notifications', testCard: true },
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
    } else if (selectedOption?.link) {
      window.location.href = selectedOption.link
    }
  }

  const showTestCard = option === 'deliveryNotifications'

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
          <Card>
            <Profile
              setHostname={setHostname}
              setEmail={setEmail}
              setUsername={setUsername}
              setPassword={setPassword}
              setTls={setTlsRequired}
            />
          </Card>
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
                  tlsRequired={tlsRequired}
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
