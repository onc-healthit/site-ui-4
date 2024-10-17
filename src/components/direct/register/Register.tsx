'use client'
import Link from 'next/link'
import BannerBox from '../../shared/BannerBox'
import styles from '../../shared/styles.module.css'
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  LinearProgress,
  Typography,
} from '@mui/material'
import AddBoxIcon from '@mui/icons-material/AddBox'
import DeleteIcon from '@mui/icons-material/Delete'
import _ from 'lodash'
import { MutableRefObject, useEffect, useRef, useState } from 'react'
import { useSession } from 'next-auth/react'
import ErrorDisplayCard from '@/components/c-cda/validation/results/ErrorDisplay'
import AlertSnackbar from '../shared/AlertSnackbar'
import PageAlertBox from '../../shared/PageAlertBox'
import eventTrack from '@/services/analytics'

const Register = () => {
  const [selectedDirectEmailAddress, setSelectedDirectEmailAddress] = useState('')
  const [directEmailAddressList, setDirectEmailAddressList] = useState<string[]>([])
  const [contactEmailAdressList, setContactEmailAddressList] = useState<string[]>([])
  const [directEmailFormatError, setDirectEmailFormatError] = useState(false)
  const [contactEmailFormatError, setContactEmailFormatError] = useState(false)
  const [isFetchingLoggedInUsersDirectEmailAdresses, setIsFetchingLoggedInUsersDirectEmailAdresses] = useState(false)
  const [isAddingDirectAddress, setIsAddingDirectAddress] = useState(false)
  const [isAddingContactAddress, setIsAddingContactAddress] = useState(false)
  const [isDeletingDirectEmailGroup, setIsDeletingDirectEmailGroup] = useState(false)
  const [isDeletingContactAddress, setIsDeletingContactAddress] = useState(false)
  const [isFetchingContactAddresses, setIsFetchingContactAddresses] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const directEmailAddressRef = useRef() as MutableRefObject<HTMLInputElement>
  const contactEmailAddressRef = useRef() as MutableRefObject<HTMLInputElement>
  const { data: session, status } = useSession()

  useEffect(() => {
    async function fetchLoggedInUsersDirectEmailAdresses() {
      const response = await fetch('/api/direct/register', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await response.json()
      if (!response.ok) {
        setErrorMessage(data.error.message)
        throw new Error(`Error fetching direct email addresseses for logged in user: ${data.error.message}`)
      }
      setDirectEmailAddressList(data)
      const contactList = getContactEmailAddressesListForSelectedDirectAddress(data[0])
      setContactEmailAddressList(await contactList)
      setSelectedDirectEmailAddress(data[0])
    }
    if (status === 'authenticated') {
      setIsFetchingLoggedInUsersDirectEmailAdresses(true)
      fetchLoggedInUsersDirectEmailAdresses().then(() => {
        setIsFetchingLoggedInUsersDirectEmailAdresses(false)
      })
    }
  }, [session, status])

  const addDirectAddress = async () => {
    const directEmailAddressToAdd = (directEmailAddressRef.current as unknown as HTMLInputElement)?.value || ''
    directEmailAddressRef.current.value = ''
    setIsAddingDirectAddress(true)
    const response = await fetch('/api/direct/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ directEmailAddress: directEmailAddressToAdd }),
    })
    const data = await response.json()
    if (!response.ok) {
      setIsAddingDirectAddress(false)
      setErrorMessage(data.error.message)
      throw new Error(`Error adding direct address ${directEmailAddressToAdd}: ${data.error.message}`)
    }
    setDirectEmailAddressList([...directEmailAddressList, directEmailAddressToAdd])
    const contactList = getContactEmailAddressesListForSelectedDirectAddress(directEmailAddressToAdd)
    setContactEmailAddressList(await contactList)
    setSelectedDirectEmailAddress(directEmailAddressToAdd)
    setIsAddingDirectAddress(false)
    setSuccessMessage('Direct email address added.')
    eventTrack('Add Direct Address', 'Register Direct Email', 'User added direct address')
  }

  const addContactAddress = async () => {
    const contactEmailAddressToAdd = (contactEmailAddressRef.current as unknown as HTMLInputElement)?.value || ''
    contactEmailAddressRef.current.value = ''
    setIsAddingContactAddress(true)
    const response = await fetch(`/api/direct/register/${selectedDirectEmailAddress}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ contactEmailAddressToAdd }),
    })
    const data = await response.json()
    if (!response.ok) {
      setIsAddingContactAddress(false)
      setErrorMessage(data.error.message)
      throw new Error(`Error adding contact address ${contactEmailAddressToAdd}: ${data.error.message}`)
    }
    if (data === true) {
      setContactEmailAddressList([...contactEmailAdressList, contactEmailAddressToAdd])
      setIsAddingContactAddress(false)
      setSuccessMessage(`Contact email address added to ${selectedDirectEmailAddress}.`)
    }
    eventTrack('Add Contact Address', 'Register Direct Email', 'User added contact address')
  }

  const deleteDirectEmailGroup = async () => {
    setIsDeletingDirectEmailGroup(true)
    const response = await fetch(`/api/direct/register/${selectedDirectEmailAddress}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    if (!response.ok) {
      setIsDeletingDirectEmailGroup(false)
      setErrorMessage(data.error.message)
      throw new Error(`Deleting direct group ${selectedDirectEmailAddress}: ${data.error.message}`)
    }
    if (data === true) {
      setDirectEmailAddressList(directEmailAddressList.filter((x) => x !== selectedDirectEmailAddress))
      setContactEmailAddressList([])
      if (!_.isEmpty(directEmailAddressList)) {
        setSelectedDirectEmailAddress(directEmailAddressList[0])
      }
    }
    setIsDeletingDirectEmailGroup(false)
    setSuccessMessage('Direct email address group deleted.')
    eventTrack('Delete Direct Email Group', 'Register Direct Email', 'User clicked delete group')
  }

  const deleteContactAddress = async (contactEmailAddress: string) => {
    setIsDeletingContactAddress(true)
    const response = await fetch(`/api/direct/register/${selectedDirectEmailAddress}?contact=${contactEmailAddress}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    if (!response.ok) {
      setIsDeletingContactAddress(false)
      setErrorMessage(data.error.message)
      throw new Error(`Error deleting contact email addresses ${contactEmailAddress}: ${data.error.message}`)
    }
    if (data === true) {
      setContactEmailAddressList(contactEmailAdressList.filter((x) => x !== contactEmailAddress))
    }
    setIsDeletingContactAddress(false)
    setSuccessMessage(`Contact email address deleted from ${selectedDirectEmailAddress}.`)
    eventTrack('Delete Contact Address', 'Register Direct Email', 'User clicked delete contact cddress')
  }

  const handleDirectEmailAddressChange = async (event: SelectChangeEvent) => {
    const selectedDirectEmailAddress = event.target.value as string
    setSelectedDirectEmailAddress(selectedDirectEmailAddress)
    setIsFetchingContactAddresses(true)
    const contactList = await getContactEmailAddressesListForSelectedDirectAddress(selectedDirectEmailAddress)
    setContactEmailAddressList(contactList)
    setIsFetchingContactAddresses(false)
  }

  const getContactEmailAddressesListForSelectedDirectAddress = async (directEmailAddress: string) => {
    const response = await fetch(`/api/direct/register/${directEmailAddress}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    if (!response.ok) {
      setErrorMessage(data.error.message)
      throw new Error(`Error fetching contact email addresses ${directEmailAddress}: ${data.error.message}`)
    }
    return data || []
  }

  const validateDirectEmailFormat: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    if (!_.isEmpty(e.target.value)) {
      if (e.target.validity.valid) {
        setDirectEmailFormatError(false)
      } else {
        setDirectEmailFormatError(true)
      }
    } else {
      setDirectEmailFormatError(false)
    }
  }

  const validateContactEmailFormat: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    if (!_.isEmpty(e.target.value)) {
      if (e.target.validity.valid) {
        setContactEmailFormatError(false)
      } else {
        setContactEmailFormatError(true)
      }
    } else {
      setContactEmailFormatError(false)
    }
  }

  return (
    <>
      {/* Global Header */}
      <BannerBox
        breadcrumbs={[
          <Link color="inherit" href="/direct" key="1" className={styles.link}>
            Direct
          </Link>,
          <Link color="inherit" href="/direct/register" key="2" className={styles.link}>
            Register
          </Link>,
        ]}
        heading={'Register a Direct Email Address'}
        description={
          <>
            Enter your Direct (From) email address, this will be used to send a validation report to a normal email
            account. The validation reports are sent back to the email account for review by the user during testing.
            This panel allows the user to register their contact email account and link one or more Direct (From)
            account to it. Direct messages sent from a non-registered Direct (From) address will not be validated nor
            reported on.
          </>
        }
      />

      {/* Main Content */}
      {status !== 'authenticated' ? (
        <Container sx={{ pt: 4 }}>
          <PageAlertBox message="You must be logged in to manage your Direct Email Groups." />
        </Container>
      ) : (
        <>
          {isFetchingLoggedInUsersDirectEmailAdresses ? (
            <LinearProgress />
          ) : (
            <Container sx={{ pt: 4 }}>
              <Grid container spacing={2}>
                {isAddingDirectAddress || isDeletingDirectEmailGroup ? (
                  <LinearProgress />
                ) : (
                  <Grid item xs={6}>
                    <>
                      <Box sx={{ pb: 2 }}>
                        <Typography variant="h4" component={'h2'} sx={{ pb: 4, pl: 0 }}>
                          Add a valid Direct email address to get started.
                        </Typography>
                        <TextField
                          id="outlined-direct-email-address"
                          //label="Enter a valid Direct Email Address"
                          fullWidth
                          required
                          inputRef={directEmailAddressRef}
                          onChange={validateDirectEmailFormat}
                          error={directEmailFormatError}
                          helperText={directEmailFormatError ? 'Please enter a valid email' : ''}
                          InputProps={{
                            type: 'email',
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  edge="end"
                                  color="primary"
                                  onClick={() => addDirectAddress()}
                                  disabled={directEmailFormatError || directEmailAddressRef.current?.value === ''}
                                  title="Add a Direct email address to manage its contacts."
                                >
                                  <AddBoxIcon fontSize="large" />
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Box>
                      {!_.isEmpty(directEmailAddressList) && (
                        <Box>
                          <Select
                            value={selectedDirectEmailAddress}
                            onChange={handleDirectEmailAddressChange}
                            fullWidth
                            title="Select a Direct email address to manage its contacts."
                          >
                            {directEmailAddressList.map((x, index) => {
                              return (
                                <MenuItem key={index} value={x}>
                                  {x}
                                </MenuItem>
                              )
                            })}
                          </Select>
                          <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} sx={{ mt: 2 }}>
                            <Button
                              variant="contained"
                              color="error"
                              //sx={{ color: '#FF5252', borderColor: '#FF5252' }}
                              onClick={deleteDirectEmailGroup}
                              title="Delete the selected Direct email address."
                            >
                              DELETE SELECTED EMAIL GROUP
                            </Button>
                          </Box>
                        </Box>
                      )}
                    </>
                  </Grid>
                )}
                {!_.isEmpty(directEmailAddressList) && (
                  <>
                    {isAddingContactAddress || isDeletingContactAddress || isFetchingContactAddresses ? (
                      <LinearProgress />
                    ) : (
                      <Grid item xs={6}>
                        <>
                          <Box sx={{ pb: 2 }}>
                            <Typography variant="h4" component={'h2'} sx={{ pb: 4, pl: 0 }}>
                              Manage contacts for selected email
                            </Typography>
                            <TextField
                              id="outlined-contact-email-address"
                              //label={`Enter a contact email address for ${selectedDirectEmailAddress}`}
                              fullWidth
                              inputRef={contactEmailAddressRef}
                              required
                              onChange={validateContactEmailFormat}
                              error={contactEmailFormatError}
                              helperText={contactEmailFormatError ? 'Please enter a valid email' : ''}
                              InputProps={{
                                type: 'email',
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      edge="end"
                                      color="primary"
                                      onClick={() => addContactAddress()}
                                      title="Add a contact email address for the selected Direct email address."
                                      disabled={contactEmailFormatError || contactEmailAddressRef.current?.value === ''}
                                    >
                                      <AddBoxIcon fontSize="large" />
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </Box>
                          <Box>
                            {!_.isEmpty(contactEmailAdressList) && (
                              <List>
                                {contactEmailAdressList.map((x) => {
                                  return (
                                    <ListItem key={x}>
                                      <ListItemText primary={x} />
                                      <ListItemSecondaryAction>
                                        <IconButton
                                          edge="end"
                                          aria-label="delete"
                                          onClick={() => deleteContactAddress(x)}
                                          disabled={contactEmailFormatError}
                                          color="error"
                                          title="Delete this contact email address."
                                        >
                                          <DeleteIcon />
                                        </IconButton>
                                      </ListItemSecondaryAction>
                                    </ListItem>
                                  )
                                })}
                              </List>
                            )}
                          </Box>
                        </>
                      </Grid>
                    )}
                  </>
                )}
              </Grid>
              {!_.isEmpty(errorMessage) && (
                <ErrorDisplayCard
                  open={true}
                  handleClose={() => setErrorMessage('')}
                  response={{ error: errorMessage }}
                />
              )}
              {!_.isEmpty(successMessage) && (
                <AlertSnackbar
                  message={successMessage}
                  severity="success"
                  open={true}
                  onClose={() => setSuccessMessage('')}
                />
              )}
            </Container>
          )}
        </>
      )}
    </>
  )
}

export default Register
