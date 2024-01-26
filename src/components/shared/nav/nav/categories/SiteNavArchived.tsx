import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Link from 'next/link'

import { ArchiveOutlined } from '@mui/icons-material'

/* Custom Imports */
import { NAV_PADDING_LEFT } from '@/constants/navConstants'

export default function SiteNavArchived() {
  return (
    <Link href="/archived" passHref>
      <ListItem>
        <ListItemIcon>
          <ArchiveOutlined />
          <ListItemText primary="Archived" sx={{ pl: NAV_PADDING_LEFT }} />
        </ListItemIcon>
      </ListItem>
    </Link>
  )
}
