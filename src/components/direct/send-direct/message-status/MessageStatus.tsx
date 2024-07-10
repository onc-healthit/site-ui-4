import React, { useState } from 'react'
import {
  Container,
  Box,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Chip,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

interface Message {
  from: string
  messageId: string
  time: string
  status: string
  contentType: string
  contentDisposition: string
  contentTransfer: string
}
const MessageStatusDashboard = () => {
  const [showOutgoing, setShowOutgoing] = useState(true)
  const [selectedLabel, setSelectedLabel] = useState('hisp@direct.net')

  const handleToggle = () => {
    setShowOutgoing((prev) => !prev)
  }

  const handleLabelChange = (label: string) => {
    setSelectedLabel(label)
  }
  interface MessageData {
    [key: string]: Message[]
  }
  const messageData: MessageData = {
    'hisp@direct.net': [
      {
        from: 'Alice',
        messageId: '12345',
        time: '10:00 AM',
        status: 'MDN RECEIVED',
        contentType: ' application/pks-mine; smime-type=envopleddata; name “smime.p7m',
        contentDisposition: 'placeholder',
        contentTransfer: 'placeholder',
      },
      {
        from: 'Bob',
        messageId: '67890',
        time: '11:30 AM',
        status: 'Failed',
        contentType: ' application/pks-mine; smime-type=envopleddata; name “smime.p7m',
        contentDisposition: 'placeholder',
        contentTransfer: 'placeholder',
      },
    ],
    'another@direct.net': [
      {
        from: 'Charlie',
        messageId: '54321',
        time: '1:00 PM',
        status: 'MDN RECEIVED',
        contentType: ' application/pks-mine; smime-type=envopleddata; name “smime.p7m',
        contentDisposition: 'placeholder',
        contentTransfer: 'placeholder',
      },
      {
        from: 'David',
        messageId: '09876',
        time: '2:30 PM',
        status: 'Failed',
        contentType: ' application/pks-mine; smime-type=envopleddata; name “smime.p7m',
        contentDisposition: 'placeholder',
        contentTransfer: 'placeholder',
      },
    ],
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'MDN RECEIVED':
        return 'success'
      case 'Failed':
        return 'error'
      default:
        return 'primary'
    }
  }

  return (
    <Container sx={{ pt: 4, pb: 8 }} maxWidth="lg">
      <>
        <Typography variant="h3" sx={{ pb: 1 }}>
          Message Status
        </Typography>
        <FormControlLabel
          control={<Switch color="secondary" checked={showOutgoing} onChange={handleToggle} />}
          label={showOutgoing ? 'Show Outgoing' : 'Show Incoming'}
        />

        {Object.keys(messageData).map((label, index) => (
          <Accordion
            key={index}
            expanded={selectedLabel === label}
            onChange={() => handleLabelChange(label)}
            style={{ marginTop: '10px' }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              Messages to: {label}{' '}
              <Chip color="secondary" label={messageData[label].length} size="small" sx={{ marginLeft: 2 }} />
            </AccordionSummary>
            <AccordionDetails>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>From</TableCell>
                      <TableCell>Message ID</TableCell>
                      <TableCell>Time</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {messageData[label].map((message, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{message.from}</TableCell>
                        <TableCell>{message.messageId}</TableCell>
                        <TableCell>{message.time}</TableCell>
                        <TableCell>
                          <Button
                            href="senddirect/messagestatusreport"
                            variant="outlined"
                            color={getStatusColor(message.status)}
                          >
                            {message.status}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </AccordionDetails>
          </Accordion>
        ))}
        <Box py={4} display="flex" flexDirection="row" justifyContent="space-between"></Box>
      </>
    </Container>
  )
}

export default MessageStatusDashboard
