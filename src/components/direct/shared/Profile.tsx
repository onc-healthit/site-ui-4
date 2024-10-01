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

const NEWPROFILENAME = '__new__'
const removeProfilesWithNullProfileName = (profiles: Profile[]) => {
  return profiles.filter((profile) => profile.profileName !== null)
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
  const [message, setMessage] = useState('')

  useEffect(() => {
    async function fetchLoggedInUsersProfiles() {
      setIsLoading(true)
      const loggedInUsersProfiles = await fetchProfiles()
      const filteredProiles = removeProfilesWithNullProfileName(loggedInUsersProfiles)
      if (!_.isEmpty(filteredProiles)) {
        setProfiles(filteredProiles)
        setSelectedProfileName(filteredProiles[0].profileName)
        setProfilename(filteredProiles[0].profileName)
        setHostname(filteredProiles[0].sutSMTPAddress)
        setEmail(filteredProiles[0].sutEmailAddress)
        setUsername(filteredProiles[0].sutUsername)
        setPassword(filteredProiles[0].sutPassword)
        setTls(filteredProiles[0].useTLS)
        setProfileid(filteredProiles[0].smtpEdgeProfileID)
      }
      setIsLoading(false)
      return filteredProiles
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
      setMessage(`${profilename} saved`)
      const loggedInUsersProfiles = await fetchProfiles()
      const filteredProiles = removeProfilesWithNullProfileName(loggedInUsersProfiles)
      setProfiles(filteredProiles)
      if (selectedProfileName === NEWPROFILENAME) {
        const lastProfile = _.last(filteredProiles)
        console.log(`DEBUG: lastProfile: ${JSON.stringify(lastProfile)}`)
        if (lastProfile) {
          setSelectedProfileName(lastProfile.profileName)
          setProfilename(lastProfile.profileName)
          setHostname(lastProfile.sutSMTPAddress)
          setEmail(lastProfile.sutEmailAddress)
          setUsername(lastProfile.sutUsername)
          setPassword(lastProfile.sutPassword)
          setTls(lastProfile.useTLS)
          setProfileid(lastProfile.smtpEdgeProfileID)
        }
      }
      setIsLoading(false)
      //handleProfileChange({ target: { value: selectedProfile.smtpEdgeProfileID } } as SelectChangeEvent)
    })
  }

  const handleDeleteProfile = () => {
    setIsLoading(true)
    const profileNameToDelete = selectedProfileName
    deleteProfile(profileNameToDelete).then(async (response) => {
      setMessage(`${profilename} deleted`)
      const loggedInUsersProfiles = await fetchProfiles()
      const filteredProfiles = removeProfilesWithNullProfileName(loggedInUsersProfiles)
      setProfiles(filteredProfiles || [{ smtpEdgeProfileID: NEWPROFILENAME } as Profile])
      const lastProfile = _.last(filteredProfiles)
      console.log(`DEBUG: lastProfile: ${JSON.stringify(lastProfile)}`)

      setSelectedProfileName(lastProfile?.smtpEdgeProfileID || NEWPROFILENAME)
      setProfilename(lastProfile?.profileName || '')
      setHostname(lastProfile?.sutSMTPAddress || '')
      setEmail(lastProfile?.sutEmailAddress || '')
      setUsername(lastProfile?.sutUsername || '')
      setPassword(lastProfile?.sutPassword || '')
      setTls(lastProfile?.useTLS || false)
      setProfileid(lastProfile?.smtpEdgeProfileID || NEWPROFILENAME)

      setIsLoading(false)
      //handleProfileChange({ target: { value: selectedProfile.smtpEdgeProfileID } } as SelectChangeEvent)
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
        <Box component="form" sx={{ backgroundColor: palette.white }}>
          {!_.isEmpty(profiles) && (
            <Select fullWidth title="Select a profile." onChange={handleProfileChange} value={selectedProfileName}>
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
          )}
          <Box display={'flex'} flexDirection={'column'} gap={4} p={2}>
            <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} pt={2} gap={2}>
              <TextField
                fullWidth
                id="outlined-vendor-hostname"
                label="Vendor Hostname/IP"
                helperText="Hostname/IP of the vendor SMTP sysem"
                value={hostname || ''}
                required
                onChange={(e) => setHostname(e.target.value)}
              />
              <TextField
                fullWidth
                id="vendor-email"
                label="Vendor Direct Email Address"
                helperText="Email of the vendor SMTP system"
                value={email || ''}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>
            <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} gap={2}>
              <TextField
                fullWidth
                id="vendor-username"
                label="Vendor Username"
                helperText="Username for the vendor SMTP system"
                value={username || ''}
                required
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                fullWidth
                id="vendor-password"
                label="Vendor Password"
                helperText="Password for the vendor SMTP system"
                type="password"
                value={password || ''}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </Box>
            <FormGroup sx={{ width: '50%' }}>
              <FormControlLabel
                control={
                  <Switch color="secondary" defaultChecked value={tls} onChange={(e) => setTls(e.target.checked)} />
                }
                label="TLS REQUIRED"
                name="tlsRequired"
              />
            </FormGroup>
          </Box>

          <Box display={'flex'} flexDirection={'column'} justifyContent={'space-between'} p={2}>
            {status === 'authenticated' && (
              <>
                <TextField
                  fullWidth
                  id="select-profile"
                  label="Profile Name"
                  value={profilename}
                  required
                  onChange={(e) => setProfilename(e.target.value)}
                />
                <Box display={'flex'} justifyContent="space-between" component="span" sx={{ pt: 3 }}>
                  <Button variant="outlined" sx={{ color: palette.primary }} onClick={() => handleSaveProfile()}>
                    Save
                  </Button>
                  <Button variant="text" sx={{ color: palette.errorDark }} onClick={() => handleDeleteProfile()}>
                    Remove
                  </Button>
                </Box>
              </>
            )}
          </Box>
          {!_.isEmpty(message) && (
            <AlertSnackbar message={message} severity="success" open={true} onClose={() => setMessage('')} />
          )}
        </Box>
      )}
    </>
  )
}
export default Profile
