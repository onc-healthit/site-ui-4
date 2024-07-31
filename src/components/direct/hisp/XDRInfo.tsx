import * as React from 'react'
import {
  Container,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material'

function XDRInfo() {
  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        XDR Test 13
      </Typography>
      <Typography paragraph>
        Test Tool sends an XDR Message to the HSIP which then translates the message to Direct and sends to the other
        HSIP.
      </Typography>
      <Typography paragraph>
        Verify that an HSIP system can receive a properly formatted XDR message and translate to Direct Message. Note:
        When the SUT (HSIP) receives the MDN (from the &apos;direct:to&apos; and hence RCPT TO from the Direct
        communication), the MAIL FROM of the MDN will be &apos;direct:to&apos; - since the &apos;direct:to&apos;
        endpoint is sending the MAIL FROM. The ETT hardcodes &apos;direct:to&apos; based on the test case, normally is
        not needed.
      </Typography>
      <Typography paragraph>Expected Test Results</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                Vendor Role
              </TableCell>
              <TableCell>Receiver</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Metadata Included
              </TableCell>
              <TableCell>Limited Metadata</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" color="primary" sx={{ mt: 4 }}>
        Return to Test
      </Button>
    </Container>
  )
}

export default XDRInfo
