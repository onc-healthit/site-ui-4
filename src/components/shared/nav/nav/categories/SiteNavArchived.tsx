import { Divider, ListItemButton, ListItemIcon, ListItemText } from '@mui/material/'
import Link from 'next/link'

import { ArchiveOutlined } from '@mui/icons-material'
import palette from '@/styles/palette'

export default function SiteNavArchived() {
  return (
    <>
      <Link href="/archived" passHref>
        <ListItemButton>
          <ListItemIcon>
            <ArchiveOutlined sx={{ strokeWidth: 0.5, stroke: `${palette.primary}` }} color="primary" />
            <ListItemText
              primaryTypographyProps={{ color: palette.primary, fontWeight: 500 }}
              primary="Archived"
              sx={{ pl: 4, color: 'inherit' }}
            />
          </ListItemIcon>
        </ListItemButton>
      </Link>
      <Divider sx={{ borderWidth: 1.4 }} />
    </>
  )
}
