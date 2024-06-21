import { Divider, ListItemButton, ListItemIcon, ListItemText } from '@mui/material/'
import Link from 'next/link'

/* Custom Imports */
import { NAV_PADDING_LEFT_SINGLE_HEADER, NAV_THICKER_DIVIDER } from '@/constants/navConstants'
import palette from '@/styles/palette'
import { ArchiveOutlined } from '@mui/icons-material'

export default function SiteNavArchived() {
  return (
    <>
      <Link href="/archived" passHref>
        <ListItemButton>
          <ListItemIcon aria-label="Go to archieved page">
            <ArchiveOutlined sx={{ strokeWidth: 0.5, stroke: `${palette.primary}` }} color="primary" />
            <ListItemText
              primaryTypographyProps={{ color: palette.primary, fontWeight: 500 }}
              primary="Archived"
              sx={{ pl: NAV_PADDING_LEFT_SINGLE_HEADER, color: 'inherit' }}
            />
          </ListItemIcon>
        </ListItemButton>
      </Link>
      <Divider sx={{ borderWidth: NAV_THICKER_DIVIDER }} />
    </>
  )
}
