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
} from '@mui/material'
import AddBoxIcon from '@mui/icons-material/AddBox'
import DeleteIcon from '@mui/icons-material/Delete'
import palette from '@/styles/palette'
import _ from 'lodash'
import { useEffect, useRef, useState } from 'react'
import { useSession } from 'next-auth/react'

const Register = () => {
  const [selectedDirectEmailAddress, setSelectedDirectEmailAddress] = useState('')
  const [directEmailAddressList, setDirectEmailAddressList] = useState<string[]>([])
  const [contactEmailAdressList, setContactEmailAddressList] = useState<string[]>([])
  const directEmailAddressRef = useRef(null)
  const contactEmailAddressRef = useRef(null)
  const { data: session, status } = useSession()

  useEffect(() => {
    async function fetchLoggedInUsersDirectEmailAdresses() {
      const response = await fetch('http://localhost:3000/api/direct/register', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await response.json()
      setDirectEmailAddressList(data)
      const contactList = getContactEmailAddressesListForSelectedDirectAddress(data[0])
      setContactEmailAddressList(await contactList)
      setSelectedDirectEmailAddress(data[0])
    }
    if (status === 'authenticated') {
      fetchLoggedInUsersDirectEmailAdresses()
    }
  }, [session, status])

  const addDirectAddress = async () => {
    const directEmailAddressToAdd = (directEmailAddressRef.current as unknown as HTMLInputElement)?.value || ''
    const response = await fetch('http://localhost:3000/api/direct/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ directEmailAddressToAdd }),
    })
    const data = await response.json()
    setDirectEmailAddressList([...directEmailAddressList, directEmailAddressToAdd])
    const contactList = getContactEmailAddressesListForSelectedDirectAddress(directEmailAddressToAdd)
    setContactEmailAddressList(await contactList)
    setSelectedDirectEmailAddress(directEmailAddressToAdd)
    directEmailAddressRef.current.value = null
  }

  const addContactAddress = async () => {
    const contactEmailAddressToAdd = (contactEmailAddressRef.current as unknown as HTMLInputElement)?.value || ''
    const response = await fetch(`http://localhost:3000/api/direct/register/${selectedDirectEmailAddress}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ contactEmailAddressToAdd }),
    })
    const data = await response.json()
    if (data === true) {
      setContactEmailAddressList([...contactEmailAdressList, contactEmailAddressToAdd])
      contactEmailAddressRef.current.value = null
    }
  }

  const deleteDirectEmailGroup = async () => {
    const response = await fetch(`http://localhost:3000/api/direct/register/${selectedDirectEmailAddress}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    if (data === true) {
      setDirectEmailAddressList(directEmailAddressList.filter((x) => x !== selectedDirectEmailAddress))
      setContactEmailAddressList([])
      setSelectedDirectEmailAddress('')
    }
  }

  const deleteContactAddress = async (contactEmailAddress: string) => {
    console.log(`Delete Contact Email Address: ${contactEmailAddress}`)
    const response = await fetch(
      `http://localhost:3000/api/direct/register/${selectedDirectEmailAddress}?contact=${contactEmailAddress}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    const data = await response.json()
    if (data === true) {
      setContactEmailAddressList(contactEmailAdressList.filter((x) => x !== contactEmailAddress))
    }
  }

  const handleDirectEmailAddressChange = async (event: SelectChangeEvent) => {
    const selectedDirectEmailAddress = event.target.value as string
    setSelectedDirectEmailAddress(selectedDirectEmailAddress)
    const contactList = await getContactEmailAddressesListForSelectedDirectAddress(selectedDirectEmailAddress)
    setContactEmailAddressList(contactList)
  }

  const getContactEmailAddressesListForSelectedDirectAddress = async (directEmailAddress: string) => {
    const response = await fetch(`http://localhost:3000/api/direct/register/${directEmailAddress}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    return data || []
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
      <Container sx={{ pt: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <>
              <Box sx={{ pb: 2 }}>
                <TextField
                  id="outlined-direct-email-address"
                  label="Enter a valid Direct Email Address"
                  fullWidth
                  //helperText="Direct messages will be accepted for validation only when the Direct (From) address is registered here."
                  required
                  type="email"
                  inputRef={directEmailAddressRef}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton edge="end" color="primary" onClick={() => addDirectAddress()}>
                          <AddBoxIcon fontSize="large" />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              {!_.isEmpty(directEmailAddressList) && (
                <Box>
                  <Select value={selectedDirectEmailAddress} onChange={handleDirectEmailAddressChange} fullWidth>
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
                      variant="outlined"
                      sx={{ color: palette.errorDark, borderColor: palette.errorDark }}
                      onClick={deleteDirectEmailGroup}
                    >
                      DELETE {selectedDirectEmailAddress}
                    </Button>
                  </Box>
                </Box>
              )}
            </>
          </Grid>
          {!_.isEmpty(directEmailAddressList) && (
            <Grid item xs={6}>
              <>
                <Box sx={{ pb: 2 }}>
                  <TextField
                    id="outlined-contact-email-address"
                    label="Contact Email Address"
                    type="email"
                    fullWidth
                    inputRef={contactEmailAddressRef}
                    required
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton edge="end" color="primary" onClick={() => addContactAddress()}>
                            <AddBoxIcon fontSize="large" />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
                <Box>
                  {/* <Typography variant="h3" component={'h1'}>
                    Manage Contact Email Addresses for {selectedDirectEmailAddress}
                  </Typography> */}
                  {!_.isEmpty(contactEmailAdressList) && (
                    <List>
                      {contactEmailAdressList.map((x) => {
                        return (
                          <ListItem key={x}>
                            <ListItemText primary={x} />
                            <ListItemSecondaryAction>
                              <IconButton edge="end" aria-label="delete" onClick={() => deleteContactAddress(x)}>
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
        </Grid>
      </Container>
    </>
  )
}

export default Register
