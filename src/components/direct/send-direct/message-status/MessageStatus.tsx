import React, { useEffect, useState } from 'react'
import _ from 'lodash'
import {
  Container,
  Box,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
  Switch,
  Typography,
  Chip,
  LinearProgress,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useSession } from 'next-auth/react'
import PageAlertBox from '@/components/shared/PageAlertBox'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import ErrorDisplayCard from '@/components/c-cda/validation/results/ErrorDisplay'
import { format } from 'date-fns'
import Link from 'next/link'
interface LogEntry {
  logID: string
  incoming: boolean
  timestamp: string
  status: string
  origDate: string
  fromLine: string[]
  toLine: string[]
  messageId: string
  originalMessageId: string
  mimeVersion: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  received: any[]
  replyTo: string[]
  subject: string
  contentType: string | null
  contentDisposition: string
  mdn: boolean
  b_messageID: string
  c_time: string
  d_status: string
  a_from: string
}
interface MessageData {
  type: string
  directAddress: string
  logList: LogEntry[]
}
const MessageStatusDashboard = () => {
  const { status } = useSession()
  const [showOutgoing, setShowOutgoing] = useState(true)
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null)
  const [messageData, setMessageData] = useState<MessageData[]>([])
  const [isFetching, setIsFetching] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  useEffect(() => {
    console.log('status', status)

    if (status === 'authenticated') {
      setIsFetching(true)
      fetchOutgoing().then(() => setIsFetching(false))
    }
  }, [status])

  const handleLabelChange = (label: string) => {
    setSelectedLabel((prevLabel) => (prevLabel === label ? null : label))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'MDN_RECEIVED':
        return 'success'
      case 'TIMEOUT':
        return 'error'
      case 'SUCCESS':
        return 'success'
      case 'ERROR':
        return 'error'
      default:
        return 'primary'
    }
  }
  const columns: GridColDef[] = [
    { field: 'a_from', headerName: showOutgoing ? 'From' : 'To', minWidth: 200, flex: 0.5 },
    {
      field: 'b_messageID',
      headerName: 'Message ID',
      minWidth: 400,
      flex: 1,
      renderCell: (params) => (
        <>
          {!showOutgoing ? (
            <Link href="" passHref>
              {params.value}
            </Link>
          ) : (
            params.value
          )}
        </>
      ),
    },
    {
      field: 'c_time',
      headerName: 'Time',
      minWidth: 200,
      flex: 0.5,
      valueFormatter: (value) => (!_.isEmpty(value) ? format(new Date(value), 'MMM d, yyyy hh:mm:ss a XXX') : value),
      sortComparator: (v1, v2) => new Date(v1).getTime() - new Date(v2).getTime(),
    },
    {
      field: 'd_status',
      headerName: 'Status',
      minWidth: 200,
      flex: 0.5,
      renderCell: (params) => (
        <>
          {params.value === 'MDN_RECEIVED' ? (
            <Button href="" variant="outlined" color={getStatusColor(params.value)}>
              {params.value}
            </Button>
          ) : (
            <Typography variant="h6" color={getStatusColor(params.value)} py={3}>
              {params.value}
            </Typography>
          )}
        </>
      ),
    },
  ]

  const fetchOutgoing = async () => {
    const response = await fetch('/api/direct/messagestatus/outgoing', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    if (!response.ok) {
      setErrorMessage(data.error.message || 'An error occurred while fetching data.')
    }
    setMessageData(data)
  }
  const fetchIncoming = async () => {
    const response = await fetch('/api/direct/messagestatus/incoming', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    if (!response.ok) {
      setErrorMessage(data.error.message || 'An error occurred while fetching data.')
    }
    setMessageData(data)
  }
  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowOutgoing(e.target.checked)
    if (e.target.checked) {
      setIsFetching(true)
      fetchOutgoing().then(() => setIsFetching(false))
    } else {
      setIsFetching(true)
      fetchIncoming().then(() => setIsFetching(false))
    }
  }
  // console.log(messageData)
  return (
    <>
      {status !== 'authenticated' ? (
        <Container sx={{ pt: 4 }}>
          <PageAlertBox message="You must be logged in to access Message Status." />
        </Container>
      ) : (
        <>
          {isFetching ? (
            <LinearProgress />
          ) : (
            <>
              {_.isEmpty(errorMessage) && (
                <Container sx={{ pt: 4, pb: 8 }} maxWidth="lg">
                  <>
                    <Typography variant="h3" sx={{ pb: 1 }}>
                      Message Status
                    </Typography>
                    <FormControlLabel
                      control={<Switch color="secondary" checked={showOutgoing} onChange={handleToggle} />}
                      label={showOutgoing ? 'Outgoing' : 'Incoming'}
                    />

                    {messageData?.map(
                      (message, index) =>
                        message.logList.length > 0 && (
                          <Accordion
                            key={index}
                            expanded={selectedLabel === message.directAddress}
                            onChange={() => handleLabelChange(message.directAddress)}
                            style={{ marginTop: '10px' }}
                          >
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                              Messages {message.type}: {message.directAddress}{' '}
                              <Chip
                                color="secondary"
                                label={message.logList.length}
                                size="small"
                                sx={{ marginLeft: 2 }}
                              />
                            </AccordionSummary>
                            <AccordionDetails>
                              <DataGrid
                                columns={columns}
                                rows={message.logList}
                                getRowId={() => Math.random()}
                                disableRowSelectionOnClick
                                disableColumnMenu
                                disableColumnSelector
                                disableDensitySelector
                                density={'comfortable'}
                                autoHeight
                                initialState={{
                                  sorting: {
                                    sortModel: [{ field: 'c_time', sort: 'desc' }],
                                  },
                                }}
                              />
                            </AccordionDetails>
                          </Accordion>
                        )
                    )}
                  </>
                </Container>
              )}
              {!_.isEmpty(errorMessage) && (
                <ErrorDisplayCard
                  open={true}
                  handleClose={() => setErrorMessage('')}
                  response={{ error: errorMessage }}
                />
              )}
            </>
          )}
        </>
      )}
    </>
  )
}

export default MessageStatusDashboard
