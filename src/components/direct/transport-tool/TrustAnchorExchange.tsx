import palette from '@/styles/palette'
import { Typography, List, ListItem, Box, Button, Stack } from '@mui/material'
import bulletedList from '../shared/BulletList'
import Link from 'next/link'
import DragandDropFile from '@/components/shared/DragandDropFile'

const TrustAnchorExchange = () => {
  return (
    <>
      <Typography variant="body1">
        <strong>Directions</strong>
      </Typography>
      <List sx={bulletedList('number')}>
        <ListItem sx={{ display: 'list-item' }}>
          <Typography variant="body2">
            Download the Trust Anchor for the Sandbox{' '}
            <Link color="#42A5F5" href="mailto:edge-test-tool@googlegroups.com">
              (direct.site.healthit.gov Certificate){' '}
            </Link>
            and import the trust anchor into your trust store.
          </Typography>
        </ListItem>
        <ListItem sx={{ display: 'list-item' }}>
          <Typography variant="body2">
            Please upload your Trust Anchor by selecting your Trust Anchor. If you need to replace the Trust Anchor,
            just perform another upload and the previous one will be replaced.
          </Typography>
        </ListItem>
        <ListItem sx={{ display: 'list-item' }}>
          <Typography variant="body2">
            Uploading the Trust Anchor causes an update to the{' '}
            <Link color="#42A5F5" href={''}>
              Trust Bundle
            </Link>{' '}
            of direct.site.healthit.gov which is refreshed every five minutes and is only used for testing purposes.
            Once a Trust Anchor is uploaded, users can test with the Direct sandbox after five minutes.
          </Typography>
        </ListItem>
      </List>
      <Box pb={4}>
        <Stack direction="row" alignItems="flex-start" gap={1}>
          <Typography gutterBottom variant="body1">
            <strong>Select a Local Trust Anchor Certificate (binary or PEM encoded):</strong>
          </Typography>
        </Stack>
        <DragandDropFile />
      </Box>
      <Button variant="contained" sx={{ color: palette.white }} type="submit">
        SUBMIT ANCHOR
      </Button>
    </>
  )
}

export default TrustAnchorExchange
