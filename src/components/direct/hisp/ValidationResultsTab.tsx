import * as React from 'react'
import {
  Box,
  Typography,
  Container,
  LinearProgress,
  AppBar,
  IconButton,
  Toolbar,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import ProfilesCard from './ProfilesCard'
import { useSession } from 'next-auth/react'
import PageAlertBox from '@/components/shared/PageAlertBox'
import { useEffect } from 'react'
import { fetchProfileReport, fetchProfiles } from './actions'
import CloseIcon from '@mui/icons-material/Close'
import Profile from '../shared/Profile'
import _ from 'lodash'

const removeProfilesWithNullProfileName = (profiles: Profile[]) => {
  return profiles.filter((profile) => profile.profileName !== null)
}

const ValidationResults = () => {
  const { data: session, status } = useSession()
  const [profiles, setProfiles] = React.useState<Profile[]>([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [profileReport, setProfileReport] = React.useState<any>([])
  const [profileName, setProfileName] = React.useState('')
  const [open, setOpen] = React.useState(false)

  useEffect(() => {
    async function fetchLoggedInUsersProfiles() {
      setIsLoading(true)
      const loggedInUsersProfiles = await fetchProfiles()
      const filteredProfiles = removeProfilesWithNullProfileName(loggedInUsersProfiles)
      if (!_.isEmpty(filteredProfiles)) {
        setProfiles(filteredProfiles)
      }
      setIsLoading(false)
    }
    if (status === 'authenticated') {
      fetchLoggedInUsersProfiles()
    }
  }, [status, session])

  const handleGetProfileReport = async (profileName: string) => {
    setIsLoading(true)
    const profileReport = await fetchProfileReport(profileName)
    setProfileReport(profileReport)
    setProfileName(profileName)
    setOpen(true)
    setIsLoading(false)
  }

  const handleCloseProfileReport = () => {
    setProfileName('')
    setProfileReport([])
    setOpen(false)
  }

  const convertDate = (date: number) => {
    const dateInt = _.toNumber(date)
    return new Date(dateInt).toLocaleString()
  }

  return (
    <>
      {status !== 'authenticated' ? (
        <Container sx={{ pt: 4 }}>
          <PageAlertBox message="You must be logged in to see your profiles." />
        </Container>
      ) : (
        <Container>
          {isLoading ? (
            <LinearProgress />
          ) : (
            <Box
              sx={{
                padding: '32px',
                minHeight: 'auto',
              }}
            >
              {open && (
                <Box gap={4} display={'flex'} flexDirection={'row'} flexWrap={'wrap'}>
                  <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                      <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        Validation Report for {profileName}
                      </Typography>
                      <IconButton
                        edge="start"
                        color="inherit"
                        onClick={() => handleCloseProfileReport()}
                        aria-label="close"
                      >
                        <CloseIcon />
                      </IconButton>
                    </Toolbar>
                  </AppBar>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Test Case</TableCell>
                          <TableCell align="center">Timestamp</TableCell>
                          <TableCell align="center">Result</TableCell>
                        </TableRow>
                      </TableHead>
                      {!_.isEmpty(profileReport) ? (
                        <TableBody>
                          {profileReport.map((row: any) => (
                            <TableRow
                              key={row.smtpEdgeLogID}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                              <TableCell component="th" scope="row">
                                {row.testCaseNumber}
                              </TableCell>
                              <TableCell align="center">{convertDate(row.timestamp)}</TableCell>
                              <TableCell align="center">
                                {row.criteriaMet ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      ) : (
                        <TableBody>
                          <TableRow>
                            <TableCell colSpan={3} align="center">
                              <Typography variant="h6">No validation results found for this profile.</Typography>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      )}
                    </Table>
                  </TableContainer>
                </Box>
              )}
              {!open && (
                <>
                  <Typography variant="h4" sx={{ mb: 4 }}>
                    Below are your saved profiles. Select one to see the validation results.
                  </Typography>
                  <Box gap={4} display={'flex'} flexDirection={'row'} flexWrap={'wrap'}>
                    {profiles.map((profile, index) => {
                      return (
                        <ProfilesCard
                          key={index}
                          emailAddress={profile.sutEmailAddress}
                          header={profile.profileName}
                          smtpAddress={profile.sutSMTPAddress}
                          getProfileReport={handleGetProfileReport}
                        />
                      )
                    })}
                  </Box>
                </>
              )}
            </Box>
          )}
        </Container>
      )}
    </>
  )
}

export default ValidationResults
