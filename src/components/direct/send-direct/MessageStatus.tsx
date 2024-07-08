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
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const MessageStatusDashboard = () => {
  const [showOutgoing, setShowOutgoing] = useState(true) // state to toggle between outgoing and incoming
  const [selectedLabel, setSelectedLabel] = useState('hisp@direct.net') // state to track selected label

  const handleToggle = () => {
    setShowOutgoing((prev) => !prev)
  }

  const handleLabelChange = (label) => {
    setSelectedLabel(label)
  }

  // Example data with different labels
  const messageData = {
    'hisp@direct.net': [
      { from: 'Alice', messageId: '12345', time: '10:00 AM', status: 'MDN RECEVIED' },
      { from: 'Bob', messageId: '67890', time: '11:30 AM', status: 'Failed' },
      // Add more messages as needed
    ],
    'another@direct.net': [
      { from: 'Charlie', messageId: '54321', time: '1:00 PM', status: 'MDN RECEVIED' },
      { from: 'David', messageId: '09876', time: '2:30 PM', status: 'Failed' },
      // Add more messages as needed
    ],
    // Add more labels and messages as needed
  }

  return (
    <Container sx={{ pt: 4, pb: 8 }} maxWidth="lg">
      <Typography variant="h3" sx={{ pb: 1 }}>
        Message Status
      </Typography>
      <FormControlLabel
        control={<Switch color="secondary" checked={showOutgoing} onChange={handleToggle} />}
        label={showOutgoing ? 'Show Outgoing' : 'Show Incoming'}
      />

      {/* Render accordions dynamically based on available labels */}
      {Object.keys(messageData).map((label, index) => (
        <Accordion
          key={index}
          expanded={selectedLabel === label}
          onChange={() => handleLabelChange(label)}
          style={{ marginTop: '10px' }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>Messages to: {label}</AccordionSummary>
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
                        <Button variant="contained" color="primary">
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
      <Box py={4} display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
        <Button variant="contained" color="primary" style={{ marginLeft: '10px' }}>
          Send
        </Button>
        <Button variant="outlined" color="primary" style={{ marginLeft: '10px' }}>
          Reload
        </Button>
      </Box>
    </Container>
  )
}

export default MessageStatusDashboard
