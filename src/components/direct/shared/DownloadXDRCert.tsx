import { Box, Button, Card, CardContent, Typography } from '@mui/material'
import { Download } from '@mui/icons-material'

const DownloadXDRCert = () => {
  return (
    <Card elevation={4}>
      <CardContent>
        <Box display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={2} pt={1}>
          <Typography>Download XDR TLS certificates.</Typography>
          <Button
            variant="outlined"
            color="primary"
            endIcon={<Download />}
            href="/certificates/xdr-tls/keyAndCert.zip"
            download
          >
            Download
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}

export default DownloadXDRCert
