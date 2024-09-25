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
} from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { ProfileContext } from '../hisp/context'
import { fetchProfiles, saveProfile } from '../hisp/actions'
import { useSession } from 'next-auth/react'
import AlertSnackbar from './AlertSnackbar'
import _ from 'lodash'

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
  interface Profile {
    profileName: string
    sutSMTPAddress: string
    sutEmailAddress: string
    sutUsername: string
    sutPassword: string
    useTLS: boolean
    smtpEdgeProfileID: string
  }

  const [profiles, setProfiles] = useState<Profile[]>([])
  const [selectedProfileIndex, setSelectedProfileIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    async function fetchLoggedInUsersProfiles() {
      const loggedInUsersProfiles = await fetchProfiles()
      const filteredProiles = loggedInUsersProfiles.filter(
        (profile: { profileName: null }) => profile.profileName !== null
      )
      if (!_.isEmpty(filteredProiles)) {
        setProfiles(filteredProiles)
        setSelectedProfileIndex(0)
        setProfilename(filteredProiles[0].profileName)
        setHostname(filteredProiles[0].sutSMTPAddress)
        setEmail(filteredProiles[0].sutEmailAddress)
        setUsername(filteredProiles[0].sutUsername)
        setPassword(filteredProiles[0].sutPassword)
        setTls(filteredProiles[0].useTLS)
        setProfileid(filteredProiles[0].smtpEdgeProfileID)
      }
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
      setIsLoading(false)
      setMessage('Profile saved successfully.')
      const loggedInUsersProfiles = await fetchProfiles()
      const filteredProiles = loggedInUsersProfiles.filter(
        (profile: { profileName: null }) => profile.profileName !== null
      )
      setProfiles(filteredProiles)
      setSelectedProfileIndex(profiles.length - 1)
      setProfilename(filteredProiles[filteredProiles.length - 1].profileName)
      setHostname(filteredProiles[filteredProiles.length - 1].sutSMTPAddress)
      setEmail(filteredProiles[filteredProiles.length - 1].sutEmailAddress)
      setUsername(filteredProiles[filteredProiles.length - 1].sutUsername)
      setPassword(filteredProiles[filteredProiles.length - 1].sutPassword)
      setTls(filteredProiles[filteredProiles.length - 1].useTLS)
      setProfileid(filteredProiles[filteredProiles.length - 1].smtpEdgeProfileID)
    })
  }

  const handleProfileChange = async (event: SelectChangeEvent) => {
    const selectedProfileIndex = _.toNumber(event.target.value)
    if (selectedProfileIndex === -1) {
      setSelectedProfileIndex(selectedProfileIndex)
      setProfilename('')
      setHostname('')
      setEmail('')
      setUsername('')
      setPassword('')
      setTls(false)
      setProfileid('')
      return
    }
    setSelectedProfileIndex(selectedProfileIndex)
    setProfilename(profiles[selectedProfileIndex].profileName)
    setHostname(profiles[selectedProfileIndex].sutSMTPAddress)
    setEmail(profiles[selectedProfileIndex].sutEmailAddress)
    setUsername(profiles[selectedProfileIndex].sutUsername)
    setPassword(profiles[selectedProfileIndex].sutPassword)
    setTls(profiles[selectedProfileIndex].useTLS)
    setProfileid(profiles[selectedProfileIndex].smtpEdgeProfileID)
  }

  return (
    <Box component="form" sx={{ backgroundColor: palette.white }}>
      {profiles.length > 0 && (
        <Select
          fullWidth
          title="Select a profile."
          onChange={handleProfileChange}
          value={_.toString(selectedProfileIndex)}
        >
          {profiles.map((profile, index) => {
            return (
              <MenuItem key={index} value={index}>
                {profile.profileName}
              </MenuItem>
            )
          })}
          <MenuItem key={-1} value={-1}>
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
            control={<Switch color="secondary" defaultChecked value={tls} onChange={(e) => setTls(e.target.checked)} />}
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
              <Button variant="text" sx={{ color: palette.errorDark }}>
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
  )
}
export default Profile
