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
import TestCard from './TestCard'
import palette from '@/styles/palette'
import * as React from 'react'
import testCases from '@/assets/SMTPTestCases'
import TestFilter from './TestFilter'
import { useContext } from 'react'
import { ProfileContext } from './context'

const SMTP = () => {
  const [option, setOption] = React.useState('')
  const smtpTestCases = testCases.tests.filter((test) => test.protocol === 'smtp')
  const smtpTestCasesSender = smtpTestCases.filter((test) => test.sutRole === 'sender' && test.sutHisp)
  const smtpTestCasesReceiver = smtpTestCases.filter((test) => test.sutRole === 'receiver' && test.sutHisp)
  const { hostname, email, password, tls, username } = useContext(ProfileContext)
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
      <Box sx={{ display: 'flex', width: '100%', pt: 4, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: '40%' }}>
          <Card>
            <CardContent>
              <Box component="form" sx={{ backgroundColor: palette.white }}>
                <Box>
                  <FormControl fullWidth>
                    <InputLabel id="select-role">Choose your system as Sender or Receiver</InputLabel>
                    <Select
                      labelId="select-role"
                      id="select-role"
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
                </Box>
              </Box>
            </CardContent>
          </Card>
          <Card>
            <Profile />
          </Card>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          {option !== '' && (
            <Box pb={2}>
              <TestFilter />
            </Box>
          )}
          {option === 'sender' && (
            <div>
              {smtpTestCasesSender.map((test, i) => {
                return (
                  <Box pb={4} key={i}>
                    <TestCard
                      test={test}
                      email={email}
                      hostname={hostname}
                      password={password}
                      tlsRequired={tls}
                      username={username}
                    />
                  </Box>
                )
              })}
            </div>
          )}
          {option === 'receiver' && (
            <div>
              {smtpTestCasesReceiver.map((test, i) => {
                return (
                  <Box pb={4} key={i}>
                    <TestCard
                      key={i}
                      test={test}
                      email={email}
                      hostname={hostname}
                      password={password}
                      tlsRequired={tls}
                      username={username}
                    />
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
export default SMTP
