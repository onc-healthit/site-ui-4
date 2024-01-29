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
            <ArchiveOutlined color="primary" />
            <ListItemText
              primaryTypographyProps={{ color: palette.primary }}
              primary="Archived"
              sx={{ pl: 4, color: 'inherit' }}
            />
          </ListItemIcon>
        </ListItemButton>
      </Link>
      <Divider />
    </>
  )
}
