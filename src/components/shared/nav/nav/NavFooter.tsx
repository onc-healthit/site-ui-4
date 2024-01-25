import { Divider, Typography } from '@mui/material'

/* Custom Imports */
import { SITE_VERSION } from '@/constants/navConstants'

export default function NavFooter() {
  return (
    <>
      {/* Release Notes and Version */}
      {/* TODO:
        -Clean up the look of this, padding, style (use mui), etc.
        -Externalize version to github markdown or otherwise */}
      <Typography variant="h6" noWrap component="div">
        Release Notes v{SITE_VERSION}
      </Typography>
      <Divider />
    </>
  )
}
