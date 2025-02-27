import palette from '@/styles/palette'
import {
  Box,
  TextField,
  Button,
  FormGroup,
  FormControlLabel,
  Switch,
  Select,
  MenuItem,
  SelectChangeEvent,
  LinearProgress,
  Card,
} from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { ProfileContext } from '../hisp/context'
import { deleteProfile, fetchProfiles, saveProfile } from '../hisp/actions'
import { useSession } from 'next-auth/react'
import AlertSnackbar from './AlertSnackbar'
import _ from 'lodash'

interface Profile {
  profileName: string
  sutSMTPAddress: string
  sutEmailAddress: string
  sutUsername: string
  sutPassword: string
  useTLS: boolean
  smtpEdgeProfileID: string
}

interface Message {
  text: string
  severity: 'info' | 'error' | 'success' | 'warning'
}

const NEWPROFILENAME = '__new__'
const removeProfilesWithNullProfileName = (profiles: Profile[]) => {
  return profiles?.filter((profile) => profile.profileName !== null)
}
const Profile = () => {
  const {
    setProfileid,
    setProfilename,
    setHostname,
    setEmail,
    setUsername,
    setPassword,
    setTls,
    profileid,
    profilename,
    hostname,
    email,
    password,
    tls,
    username,
  } = useContext(ProfileContext)
  const { data: session, status } = useSession()
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [selectedProfileName, setSelectedProfileName] = useState(NEWPROFILENAME)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<Message | null>(null)

  useEffect(() => {
    async function fetchLoggedInUsersProfiles() {
      setIsLoading(true)
      const loggedInUsersProfiles = await fetchProfiles()
      if (_.isEmpty(loggedInUsersProfiles)) {
        setIsLoading(false)
        window.location.reload()
      }
      const filteredProfiles = removeProfilesWithNullProfileName(loggedInUsersProfiles)
      if (!_.isEmpty(filteredProfiles)) {
        setProfiles(filteredProfiles)
        setSelectedProfileName(filteredProfiles[0].profileName)
        setProfilename(filteredProfiles[0].profileName)
        setHostname(filteredProfiles[0].sutSMTPAddress)
        setEmail(filteredProfiles[0].sutEmailAddress)
        setUsername(filteredProfiles[0].sutUsername)
        setPassword(filteredProfiles[0].sutPassword)
        setTls(filteredProfiles[0].useTLS)
        setProfileid(filteredProfiles[0].smtpEdgeProfileID)
      }
      setIsLoading(false)
    }
    if (status === 'authenticated') {
      fetchLoggedInUsersProfiles()
    }
  }, [status, session])

  const handleSaveProfile = () => {
    setIsLoading(true)
    saveProfile({
      profileid: profileid || '',
      hostname: hostname,
      email: email,
      username: username,
      password: password,
      istls: tls,
      profilename: profilename,
    }).then(async (response) => {
      if (response) {
        setMessage({ text: `${profilename} saved`, severity: 'success' })
        const loggedInUsersProfiles = await fetchProfiles()
        const filteredProfiles = removeProfilesWithNullProfileName(loggedInUsersProfiles)
        setProfiles(filteredProfiles)
        const savedProfile = filteredProfiles.filter((profile) => profile.profileName === profilename).pop()
        if (savedProfile) {
          setSelectedProfileName(savedProfile.profileName)
          setProfilename(savedProfile.profileName)
          setHostname(savedProfile.sutSMTPAddress)
          setEmail(savedProfile.sutEmailAddress)
          setUsername(savedProfile.sutUsername)
          setPassword(savedProfile.sutPassword)
          setTls(savedProfile.useTLS)
          setProfileid(savedProfile.smtpEdgeProfileID)
        }
      } else {
        setMessage({ text: `Failed to save ${profilename}`, severity: 'error' })
        setIsLoading(false)
        window.location.reload()
      }
      setIsLoading(false)
    })
  }

  const handleDeleteProfile = () => {
    setIsLoading(true)
    const profileNameToDelete = selectedProfileName
    deleteProfile(profileNameToDelete).then(async (response) => {
      if (response) {
        setMessage({ text: `${profileNameToDelete} removed`, severity: 'success' })
        const loggedInUsersProfiles = await fetchProfiles()
        const filteredProfiles = removeProfilesWithNullProfileName(loggedInUsersProfiles)
        setProfiles(filteredProfiles || [{ smtpEdgeProfileID: NEWPROFILENAME } as Profile])
        const lastProfile = _.last(filteredProfiles)
        setSelectedProfileName(lastProfile?.profileName || NEWPROFILENAME)
        setProfilename(lastProfile?.profileName || '')
        setHostname(lastProfile?.sutSMTPAddress || '')
        setEmail(lastProfile?.sutEmailAddress || '')
        setUsername(lastProfile?.sutUsername || '')
        setPassword(lastProfile?.sutPassword || '')
        setTls(lastProfile?.useTLS || false)
        setProfileid(lastProfile?.smtpEdgeProfileID || NEWPROFILENAME)
      } else {
        setMessage({ text: `Failed to remove ${profileNameToDelete}`, severity: 'error' })
        setIsLoading(false)
        window.location.reload()
      }
      setIsLoading(false)
    })
  }

  const handleProfileChange = async (event: SelectChangeEvent) => {
    const selectedProfileName = event.target.value
    if (selectedProfileName === NEWPROFILENAME) {
      console.log('New Profile')
      setSelectedProfileName(selectedProfileName)
      setProfilename('')
      setHostname('')
      setEmail('')
      setUsername('')
      setPassword('')
      setTls(false)
      setProfileid('')
      return
    }
    const selectedProfile = profiles.find((profile) => profile.profileName === selectedProfileName)
    if (selectedProfile) {
      setSelectedProfileName(selectedProfile.profileName)
      setProfilename(selectedProfile.profileName)
      setHostname(selectedProfile.sutSMTPAddress)
      setEmail(selectedProfile.sutEmailAddress)
      setUsername(selectedProfile.sutUsername)
      setPassword(selectedProfile.sutPassword)
      setTls(selectedProfile.useTLS)
      setProfileid(selectedProfile.smtpEdgeProfileID)
    }
  }

  return (
    <>
      {isLoading ? (
        <LinearProgress />
      ) : (
        <Card
          component="form"
          onSubmit={handleSaveProfile}
          sx={{ backgroundColor: palette.white, border: '.5px solid #BCBCBC', minHeight: 'fit-content' }}
        >
          {!_.isEmpty(profiles) && (
            <>
              <Select
                variant="filled"
                fullWidth
                title="Select a profile."
                onChange={handleProfileChange}
                value={selectedProfileName}
                sx={{
                  borderRadius: 1,
                  border: `1px solid ${palette.divider}`,
                  pb: 1,
                  '&:hover': {
                    backgroundColor: '#e4f1fe', // Customize hover background color
                  },
                }}
              >
                {profiles.map((profile, index) => {
                  return (
                    <MenuItem key={index} value={profile.profileName}>
                      {profile.profileName}
                    </MenuItem>
                  )
                })}
                <MenuItem key={-1} value={NEWPROFILENAME}>
                  New Profile
                </MenuItem>
              </Select>
            </>
          )}
          <Box display={'flex'} flexDirection={'column'} p={2}>
            <Box display={'flex'} flexDirection={'column'} justifyContent={'space-between'} pt={3} gap={3}>
              <TextField
                fullWidth
                id="outlined-vendor-hostname"
                label="Vendor Hostname/IP"
                helperText="Hostname/IP of the vendor SMTP sysem"
                value={hostname || ''}
                size="small"
                onChange={(e) => setHostname(e.target.value)}
              />
              <TextField
                fullWidth
                id="vendor-email"
                label="Vendor Direct Email Address"
                helperText="Email of the vendor SMTP system"
                value={email || ''}
                size="small"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>
            <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} pt={3} gap={2}>
              <TextField
                fullWidth
                id="vendor-username"
                label="Vendor Username"
                helperText="Username for the vendor SMTP system"
                value={username || ''}
                size="small"
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                fullWidth
                id="vendor-password"
                label="Vendor Password"
                helperText="Password for the vendor SMTP system"
                type="password"
                value={password || ''}
                size="small"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Box>
            <FormGroup sx={{ pt: 1 }}>
              <FormControlLabel
                control={<Switch color="secondary" checked={tls} onChange={(e) => setTls(e.target.checked)} />}
                label="TLS REQUIRED"
                name="tlsRequired"
              />
            </FormGroup>
          </Box>

          <Box display={'flex'} flexDirection={'column'} justifyContent={'space-between'} p={2} gap={4}>
            {status === 'authenticated' && (
              <>
                <TextField
                  fullWidth
                  id="select-profile"
                  label="Profile Name"
                  value={profilename}
                  required
                  size="small"
                  onChange={(e) => setProfilename(e.target.value)}
                />
                <Box display={'flex'} justifyContent="space-between" component="span">
                  <Button variant="outlined" sx={{ color: palette.primary }} type="submit">
                    Save
                  </Button>
                  <Button
                    variant="text"
                    sx={{ color: palette.errorDark }}
                    onClick={() => handleDeleteProfile()}
                    disabled={profilename === '' || profilename !== selectedProfileName}
                  >
                    Remove
                  </Button>
                </Box>
              </>
            )}
          </Box>
          {!_.isEmpty(message) && (
            <AlertSnackbar
              message={message.text}
              severity={message.severity}
              open={true}
              onClose={() => setMessage(null)}
            />
          )}
        </Card>
      )}
    </>
  )
}
export default Profile
