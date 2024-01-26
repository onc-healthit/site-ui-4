import { Divider, Button } from '@mui/material'

/* Custom Imports */
import { SITE_VERSION } from '@/constants/navConstants'

export default function NavFooter() {
  return (
    <>
      {/* Release Notes and Version */}
      {/* TODO:
        -Clean up the look of this, padding, style (use mui), etc.
        -Externalize version to github markdown or otherwise */}
      <Button disableElevation sx={{ width: '220px' }} color="secondary" variant="text" size="small">
        Release Notes v{SITE_VERSION}
      </Button>
      <Divider />
    </>
  )
}
